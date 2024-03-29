"use client";
import { State } from "@/app/utils";
import { useContext, useState } from "react";
import LoadingBar from "../loading/LoadingBar";
import { ClientContext } from "./ClientProvider";

const RimuoviDati = () => {
	const [pending, setPending] = useState(false);
	const { client, setState } = useContext(ClientContext);

	return (
		<button
			className="relative p-4 w-40 whitespace-nowrap rounded duration-500 bg-zinc-300 dark:bg-zinc-700 text-xl focus-visible:outline-zinc-400 dark:focus-visible:outline-zinc-600 enabled:hover:scale-110 enabled:active:scale-95 disabled:cursor-wait disabled:opacity-50 disabled:bg-zinc-200 dark:disabled:bg-zinc-800"
			disabled={pending}
			onClick={async () => {
				setPending(true);
				setState(State.NoDashboard);
				localStorage.removeItem("dashboard");
				delete client.dashboard;
				await client
					.login()
					.then(() => {
						setState(State.Ready);
					})
					.catch(() => {});
				setPending(false);
			}}
		>
			Rimuovi dati
			{pending && <LoadingBar />}
		</button>
	);
};

export default RimuoviDati;
