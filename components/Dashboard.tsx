import localFont from "next/font/local";
import type { Client } from "portaleargo-api";
import Averages from "./Averages";
import Canvas from "./Canvas";
import Column from "./Column";
import Entry from "./Entry";
import LoadingPlaceholder from "./LoadingPlaceholder";
import LogOutButton from "./LogOutButton";
import Scheduled from "./Scheduled";
import Updates from "./Updates";

const italic = localFont({ src: "../fonts/Poppins-Italic.ttf" });

const Dashboard = ({
	client,
	setState,
	loading = false,
}: {
	client: Client;
	setState: (state: number) => void;
	loading?: boolean;
}) => {
	const period = client.dashboard?.listaPeriodi.find(
		(p) => p.pkPeriodo === "*"
	);
	const dataInizio = period?.dataInizio.split("-");
	const dataFine = period?.dataFine.split("-");
	const date = new Date();
	const now = date.getTime();
	const day = date.getDay();

	date.setHours(0, 0, 0, 0);
	date.setDate(date.getDate() - day + 1);
	const weekStart = date.getTime();

	date.setDate(date.getDate() + day);
	const tomorrow = `${date.getFullYear()}-${(date.getMonth() + 1)
		.toString()
		.padStart(2)}-${date.getDate()}`;

	date.setDate(date.getDate() + 1);
	const tomorrowTime = date.getTime();

	return (
		<div className={`${loading ? "blur-sm " : ""}w-full dashboard`}>
			<div className="flex flex-col justify-center text-xl container min-w-full lg:flex-row">
				<Column name="Media" id="media">
					<Entry name="Generale" id="generale">
						<div className="flex flex-col justify-center h-full">
							<div className="relative flex justify-center">
								<Canvas media={client.dashboard?.mediaGenerale} />
								<span className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
									<LoadingPlaceholder
										loading={!client.dashboard}
										width={"3rem"}
									>
										{client.dashboard?.mediaGenerale.toFixed(2) ?? "?"}
									</LoadingPlaceholder>
								</span>
							</div>
							<span className={italic.className}>
								<LoadingPlaceholder
									loading={!client.dashboard || !period}
									repeat={2}
									width={"75%"}
								>
									Calcolata nel periodo {dataInizio?.[2]}/{dataInizio?.[1]}/
									{dataInizio?.[0]} - {dataFine?.[2]}/{dataFine?.[1]}/
									{dataFine?.[0]}
								</LoadingPlaceholder>
							</span>
						</div>
					</Entry>
					<Entry name="Per materia" id="perMateria">
						<LoadingPlaceholder loading={!client.dashboard} repeat={5}>
							{client.dashboard && <Averages dashboard={client.dashboard} />}
						</LoadingPlaceholder>
					</Entry>
				</Column>
				<Column name="Prossimi impegni" id="prossimiImpegni">
					<Entry name="Entro domani" id="perMateria">
						<div className="flex flex-col">
							<LoadingPlaceholder loading={!client.dashboard} repeat={4}>
								{client.dashboard && (
									<Scheduled
										dashboard={client.dashboard}
										tomorrowTime={tomorrowTime}
										now={now}
										tomorrow={tomorrow}
									/>
								)}
							</LoadingPlaceholder>
						</div>
					</Entry>
					<Entry name="Successivi" id="successivi">
						<div className="flex flex-col">
							<LoadingPlaceholder loading={!client.dashboard} repeat={4}>
								{client.dashboard && (
									<Scheduled
										dashboard={client.dashboard}
										tomorrowTime={tomorrowTime}
									/>
								)}
							</LoadingPlaceholder>
						</div>
					</Entry>
				</Column>
				<Column name="Aggiornamenti" id="ultimiAggiornamenti">
					<Entry name="Questa settimana" id="questaSettimana">
						<div className="flex flex-col">
							<LoadingPlaceholder loading={!client.dashboard} repeat={4}>
								{client.dashboard && (
									<Updates client={client} now={now} weekStart={weekStart} />
								)}
							</LoadingPlaceholder>
						</div>
					</Entry>
					<Entry name="Precedenti" id="precedenti">
						<div className="flex flex-col">
							<LoadingPlaceholder loading={!client.dashboard} repeat={4}>
								{client.dashboard && (
									<Updates client={client} weekStart={weekStart} />
								)}
							</LoadingPlaceholder>
						</div>
					</Entry>
				</Column>
			</div>
			<LogOutButton client={client} setState={setState} />
		</div>
	);
};

export default Dashboard;
