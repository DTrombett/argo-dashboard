import { faBell } from "@fortawesome/free-regular-svg-icons/faBell";
import { faBookmark } from "@fortawesome/free-regular-svg-icons/faBookmark";
import { faCalendarXmark } from "@fortawesome/free-regular-svg-icons/faCalendarXmark";
import { faClock } from "@fortawesome/free-regular-svg-icons/faClock";
import { faFileClipboard } from "@fortawesome/free-regular-svg-icons/faFileClipboard";
import { faNoteSticky } from "@fortawesome/free-regular-svg-icons/faNoteSticky";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons/faPenToSquare";
import { faUser } from "@fortawesome/free-regular-svg-icons/faUser";
import dynamic from "next/dynamic";
import localFont from "next/font/local";
import type { Dashboard as ArgoDashboard, Client } from "portaleargo-api";
import Canvas from "./Canvas";
import Column from "./Column";
import Entry from "./Entry";
import LoadingPlaceholder from "./LoadingPlaceholder";
import LogOutButton from "./LogOutButton";

enum ScheduledType {
	Compiti,
	Promemoria,
	Attività,
	Prenotazioni,
}
enum EventType {
	Voti,
	BachecaAlunno,
	Bacheca,
	Appello,
}
const ListElement = dynamic(() => import("./ListElement"), {
	loading: () => <LoadingPlaceholder repeat={2} />,
});
const italic = localFont({ src: "../public/Poppins-Italic.ttf" });

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
const getScheduled = (
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
				type: ScheduledType;
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
					type: ScheduledType.Attività,
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
							type: ScheduledType.Compiti,
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
								key={event.pk}
								content={event.desAnnotazioni}
								date={date}
								icon={faBell}
								header={event.docente}
							/>
						),
						date,
						type: ScheduledType.Promemoria,
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
								key={event.prenotazione.pk}
								content={`${event.disponibilita.ora_Inizio} - ${event.disponibilita.ora_Fine} — ${event.disponibilita.desLuogoRicevimento} — ${event.disponibilita.desNota}`}
								date={date}
								icon={faUser}
								header={`${event.docente.desNome[0]}. ${event.docente.desCognome}`}
							/>
						),
						date,
						type: ScheduledType.Prenotazioni,
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
const getEvents = (
	dashboard: ArgoDashboard,
	options: { weekStart: number } & (
		| {
				now: number;
		  }
		// eslint-disable-next-line @typescript-eslint/ban-types
		| {}
	)
) => {
	const predicate = (event: { datEvento: string }) => {
		const time = new Date(event.datEvento).getTime();

		return "now" in options
			? time >= options.weekStart && time <= options.now
			: time < options.weekStart;
	};
	const elements: {
		element: React.JSX.Element;
		type: EventType;
		date: Date;
	}[] = [
		// ...dashboard.registro
		// 	.filter((e) => {
		// 		const date = new Date(e.datEvento);
		// 		const time = date.getTime();

		// 		return (
		// 			e.attivita &&
		// 			("now" in options
		// 				? time >= options.weekStart && time <= options.now
		// 				: time < options.weekStart)
		// 		);
		// 	})
		// 	.map((event) => {
		// 		const date = new Date(event.datEvento);

		// 		return {
		// 			element: (
		// 				<ListElement
		// 					key={`${event.pk}-attivita`}
		// 					content={event.attivita!}
		// 					date={date}
		// 					icon={faClock}
		// 					header={event.materia}
		// 				/>
		// 			),
		// 			date,
		// 			type: ScheduledType.Activity,
		// 		};
		// 	}),
		...dashboard.appello.filter(predicate).map((event) => {
			const date = new Date(event.datEvento);

			return {
				element: (
					<ListElement
						key={event.pk}
						content={`${event.descrizione && `${event.descrizione} — `}${
							event.nota
						}`}
						date={date}
						icon={faCalendarXmark}
						header={event.docente}
					/>
				),
				date,
				type: EventType.Appello,
			};
		}),
		...dashboard.voti.filter(predicate).map((event) => {
			const date = new Date(event.datEvento);

			return {
				element: (
					<ListElement
						key={event.pk}
						content={`Prova ${
							event.codVotoPratico === "S" ? "Scritta" : "Orale"
						}: ${event.valore || event.codCodice} (${event.descrizioneVoto})${
							event.descrizioneProva && ` — ${event.descrizioneProva}`
						}`}
						date={date}
						icon={faBookmark}
						header={event.desMateria}
					/>
				),
				date,
				type: EventType.Voti,
			};
		}),
		...dashboard.bacheca.filter(predicate).map((event) => {
			const date = new Date(event.datEvento);

			return {
				element: (
					<ListElement
						key={event.pk}
						content={`${event.categoria}: ${event.messaggio}`}
						date={date}
						icon={faNoteSticky}
						header={event.autore}
					/>
				),
				date,
				type: EventType.Bacheca,
			};
		}),
		...dashboard.bachecaAlunno.filter(predicate).map((event) => {
			const date = new Date(event.datEvento);

			return {
				element: (
					<ListElement
						key={event.pk}
						content={event.nomeFile}
						date={date}
						icon={faFileClipboard}
						header={event.messaggio}
					/>
				),
				date,
				type: EventType.BachecaAlunno,
			};
		}),
	];
	return elements.length ? (
		elements
			.sort(
				({ type: type1, date: date1 }, { type: type2, date: date2 }) =>
					date2.getTime() - date1.getTime() || type1 - type2
			)
			.map(({ element }) => element)
	) : (
		<span className={italic.className}>Nessun evento disponibile!</span>
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
								{client.dashboard &&
									getScheduled(client.dashboard, {
										now,
										tomorrowTime,
										tomorrow,
									})}
							</LoadingPlaceholder>
						</div>
					</Entry>
					<Entry name="Successivi">
						<div className="flex flex-col">
							<LoadingPlaceholder loading={!client.dashboard} repeat={4}>
								{client.dashboard &&
									getScheduled(client.dashboard, { tomorrowTime })}
							</LoadingPlaceholder>
						</div>
					</Entry>
				</Column>
				<Column name="Ultimi eventi">
					<Entry name="Questa settimana">
						<div className="flex flex-col">
							<LoadingPlaceholder loading={!client.dashboard} repeat={4}>
								{client.dashboard &&
									getEvents(client.dashboard, { now, weekStart })}
							</LoadingPlaceholder>
						</div>
					</Entry>
					<Entry name="Precedenti">
						<div className="flex flex-col">
							<LoadingPlaceholder loading={!client.dashboard} repeat={4}>
								{client.dashboard && getEvents(client.dashboard, { weekStart })}
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
