"use client";
import { State } from "@/app/utils";
import dynamic from "next/dynamic";
import { WebClient } from "portaleargo-api/web";
import { createContext, useEffect, useState } from "react";
import Login from "../auth/Login";
import Loading from "../loading/Loading";
import Offline from "./Offline";

export const ClientContext = createContext(
	{} as { client: WebClient; state: State; setState: (state: State) => void }
);
const MayNeedLogin = dynamic(() => import("./MayNeedLogin"));
const client = new WebClient();

const ClientProvider = ({ children }: { children: React.ReactNode }) => {
	const [state, setState] = useState(State.FirstLoading);

	useEffect(() => {
		if (!localStorage.getItem("token")) {
			setState(State.NeedLogin);
			return;
		}
		setState(State.NoDashboard);
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
		if (window.navigator.onLine === false) {
			client
				.loadData()
				.then(() => {
					setState(State.Offline);
				})
				.catch(() => {
					localStorage.clear();
					setState(State.NeedLogin);
				});
			return;
		}
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
			{state === State.FirstLoading ? (
				<Loading />
			) : state === State.NeedLogin ? (
				<Login />
			) : (
				children
			)}
			{state === State.MayNeedLogin ? (
				<MayNeedLogin />
			) : state === State.Offline ? (
				<Offline />
			) : (
				<></>
			)}
		</ClientContext.Provider>
	);
};

export default ClientProvider;
