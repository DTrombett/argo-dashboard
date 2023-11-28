import { State } from "@/app/utils";
import { faBell } from "@fortawesome/free-regular-svg-icons/faBell";
import { faClock } from "@fortawesome/free-regular-svg-icons/faClock";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons/faPenToSquare";
import { faUser } from "@fortawesome/free-regular-svg-icons/faUser";
import type { DynamicOptions } from "next/dynamic";
import dynamic from "next/dynamic";
import localFont from "next/font/local";
import type { Dashboard as ArgoDashboard, Client } from "portaleargo-api";
import { useState } from "react";
import Canvas from "./Canvas";
import Column from "./Column";
import Entry from "./Entry";
import LoadingPlaceholder from "./LoadingPlaceholder";

enum ElementType {
	Homework,
	Reminder,
	Activity,
	Meeting,
}
const ListElement = dynamic(() => import("./ListElement"), {
	loading: LoadingPlaceholder as DynamicOptions["loading"],
});
const LoadingBar = dynamic(() => import("./LoadingBar"));
const italic = localFont({ src: "../public/Poppins-Italic.ttf" });

const getElements = (
	dashboard: ArgoDashboard,
	options: { tomorrowTime: number } & (
		| {
				now: number;
				tomorrow: string;
		  }
		// eslint-disable-next-line @typescript-eslint/ban-types
		| {}
	)
) => {
	const elements = dashboard.registro
		.flatMap((event) => {
			const array: {
				element: React.JSX.Element;
				type: ElementType;
				date: Date;
			}[] = [];
			const date = new Date(event.datEvento);
			const time = date.getTime();

			if (
				event.attivita &&
				("now" in options
					? time > options.now && time < options.tomorrowTime
					: time >= options.tomorrowTime)
			)
				array.push({
					element: (
						<ListElement
							key={`${event.pk}-attivita`}
							content={event.attivita}
							date={date}
							icon={faClock}
							header={event.materia}
						/>
					),
					date,
					type: ElementType.Activity,
				});
			array.push(
				...event.compiti
					.filter(
						"tomorrow" in options
							? (c) => c.dataConsegna === options.tomorrow
							: (c) =>
									new Date(c.dataConsegna).getTime() >= options.tomorrowTime
					)
					.map((c, i) => {
						const d = new Date(c.dataConsegna);

						return {
							element: (
								<ListElement
									key={`${event.pk}-compiti-${c.compito}-${c.dataConsegna}`}
									content={c.compito}
									date={d}
									icon={faPenToSquare}
									header={event.materia}
								/>
							),
							date: d,
							type: ElementType.Homework,
						};
					})
			);
			return array;
		})
		.concat(
			dashboard.promemoria
				.filter((p) => {
					const t = new Date(p.datEvento).getTime();

					return "now" in options
						? t > options.now && t < options.tomorrowTime
						: t >= options.tomorrowTime;
				})
				.map((event) => {
					const date = new Date(event.datEvento);

					return {
						element: (
							<ListElement
								key={`${event.pk}-promemoria`}
								content={event.desAnnotazioni}
								date={date}
								icon={faBell}
								header={event.docente}
							/>
						),
						date,
						type: ElementType.Reminder,
					};
				}),
			dashboard.prenotazioniAlunni
				.filter((p) => {
					if (p.prenotazione.flgAnnullato === "E") return false;
					const t = new Date(
						`${p.disponibilita.datDisponibilita} ${p.disponibilita.ora_Inizio}`
					).getTime();

					return "now" in options
						? t > options.now && t < options.tomorrowTime
						: t >= options.tomorrowTime;
				})
				.map((event) => {
					const date = new Date(
						`${event.disponibilita.datDisponibilita} ${event.disponibilita.ora_Inizio}`
					);

					return {
						element: (
							<ListElement
								key={`${event.prenotazione.pk}-prenotazione`}
								content={`${event.disponibilita.ora_Inizio} - ${event.disponibilita.ora_Fine} — ${event.disponibilita.desLuogoRicevimento} — ${event.disponibilita.desNota}`}
								date={date}
								icon={faUser}
								header={`${event.docente.desNome[0]}. ${event.docente.desCognome}`}
							/>
						),
						date,
						type: ElementType.Meeting,
					};
				})
		)
		.sort(
			({ type: type1, date: date1 }, { type: type2, date: date2 }) =>
				date1.getTime() - date2.getTime() || type1 - type2
		)
		.map(({ element }) => element);

	return elements.length ? (
		elements
	) : (
		<span className={italic.className}>Nessun impegno imminente!</span>
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
	const [pending, setPending] = useState(false);
	const period = client.dashboard?.listaPeriodi.find(
		(p) => p.pkPeriodo === "*"
	);
	const dataInizio = period?.dataInizio.split("-");
	const dataFine = period?.dataFine.split("-");
	const date = new Date();
	const now = date.getTime();

	date.setDate(date.getDate() + 1);
	date.setHours(0, 0, 0, 0);
	const tomorrow = `${date.getFullYear()}-${(date.getMonth() + 1)
		.toString()
		.padStart(2)}-${date.getDate()}`;

	date.setDate(date.getDate() + 1);
	const tomorrowTime = date.getTime();

	return (
		<div className={`${loading && "blur-sm"} w-full dashboard`}>
			<div className="flex flex-col justify-center text-xl container md:flex-row">
				<Column name="Media">
					<Entry name="Generale">
						<div className="relative flex justify-center">
							<Canvas media={client.dashboard?.mediaGenerale} />
							<span className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
								<LoadingPlaceholder loading={!client.dashboard} width={"3rem"}>
									{client.dashboard?.mediaGenerale.toFixed(2) ?? "?"}
								</LoadingPlaceholder>
							</span>
						</div>
						<span className={italic.className}>
							<LoadingPlaceholder
								loading={!client.dashboard}
								repeat={2}
								width={"75%"}
							>
								Calcolata nel periodo {dataInizio?.[2]}/{dataInizio?.[1]}/
								{dataInizio?.[0]} - {dataFine?.[2]}/{dataFine?.[1]}/
								{dataFine?.[0]}
							</LoadingPlaceholder>
						</span>
					</Entry>
					<Entry name="Per materia">
						<LoadingPlaceholder loading={!client.dashboard} repeat={5}>
							{client.dashboard &&
								Object.entries(client.dashboard.mediaMaterie).map(([id, m]) => (
									<div key={id} className="flex justify-between">
										<span
											className="text-left whitespace-nowrap overflow-auto outline-0 hideScrollbar subject"
											tabIndex={-1}
										>
											{
												client.dashboard!.listaMaterie.find((s) => s.pk === id)
													?.materia
											}
										</span>
										<span className="text-right">{m.mediaMateria}</span>
									</div>
								))}
						</LoadingPlaceholder>
					</Entry>
				</Column>
				<Column name="Prossimi impegni">
					<Entry name="Entro domani">
						<div className="flex flex-col">
							<LoadingPlaceholder loading={!client.dashboard} repeat={5}>
								{client.dashboard &&
									getElements(client.dashboard, {
										now,
										tomorrowTime,
										tomorrow,
									})}
							</LoadingPlaceholder>
						</div>
					</Entry>
					<Entry name="Successivi">
						<div className="flex flex-col">
							<LoadingPlaceholder loading={!client.dashboard} repeat={5}>
								{client.dashboard &&
									getElements(client.dashboard, { tomorrowTime })}
							</LoadingPlaceholder>
						</div>
					</Entry>
				</Column>
			</div>
			<button
				className="relative my-2 p-4 w-40 rounded duration-500 bg-zinc-300 dark:bg-zinc-700 text-xl focus-visible:outline-zinc-400 dark:focus-visible:outline-zinc-600 enabled:hover:scale-110 enabled:active:scale-95 disabled:cursor-wait disabled:opacity-50 disabled:bg-zinc-200 dark:disabled:bg-zinc-800"
				disabled={pending}
				onClick={async () => {
					setPending(true);
					await client.logOut().catch(() => {});
					setState(State.NeedLogin);
				}}
			>
				Log out
				{pending && <LoadingBar />}
			</button>
		</div>
	);
};

export default Dashboard;
