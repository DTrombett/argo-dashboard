import { EventType } from "@/app/utils";
import dynamic from "next/dynamic";
import local from "next/font/local";
import type { Client } from "portaleargo-api";
import { memo } from "react";
import LoadingPlaceholder from "../loading/LoadingPlaceholder";

const ListElement = dynamic(() => import("./ListElement"), {
	loading: () => <LoadingPlaceholder repeat={2} />,
});
const Allegato = dynamic(() => import("./Allegato"));
const VotoPopup = dynamic(() => import("@/app/menu/votiGiornalieri/PopupVoto"));
const iconBachecaAlunno = dynamic(
	() => import("../../icons/bacheca-alunno.svg")
);
const iconBacheca = dynamic(() => import("../../icons/bacheca.svg"));
const iconAppello = dynamic(() => import("../../icons/calendario.svg"));
const iconVoti = dynamic(() => import("../../icons/voti-giornalieri.svg"));
const italic = local({ src: "../../fonts/Poppins-Italic.ttf" });

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
	const checkDate = (time: number) =>
		"now" in options
			? time >= options.weekStart && time <= options.now
			: time < options.weekStart;
	const elements: {
		element: React.JSX.Element;
		type: EventType;
		date: Date;
	}[] = [
		...client
			.dashboard!.appello.filter((e) => checkDate(new Date(e.data).getTime()))
			.map((event) => ({
				element: (
					<ListElement
						key={event.pk}
						title={event.commentoGiustificazione}
						content={`${event.descrizione && `${event.descrizione} — `}${
							event.nota
						}`}
						date={new Date(event.data)}
						icon={iconAppello}
						header={event.docente}
					/>
				),
				date: new Date(event.datEvento),
				type: EventType.Appello,
			})),
		...client
			.dashboard!.fuoriClasse.filter((e) =>
				checkDate(new Date(e.data).getTime())
			)
			.map((event) => ({
				element: (
					<ListElement
						key={event.pk}
						title={event.descrizione}
						content={`Fuori classe ${event.nota}${
							event.descrizione && ` (${event.descrizione})`
						}`}
						date={new Date(event.data)}
						icon={iconAppello}
						header={event.docente}
					/>
				),
				date: new Date(event.data),
				type: EventType.Appello,
			})),
		...client
			.dashboard!.voti.filter((e) => checkDate(new Date(e.datEvento).getTime()))
			.map((event) => {
				const date = new Date(event.datGiorno);

				return {
					element: (
						<ListElement
							key={event.pk}
							content={`Prova ${
								event.codVotoPratico === "S" ? "Scritta" : "Orale"
							}: ${event.valore || event.codCodice} (${event.descrizioneVoto})${
								event.descrizioneProva && ` — ${event.descrizioneProva}`
							}`}
							title={event.desCommento}
							date={date}
							icon={iconVoti}
							header={event.desMateria}
							headerTitle={event.docente}
							popup={({ setOpen }) => (
								<VotoPopup date={date} voto={event} setOpen={setOpen} />
							)}
						/>
					),
					date: new Date(event.datEvento),
					type: EventType.Voti,
				};
			}),
		...client
			.dashboard!.bacheca.filter((e) => checkDate(new Date(e.data).getTime()))
			.map((event) => ({
				element: (
					<ListElement
						key={event.pk}
						content={`${event.categoria}: ${event.messaggio}`}
						date={new Date(event.data)}
						icon={iconBacheca}
						header={event.autore}
					>
						{event.listaAllegati[0] && (
							<>
								{" "}
								—{" "}
								{event.listaAllegati
									.map<React.ReactNode>((allegato) => (
										<Allegato
											allegato={allegato}
											getLink={client.getLinkAllegato.bind(client, allegato.pk)}
											key={allegato.pk}
										/>
									))
									.reduce((prev, curr) => [prev, " — ", curr])}
							</>
						)}
					</ListElement>
				),
				date: new Date(event.data),
				type: EventType.Bacheca,
			})),
		...client
			.dashboard!.bachecaAlunno.filter((e) =>
				checkDate(new Date(e.datEvento).getTime())
			)
			.map((event) => ({
				element: (
					<ListElement
						key={event.pk}
						content={event.nomeFile}
						date={new Date(event.data)}
						icon={iconBachecaAlunno}
						header={event.messaggio}
					>
						{" "}
						—{" "}
						<Allegato
							allegato={event}
							getLink={client.getLinkAllegatoStudente.bind(client, event.pk)}
						/>
					</ListElement>
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

export default memo(Updates);
