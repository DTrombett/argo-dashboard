"use client";
import { AppelloIndexes } from "@/app/utils";
import { useContext, useMemo } from "react";
import attività from "../../icons/attivita-svolta.svg";
import bachecaAlunno from "../../icons/bacheca-alunno.svg";
import bacheca from "../../icons/bacheca.svg";
import appello from "../../icons/calendario.svg";
import compiti from "../../icons/compiti-assegnati.svg";
import condivisione from "../../icons/condivisione-documenti.svg";
import curriculum from "../../icons/curriculum.svg";
import note from "../../icons/note-personali.svg";
import orario from "../../icons/orario.svg";
import promemoria from "../../icons/promemoria-classe.svg";
import ricevimento from "../../icons/ricevimento-docenti.svg";
import pagamenti from "../../icons/tasse-icon.svg";
import votiGiornalieri from "../../icons/voti-giornalieri.svg";
import votiScrutinio from "../../icons/voti-scrutinio.svg";
import { ClientContext } from "../dashboard/ClientProvider";
import MenuEntry from "./MenuEntry";

const appelloTitles: ((n: number) => string)[] = [
	(n) => `assenz${n === 1 ? "a" : "e"}`,
	(n) => `ritard${n === 1 ? "o" : "i"}`,
	(n) => `uscit${n === 1 ? "a" : "e"}`,
	() => "fuori classe",
];
const timeTitles = [
	() => "entro domani",
	(n: number) => `successiv${n === 1 ? "o" : "i"}`,
];

const MenuList = ({ className }: { className?: string }) => {
	const {
		client: { dashboard },
	} = useContext(ClientContext);
	const appelloSummary = useMemo(() => {
		if (!dashboard?.fuoriClasse) return undefined;
		const result = [0, 0, 0, dashboard.fuoriClasse.length];

		for (const entry of dashboard.appello)
			result[AppelloIndexes[entry.codEvento as keyof typeof AppelloIndexes]]++;
		return (
			result
				.map((n, i) => n && `${n} ${appelloTitles[i](n)}`)
				.filter((n) => n)
				.join(", ") || "Nessun evento"
		);
	}, [dashboard?.appello, dashboard?.fuoriClasse]);
	const votiSummary = useMemo(() => {
		if (!dashboard?.voti) return undefined;
		const now = Date.now();
		const { length } = dashboard.voti.filter((entry) => {
			const date = new Date(entry.datEvento);

			return date.setDate(date.getDate() + 1) >= now;
		});
		const medie = dashboard.mediaPerPeriodo
			? Object.entries(dashboard.mediaPerPeriodo)
					.filter(([, m]) => m.mediaGenerale)
					.map(([n, m]) => `${n}: ${m.mediaGenerale}`)
					.join(", ")
			: "";

		return (
			`${medie && `Media ${medie}`}${
				length
					? ` | ${length} ${length === 1 ? "voto recente" : "voti recenti"}`
					: ""
			}` || "Nessun voto disponibile!"
		);
	}, [dashboard?.voti, dashboard?.mediaPerPeriodo]);
	const attivitàSummary = useMemo(() => {
		if (!dashboard?.registro) return undefined;
		const now = Date.now();
		const { length } = dashboard.registro.filter(
			(entry) => entry.attivita && Date.parse(entry.datGiorno) > now
		);

		return length
			? `${length} attività programmat${length === 1 ? "a" : "e"}`
			: "Nessuna attività programmata";
	}, [dashboard?.registro]);
	const compitiSummary = useMemo(() => {
		if (!dashboard?.registro) return undefined;
		const now = Date.now();
		const counts = [0, 0];

		for (const entry of dashboard.registro)
			for (const homework of entry.compiti) {
				const date = new Date(homework.dataConsegna);
				const time = date.getTime();

				if (date.setDate(date.getDate() - 1) > now) counts[1]++;
				else if (time > now) counts[0]++;
			}
		return (
			counts
				.map((n, i) => n && `${n} ${timeTitles[i](n)}`)
				.filter((n) => n)
				.join(", ") || "Nessun compito"
		);
	}, [dashboard?.registro]);
	const promemoriaSummary = useMemo(() => {
		if (!dashboard?.promemoria) return undefined;
		const now = Date.now();
		const counts = [0, 0];

		for (const entry of dashboard.promemoria) {
			const date = new Date(entry.datGiorno);
			const time = date.getTime();

			if (date.setDate(date.getDate() - 1) > now) counts[1]++;
			else if (time > now) counts[0]++;
		}
		return (
			counts
				.map((n, i) => n && `${n} ${timeTitles[i](n)}`)
				.filter((n) => n)
				.join(", ") || "Nessun promemoria"
		);
	}, [dashboard?.promemoria]);
	const ricevimentoSummary = useMemo(() => {
		if (!dashboard?.prenotazioniAlunni) return undefined;
		const now = Date.now();
		const counts = [0, 0];

		for (const entry of dashboard.prenotazioniAlunni) {
			if (entry.prenotazione.flgAnnullato === "E") continue;
			const date = new Date(entry.disponibilita.datDisponibilita);
			const time = date.getTime();

			if (date.setDate(date.getDate() - 1) > now) counts[1]++;
			else if (time > now) counts[0]++;
		}
		return (
			counts
				.map((n, i) => n && `${n} ${timeTitles[i](n)}`)
				.filter((n) => n)
				.join(", ") || "Nessun ricevimento"
		);
	}, [dashboard?.prenotazioniAlunni]);
	const bachecaSummary = useMemo(() => {
		if (!dashboard?.bacheca) return undefined;
		const now = Date.now();
		const { length } = dashboard.bacheca.filter((entry) => {
			const date = new Date(entry.datEvento);

			return date.setDate(date.getDate() + 1) >= now;
		});

		return `${length} ${
			length === 1 ? "comunicazione recente" : "comunicazioni recenti"
		}`;
	}, [dashboard?.bacheca]);
	const bachecaAlunnoSummary = useMemo(() => {
		if (!dashboard?.bachecaAlunno) return undefined;
		const now = Date.now();
		const { length } = dashboard.bachecaAlunno.filter((entry) => {
			const date = new Date(entry.datEvento);

			return date.setDate(date.getDate() + 1) >= now;
		});

		return `${length} ${
			length === 1 ? "comunicazione recente" : "comunicazioni recenti"
		}`;
	}, [dashboard?.bachecaAlunno]);

	return (
		<>
			<MenuEntry
				summary={appelloSummary}
				color="#07abbe"
				icon={appello}
				name="Eventi appello"
				className={className}
				page="eventiAppello"
			/>
			<MenuEntry
				summary={
					dashboard &&
					`${dashboard.noteDisciplinari.length} ${
						dashboard.noteDisciplinari.length === 1
							? "nota disciplinare"
							: "note disciplinari"
					}`
				}
				color="#ffb498"
				icon={note}
				name="Note"
				className={className}
				page="note"
			/>
			<MenuEntry
				summary={votiSummary}
				color="#e06f5c"
				icon={votiGiornalieri}
				name="Voti giornalieri"
				className={className}
				page="votiGiornalieri"
			/>
			<MenuEntry
				color="#9f72d5"
				icon={votiScrutinio}
				name="Voti scrutinio"
				className={className}
				page="votiScrutinio"
			/>
			<MenuEntry
				summary={attivitàSummary}
				color="#3e90d8"
				icon={attività}
				name="Attività svolta"
				className={className}
				page="attivitàSvolta"
			/>
			<MenuEntry
				summary={compitiSummary}
				color="#7080fe"
				icon={compiti}
				name="Compiti assegnati"
				className={className}
				page="compitiAssegnati"
			/>
			<MenuEntry
				summary={promemoriaSummary}
				color="#ff5d63"
				icon={promemoria}
				name="Promemoria"
				className={className}
				page="promemoria"
			/>
			<MenuEntry
				color="#f8b3ca"
				icon={orario}
				name="Orario"
				className={className}
				page="orario"
			/>
			<MenuEntry
				summary={ricevimentoSummary}
				color="#90c078"
				icon={ricevimento}
				name="Ricevimento docenti"
				className={className}
				page="ricevimentoDocenti"
			/>
			<MenuEntry
				summary={bachecaSummary}
				color="#06aabe"
				icon={bacheca}
				name="Bacheca"
				className={className}
				page="bacheca"
			/>
			<MenuEntry
				summary={bachecaAlunnoSummary}
				color="#07abbe"
				icon={bachecaAlunno}
				name="Bacheca alunno"
				className={className}
				page="bachecaAlunno"
			/>
			<MenuEntry
				summary={
					dashboard &&
					`${dashboard.fileCondivisi.listaFile.length} file condivisi`
				}
				color="#45dda1"
				icon={condivisione}
				name="Condivisione"
				className={className}
				page="condivisione"
			/>
			<MenuEntry
				color="#07abbe"
				icon={pagamenti}
				name="Pagamenti"
				className={className}
				page="pagamenti"
			/>
			<MenuEntry
				color="#385a90"
				icon={curriculum}
				name="Curriculum"
				className={className}
				page="curriculum"
			/>
		</>
	);
};

export default MenuList;
