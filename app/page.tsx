"use client";
import TouchableOpacity from "@/components/Utils/TouchableOpacity";
import Averages from "@/components/dashboard/Averages";
import Canvas from "@/components/dashboard/Canvas";
import { ClientContext } from "@/components/dashboard/ClientProvider";
import Column from "@/components/dashboard/Column";
import Entry from "@/components/dashboard/Entry";
import Scheduled from "@/components/dashboard/Scheduled";
import Updates from "@/components/dashboard/Updates";
import LoadingPlaceholder from "@/components/loading/LoadingPlaceholder";
import local from "next/font/local";
import Link from "next/link";
import { memo, useContext } from "react";
import { State } from "./utils";

const italic = local({ src: "../fonts/Poppins-Italic.ttf" });

const Dashboard = () => {
	const { client, state } = useContext(ClientContext);
	const period = client.dashboard?.listaPeriodi.find(
		(p) => p.pkPeriodo === "*"
	);
	const dataInizio = period?.dataInizio.split("-");
	const dataFine = period?.dataFine.split("-");
	const date = new Date();
	const now = date.getTime();
	const day = date.getDay() || 7;

	date.setHours(0, 0, 0, 0);
	const weekStart = date.setDate(date.getDate() - day + 1);

	date.setDate(date.getDate() + day);
	const tomorrow = `${date.getFullYear()}-${(date.getMonth() + 1)
		.toString()
		.padStart(2)}-${date.getDate()}`;
	const tomorrowTime = date.setDate(date.getDate() + 1);

	return (
		<div
			className={`w-full transition duration-200 flex flex-col justify-center text-xl container min-w-full lg:flex-row ${
				state === State.NoDashboard ? "blur-sm" : ""
			}`}
		>
			<Column name="Media" id="media">
				<Entry name="Generale" id="generale">
					<div className="flex flex-col justify-center items-center h-full">
						<TouchableOpacity>
							<Link
								className="relative flex justify-center w-fit"
								href="/menu/votiGiornalieri"
							>
								<Canvas media={client.dashboard?.mediaGenerale} />
								<span className="absolute top-0 left-0 w-full h-full flex items-center justify-center hover:underline">
									<LoadingPlaceholder
										loading={!client.dashboard}
										width={"3rem"}
									>
										{client.dashboard?.mediaGenerale.toFixed(2) ?? "?"}
									</LoadingPlaceholder>
								</span>
							</Link>
						</TouchableOpacity>
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
			<Column name="Aggiornamenti" id="aggiornamenti">
				<Entry name="Recenti" id="recenti">
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
	);
};

export default memo(Dashboard);
