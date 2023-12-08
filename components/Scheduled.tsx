import { ScheduledType } from "@/app/utils";
import dynamic from "next/dynamic";
import local from "next/font/local";
import type { Dashboard } from "portaleargo-api";
import LoadingPlaceholder from "./LoadingPlaceholder";

const ListElement = dynamic(() => import("./ListElement"), {
	loading: () => <LoadingPlaceholder repeat={2} />,
});
const iconAttività = dynamic(() => import("../icons/attivita-svolta.svg"));
const iconCompiti = dynamic(() => import("../icons/compiti-assegnati.svg"));
const iconPromemoria = dynamic(() => import("../icons/promemoria-classe.svg"));
const iconRicevimento = dynamic(
	() => import("../icons/ricevimento-docenti.svg")
);
const italic = local({ src: "../fonts/Poppins-Italic.ttf" });

const Scheduled = ({
	dashboard,
	...options
}: {
	dashboard: Dashboard;
	tomorrowTime: number;
} & (
	| {
			now: number;
			tomorrow: string;
	  }
	// eslint-disable-next-line @typescript-eslint/ban-types
	| {}
)) => {
	const elements: {
		element: React.JSX.Element;
		type: ScheduledType;
		date: Date;
	}[] = [
		...dashboard.registro.flatMap((event) => {
			const array: {
				element: React.JSX.Element;
				type: ScheduledType;
				date: Date;
			}[] = [];
			const date = new Date(event.datGiorno);
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
							key={event.pk}
							content={event.attivita}
							date={date}
							Icon={iconAttività}
							title={`${event.ora}ª Ora`}
							headerTitle={event.docente}
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
					.map((c) => {
						const d = new Date(c.dataConsegna);

						return {
							element: (
								<ListElement
									key={`${event.pk}-${c.compito}-${c.dataConsegna}`}
									content={c.compito}
									date={d}
									Icon={iconCompiti}
									headerTitle={event.docente}
									header={event.materia}
								/>
							),
							date: d,
							type: ScheduledType.Compiti,
						};
					})
			);
			return array;
		}),
		...dashboard.promemoria
			.filter((p) => {
				const t = new Date(p.datGiorno).getTime();

				return "now" in options
					? t > options.now && t < options.tomorrowTime
					: t >= options.tomorrowTime;
			})
			.map((event) => {
				const date = new Date(event.datGiorno);

				return {
					element: (
						<ListElement
							key={event.pk}
							content={`${event.desAnnotazioni}${
								event.oraInizio === "00:00"
									? ""
									: ` (${event.oraInizio} - ${event.oraFine})`
							}`}
							date={date}
							Icon={iconPromemoria}
							header={event.docente}
						/>
					),
					date,
					type: ScheduledType.Promemoria,
				};
			}),
		...dashboard.prenotazioniAlunni
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
							Icon={iconRicevimento}
							headerTitle={event.docente.desEmail}
							header={`${event.docente.desNome[0]}. ${event.docente.desCognome}`}
						/>
					),
					date,
					type: ScheduledType.Prenotazioni,
				};
			}),
	];

	return elements.length ? (
		elements
			.sort(
				({ type: type1, date: date1 }, { type: type2, date: date2 }) =>
					date1.getTime() - date2.getTime() || type1 - type2
			)
			.filter((e, i, array) =>
				array.every((a, j) => j <= i || a.element.key !== e.element.key)
			)
			.map(({ element }) => element)
	) : (
		<span className={italic.className}>Nessun impegno imminente!</span>
	);
};

export default Scheduled;
