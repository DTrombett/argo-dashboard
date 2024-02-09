"use client";
import { regularItalic } from "@/app/fonts";
import { EventType } from "@/app/utils";
import dynamic from "next/dynamic";
import { useCallback, useContext, useMemo } from "react";
import LoadingPlaceholder from "../loading/LoadingPlaceholder";
import { ClientContext } from "./ClientProvider";

const ListElement = dynamic(() => import("./ListElement"), {
	loading: () => <LoadingPlaceholder repeat={2} />,
});
const Allegato = dynamic(() => import("./Allegato"));
const VotoPopup = dynamic(
	() => import("@/app/dashboard/menu/votiGiornalieri/PopupVoto")
);
const iconBachecaAlunno = dynamic(
	() => import("../../icons/bacheca-alunno.svg")
);
const iconBacheca = dynamic(() => import("../../icons/bacheca.svg"));
const iconAppello = dynamic(() => import("../../icons/calendario.svg"));
const iconVoti = dynamic(() => import("../../icons/voti-giornalieri.svg"));

const Updates = ({
	weekStart,
	now,
}: {
	weekStart: number;
} & (
	| {
			now: number;
	  }
	| { now?: undefined }
)) => {
	const { client } = useContext(ClientContext);
	const { appello, fuoriClasse, voti } = client.dashboard!;
	const checkDate = useCallback(
		(time: number) =>
			now === undefined ? time < weekStart : time >= weekStart && time <= now,
		[now, weekStart]
	);
	const appelloArray = useMemo(
		() =>
			appello
				.filter((e) => checkDate(Date.parse(e.data)))
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
					date: Date.parse(event.datEvento),
					type: EventType.Appello,
				})),
		[checkDate, appello]
	);
	const fuoriClasseArray = useMemo(
		() =>
			fuoriClasse
				.filter((e) => checkDate(Date.parse(e.data)))
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
					date: Date.parse(event.data),
					type: EventType.Appello,
				})),
		[checkDate, fuoriClasse]
	);
	const votiArray = useMemo(
		() =>
			voti
				.filter((e) => checkDate(Date.parse(e.datEvento)))
				.map((event) => {
					const date = new Date(event.datGiorno);

					return {
						element: (
							<ListElement
								key={event.pk}
								content={`Prova ${
									event.codVotoPratico === "S" ? "Scritta" : "Orale"
								}: ${event.valore || event.codCodice} (${
									event.descrizioneVoto
								})${event.descrizioneProva && ` — ${event.descrizioneProva}`}`}
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
						date: Date.parse(event.datEvento),
						type: EventType.Voti,
					};
				}),
		[checkDate, voti]
	);
	const bacheca = useMemo(
		() =>
			client
				.dashboard!.bacheca.filter((e) => checkDate(Date.parse(e.data)))
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
												getLink={client.getLinkAllegato.bind(
													client,
													allegato.pk
												)}
												key={allegato.pk}
											/>
										))
										.reduce((prev, curr) => [prev, " — ", curr])}
								</>
							)}
						</ListElement>
					),
					date: Date.parse(event.data),
					type: EventType.Bacheca,
				})),
		[checkDate, client]
	);
	const bachecaAlunno = useMemo(
		() =>
			client
				.dashboard!.bachecaAlunno.filter((e) =>
					checkDate(Date.parse(e.datEvento))
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
					date: Date.parse(event.datEvento),
					type: EventType.BachecaAlunno,
				})),
		[checkDate, client]
	);
	const elements: {
		element: React.JSX.Element;
		type: EventType;
		date: number;
	}[] = useMemo(
		() =>
			appelloArray.concat(fuoriClasseArray, votiArray, bacheca, bachecaAlunno),
		[appelloArray, fuoriClasseArray, votiArray, bacheca, bachecaAlunno]
	);

	return useMemo(
		() =>
			elements.length ? (
				elements
					.sort(
						({ type: type1, date: date1 }, { type: type2, date: date2 }) =>
							date2 - date1 || type1 - type2
					)
					.filter((e, i, array) =>
						array.every((a, j) => j <= i || a.element.key !== e.element.key)
					)
					.map(({ element }) => element)
			) : (
				<span className={regularItalic.className}>
					Nessun evento disponibile!
				</span>
			),
		[elements]
	);
};

export default Updates;
