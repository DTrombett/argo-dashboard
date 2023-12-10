import type { State } from "@/app/utils";
import { AppelloIndexes, Tab } from "@/app/utils";
import dynamic from "next/dynamic";
import type { Dashboard as APIDashboard, Client } from "portaleargo-api";
import MenuList from "@/components/MenuList";
import { useState } from "react";
import Home from "../icons/home-bianca.svg";
import MenuIcon from "../icons/menu-icon.svg";
import Opzioni from "../icons/opzioni.svg";
import Dashboard from "./Dashboard";
import Loading from "./Loading";
import TabIcon from "./TabIcon";

//#region summaries
const appelloTitles: ((n: number) => string)[] = [
	(n) => `assenz${n === 1 ? "a" : "e"}`,
	(n) => `ritard${n === 1 ? "o" : "i"}`,
	(n) => `uscit${n === 1 ? "a" : "e"}`,
	() => "fuori classe",
];
const timeTitles = ["entro domani", "successivi"];

const resolveAppello = (dashboard: APIDashboard) => {
	const result = [0, 0, 0, dashboard.fuoriClasse.length];

	for (const entry of dashboard.appello)
		result[AppelloIndexes[entry.codEvento as keyof typeof AppelloIndexes]]++;
	return (
		result
			.map((n, i) => n && `${n} ${appelloTitles[i](n)}`)
			.filter((n) => n)
			.join(", ") || "Nessun evento"
	);
};
const resolveVoti = (dashboard: APIDashboard) => {
	const now = Date.now();
	const { length } = dashboard.voti.filter((entry) => {
		const date = new Date(entry.datEvento);

		return date.setDate(date.getDate() + 1) >= now;
	});

	return `Media generale: ${dashboard.mediaGenerale}${
		length ? ` — ${length} voti recenti` : ""
	}`;
};
const resolveNote = (dashboard: APIDashboard) =>
	`${dashboard.noteDisciplinari.length} note disciplinari`;
const resolveAttività = (dashboard: APIDashboard) => {
	const now = Date.now();
	const { length } = dashboard.registro.filter(
		(entry) => entry.attivita && new Date(entry.datGiorno).getTime() > now
	);

	return length
		? `${length} attività programmat${length === 1 ? "a" : "e"}`
		: "Nessuna attività programmata";
};
const resolveCompiti = (dashboard: APIDashboard) => {
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
			.map((n, i) => n && `${n} ${timeTitles[i]}`)
			.filter((n) => n)
			.join(", ") || "Nessun compito"
	);
};
const resolvePromemoria = (dashboard: APIDashboard) => {
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
			.map((n, i) => n && `${n} ${timeTitles[i]}`)
			.filter((n) => n)
			.join(", ") || "Nessun promemoria"
	);
};
const resolvePrenotazioni = (dashboard: APIDashboard) => {
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
			.map((n, i) => n && `${n} ${timeTitles[i]}`)
			.filter((n) => n)
			.join(", ") || "Nessun ricevimento"
	);
};
const resolveBacheca = (dashboard: APIDashboard) => {
	const now = Date.now();

	return `${
		dashboard.bacheca.filter((entry) => {
			const date = new Date(entry.datEvento);

			return date.setDate(date.getDate() + 1) >= now;
		}).length
	} comunicazioni recenti`;
};
const resolveBachecaAlunno = (dashboard: APIDashboard) => {
	const now = Date.now();

	return `${
		dashboard.bachecaAlunno.filter((entry) => {
			const date = new Date(entry.datEvento);

			return date.setDate(date.getDate() + 1) >= now;
		}).length
	} comunicazioni recenti`;
};
//#endregion

const Menu = dynamic(() => import("@/components/Menu"), {
	loading: Loading,
});

const Navigator = ({
	client,
	loading,
	setState,
}: {
	loading?: boolean;
	client: Client;
	setState: (state: State) => void;
}) => {
	const [tab, setTab] = useState(Tab.Home);

	return (
		<>
			{tab === Tab.Home ? (
				<Dashboard loading={loading} client={client} setState={setState} />
			) : tab === Tab.Menu ? (
				<Menu client={client} />
			) : (
				<></>
			)}
			<div className="fixed lg:top-0 left-0 bottom-0 w-screen lg:w-20 bg-zinc-200 dark:bg-zinc-800 flex flex-row lg:flex-col p-2 rounded-t-2xl lg:rounded-r-2xl lg:rounded-tl-none whitespace-nowrap overflow-auto navigator hideScrollbar">
				<TabIcon
					name="Home"
					icon={<Home className="invert dark:invert-0" />}
					onClick={setTab.bind(null, Tab.Home)}
					active={tab === Tab.Home}
				/>
				<TabIcon
					name="Menu"
					icon={<MenuIcon />}
					onClick={setTab.bind(null, Tab.Menu)}
					active={tab === Tab.Menu}
					className="lg:hidden"
				/>
				<TabIcon
					name="Opzioni"
					icon={<Opzioni />}
					onClick={setTab.bind(null, Tab.Options)}
					active={tab === Tab.Options}
				/>
				<MenuList client={client} className="hidden lg:flex" />
			</div>
		</>
	);
};

export default Navigator;
