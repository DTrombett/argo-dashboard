import { EventType } from "@/app/utils";
import dynamic from "next/dynamic";
import localFont from "next/font/local";
import { Dashboard } from "portaleargo-api";
import LoadingPlaceholder from "./LoadingPlaceholder";

const ListElement = dynamic(() => import("./ListElement"), {
	loading: () => <LoadingPlaceholder repeat={2} />,
});
const iconBachecaAlunno = dynamic(() => import("../icons/bacheca-alunno.svg"));
const iconBacheca = dynamic(() => import("../icons/bacheca.svg"));
const iconAppello = dynamic(() => import("../icons/calendario.svg"));
const iconVoti = dynamic(() => import("../icons/voti-giornalieri.svg"));
const italic = localFont({ src: "../fonts/Poppins-Italic.ttf" });

const Events = ({
	dashboard,
	...options
}: {
	dashboard: Dashboard;
	weekStart: number;
} & (
	| {
			now: number;
	  }
	// eslint-disable-next-line @typescript-eslint/ban-types
	| {}
)) => {
	const predicate = <T extends { datEvento: string; pk: string }>(event: T) => {
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
						Icon={iconAppello}
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
						Icon={iconVoti}
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
						Icon={iconBacheca}
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
						Icon={iconBachecaAlunno}
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
			.filter((e, i, array) =>
				array.every((a, j) => j <= i || a.element.key !== e.element.key)
			)
			.map(({ element }) => element)
	) : (
		<span className={italic.className}>Nessun evento disponibile!</span>
	);
};

export default Events;
