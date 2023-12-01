import { EventType } from "@/app/utils";
import dynamic from "next/dynamic";
import localFont from "next/font/local";
import type { Client } from "portaleargo-api";
import LoadingPlaceholder from "./LoadingPlaceholder";

const ListElement = dynamic(() => import("./ListElement"), {
	loading: () => <LoadingPlaceholder repeat={2} />,
});
const iconBachecaAlunno = dynamic(() => import("../icons/bacheca-alunno.svg"));
const iconBacheca = dynamic(() => import("../icons/bacheca.svg"));
const iconAppello = dynamic(() => import("../icons/calendario.svg"));
const iconVoti = dynamic(() => import("../icons/voti-giornalieri.svg"));
const italic = localFont({ src: "../fonts/Poppins-Italic.ttf" });

const Updates = ({
	client,
	...options
}: {
	client: Client;
	weekStart: number;
} & (
	| {
			now: number;
	  }
	// eslint-disable-next-line @typescript-eslint/ban-types
	| {}
)) => {
	const predicate = <
		T extends {
			pk: string;
			datEvento: string;
		}
	>(
		event: T
	) => {
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
		...client.dashboard!.appello.filter(predicate).map((event) => ({
			element: (
				<ListElement
					key={event.pk}
					title={event.commentoGiustificazione}
					content={`${event.descrizione && `${event.descrizione} — `}${
						event.nota
					}`}
					date={new Date(event.data)}
					Icon={iconAppello}
					header={event.docente}
				/>
			),
			date: new Date(event.datEvento),
			type: EventType.Appello,
		})),
		...client.dashboard!.voti.filter(predicate).map((event) => ({
			element: (
				<ListElement
					key={event.pk}
					content={`Prova ${
						event.codVotoPratico === "S" ? "Scritta" : "Orale"
					}: ${event.valore || event.codCodice} (${event.descrizioneVoto})${
						event.descrizioneProva && ` — ${event.descrizioneProva}`
					}`}
					title={event.desCommento}
					date={new Date(event.datGiorno)}
					Icon={iconVoti}
					header={event.desMateria}
					headerTitle={event.docente}
				/>
			),
			date: new Date(event.datEvento),
			type: EventType.Voti,
		})),
		...client
			.dashboard!.bacheca.filter((event) => {
				const time = new Date(event.data).getTime();

				return "now" in options
					? time >= options.weekStart && time <= options.now
					: time < options.weekStart;
			})
			.map((event) => ({
				element: (
					<ListElement
						key={event.pk}
						content={`${event.categoria}: ${event.messaggio}`}
						date={new Date(event.data)}
						Icon={iconBacheca}
						header={event.autore}
					>
						{event.listaAllegati[0] && (
							<>
								{" "}
								—{" "}
								{event.listaAllegati
									.map<React.ReactNode>((allegato) => (
										<span
											className="link"
											key={allegato.pk}
											title={allegato.descrizioneFile ?? undefined}
											onClick={async () => {
												const link = await client
													.getLinkAllegato(event.listaAllegati[0].pk)
													.catch(() => {});

												if (link) window.open(link);
											}}
										>
											{event.listaAllegati[0].nomeFile}
										</span>
									))
									.reduce((prev, curr) => [prev, " — ", curr])}
							</>
						)}
					</ListElement>
				),
				date: new Date(event.data),
				type: EventType.Bacheca,
			})),
		...client.dashboard!.bachecaAlunno.filter(predicate).map((event) => ({
			element: (
				<ListElement
					key={event.pk}
					content={event.nomeFile}
					date={new Date(event.data)}
					Icon={iconBachecaAlunno}
					header={event.messaggio}
				/>
			),
			date: new Date(event.datEvento),
			type: EventType.BachecaAlunno,
		})),
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

export default Updates;
