"use client";
import { State } from "@/app/utils";
import dynamic from "next/dynamic";
import { Client } from "portaleargo-api";
import { createContext, memo, useEffect, useState } from "react";
import LoginForm from "../auth/LoginForm";
import Loading from "../loading/Loading";

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
				<LoginForm />
			) : (
				children
			)}
			{state === State.MayNeedLogin && <MayNeedLogin />}
		</ClientContext.Provider>
	);
};

export default memo(ClientProvider);
