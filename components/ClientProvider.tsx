"use client";
import { State } from "@/app/utils";
import dynamic from "next/dynamic";
import { Client } from "portaleargo-api";
import { createContext, useEffect, useState } from "react";

export const ClientContext = createContext(
	{} as { client: Client; state: State; setState: (state: State) => void }
);
const MayNeedLogin = dynamic(() => import("./MayNeedLogin"));
const client = new Client();

const ClientProvider = ({ children }: { children: React.ReactNode }) => {
	const [state, setState] = useState(State.FirstLoading);

	useEffect(() => {
		if (!localStorage.getItem("token")) {
			setState(State.NeedLogin);
			return;
		}
		setState(State.NoDashboard);
		const dashboard = localStorage.getItem("dashboard");

		if (dashboard && !client.dashboard)
			try {
				client.dashboard = JSON.parse(dashboard);
				client.dashboard!.dataAggiornamento = new Date(
					client.dashboard!.dataAggiornamento
				);
				setState(State.OldDashboardReady);
			} catch (err) {}
		client
			.login()
			.then(() => {
				setState(State.Ready);
			})
			.catch(() => {
				setState(State.MayNeedLogin);
			});
	}, []);
	return (
		<ClientContext.Provider value={{ client, state, setState }}>
			{children}
			{state === State.MayNeedLogin && <MayNeedLogin />}
		</ClientContext.Provider>
	);
};

export default ClientProvider;
