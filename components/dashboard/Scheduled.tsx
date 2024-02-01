"use client";
import { regularItalic } from "@/app/fonts";
import { ScheduledType } from "@/app/utils";
import dynamic from "next/dynamic";
import { useContext, useMemo } from "react";
import LoadingPlaceholder from "../loading/LoadingPlaceholder";
import { ClientContext } from "./ClientProvider";

const ListElement = dynamic(() => import("./ListElement"), {
	loading: () => <LoadingPlaceholder repeat={2} />,
});
const iconAttività = dynamic(() => import("../../icons/attivita-svolta.svg"));
const iconCompiti = dynamic(() => import("../../icons/compiti-assegnati.svg"));
const iconPromemoria = dynamic(
	() => import("../../icons/promemoria-classe.svg")
);
const iconRicevimento = dynamic(
	() => import("../../icons/ricevimento-docenti.svg")
);

const Scheduled = ({
	now,
	tomorrowTime,
	tomorrow,
}: {
	tomorrowTime: number;
} & (
	| {
			now: number;
			tomorrow: string;
	  }
	| {
			now?: undefined;
			tomorrow?: undefined;
	  }
)) => {
	const {
		client: { dashboard },
	} = useContext(ClientContext);
	const registro = useMemo(
		() =>
			dashboard?.registro.flatMap((event) => {
				const array: {
					element: React.JSX.Element;
					type: ScheduledType;
					date: Date;
				}[] = [];
				const date = new Date(event.datGiorno);
				const time = date.getTime();

				if (
					event.attivita &&
					(now === undefined
						? time >= tomorrowTime
						: time > now && time < tomorrowTime)
				)
					array.push({
						element: (
							<ListElement
								key={event.pk}
								content={event.attivita}
								date={date}
								icon={iconAttività}
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
							tomorrow === undefined
								? (c) => new Date(c.dataConsegna).getTime() >= tomorrowTime
								: (c) => c.dataConsegna === tomorrow
						)
						.map((c) => {
							const d = new Date(c.dataConsegna);

							return {
								element: (
									<ListElement
										key={`${event.pk}-${c.compito}-${c.dataConsegna}`}
										content={c.compito}
										date={d}
										icon={iconCompiti}
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
			}) ?? [],
		[dashboard?.registro, now, tomorrow, tomorrowTime]
	);
	const promemoria = useMemo(
		() =>
			dashboard?.promemoria
				.filter((p) => {
					const t = new Date(p.datGiorno).getTime();

					return now === undefined
						? t >= tomorrowTime
						: t > now && t < tomorrowTime;
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
								icon={iconPromemoria}
								header={event.docente}
							/>
						),
						date,
						type: ScheduledType.Promemoria,
					};
				}) ?? [],
		[dashboard?.promemoria, now, tomorrowTime]
	);
	const ricevimenti = useMemo(
		() =>
			dashboard?.prenotazioniAlunni
				.filter((p) => {
					if (p.prenotazione.flgAnnullato === "E") return false;
					const t = new Date(
						`${p.disponibilita.datDisponibilita} ${p.disponibilita.ora_Inizio}`
					).getTime();

					return now === undefined
						? t >= tomorrowTime
						: t > now && t < tomorrowTime;
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
								icon={iconRicevimento}
								headerTitle={event.docente.desEmail}
								header={`${event.docente.desNome[0]}. ${event.docente.desCognome}`}
							/>
						),
						date,
						type: ScheduledType.Prenotazioni,
					};
				}) ?? [],
		[dashboard?.prenotazioniAlunni, now, tomorrowTime]
	);
	const elements: {
		element: React.JSX.Element;
		type: ScheduledType;
		date: Date;
	}[] = useMemo(
		() => [...registro, ...promemoria, ...ricevimenti],
		[registro, promemoria, ricevimenti]
	);

	return useMemo(
		() =>
			elements.length ? (
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
				<span className={regularItalic.className}>
					Nessun impegno imminente!
				</span>
			),
		[elements]
	);
};

export default Scheduled;
