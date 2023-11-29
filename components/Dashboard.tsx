import dynamic from "next/dynamic";
import localFont from "next/font/local";
import type { Dashboard as ArgoDashboard, Client } from "portaleargo-api";
import Canvas from "./Canvas";
import Column from "./Column";
import Entry from "./Entry";
import Events from "./Events";
import LoadingPlaceholder from "./LoadingPlaceholder";
import LogOutButton from "./LogOutButton";
import Scheduled from "./Scheduled";

const ListElement = dynamic(() => import("./ListElement"), {
	loading: () => <LoadingPlaceholder repeat={2} />,
});
const iconBachecaAlunno = dynamic(() => import("../icons/bacheca-alunno.svg"));
const iconBacheca = dynamic(() => import("../icons/bacheca.svg"));
const iconAppello = dynamic(() => import("../icons/calendario.svg"));
const iconVoti = dynamic(() => import("../icons/voti-giornalieri.svg"));
const italic = localFont({ src: "../fonts/Poppins-Italic.ttf" });

const getAverages = (dashboard: ArgoDashboard) => {
	const result = Object.entries(dashboard.mediaMaterie).map(([id, m]) => (
		<div key={id} className="flex justify-between">
			<span
				className="text-left whitespace-nowrap overflow-auto outline-0 hideScrollbar subject"
				tabIndex={-1}
			>
				{dashboard.listaMaterie.find((s) => s.pk === id)?.materia}
			</span>
			<span className="text-right">{m.mediaMateria}</span>
		</div>
	));

	return result.length ? (
		result
	) : (
		<span className={italic.className}>
			Nessun dato disponibile riguardo la media!
		</span>
	);
};

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
		<div className={`${loading ? "blur-sm" : ""} w-full dashboard`.trimStart()}>
			<div className="flex flex-col justify-center text-xl container min-w-full lg:flex-row">
				<Column name="Media">
					<Entry name="Generale">
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
					<Entry name="Per materia">
						<LoadingPlaceholder loading={!client.dashboard} repeat={5}>
							{client.dashboard && getAverages(client.dashboard)}
						</LoadingPlaceholder>
					</Entry>
				</Column>
				<Column name="Prossimi impegni">
					<Entry name="Entro domani">
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
					<Entry name="Successivi">
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
				<Column name="Ultimi eventi">
					<Entry name="Questa settimana">
						<div className="flex flex-col">
							<LoadingPlaceholder loading={!client.dashboard} repeat={4}>
								{client.dashboard && (
									<Events
										dashboard={client.dashboard}
										now={now}
										weekStart={weekStart}
									/>
								)}
							</LoadingPlaceholder>
						</div>
					</Entry>
					<Entry name="Precedenti">
						<div className="flex flex-col">
							<LoadingPlaceholder loading={!client.dashboard} repeat={4}>
								{client.dashboard && (
									<Events dashboard={client.dashboard} weekStart={weekStart} />
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
