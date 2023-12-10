"use client";
import { ClientContext } from "@/components/ClientProvider";
import Loading from "@/components/Loading";
import LoginForm from "@/components/LoginForm";
import dynamic from "next/dynamic";
import { useContext } from "react";
import { State } from "./utils";

const Navigator = dynamic(() => import("@/components/Navigator"), {
	loading: Loading,
});

const Home = () => {
	switch (useContext(ClientContext).state) {
		case State.NeedLogin:
			return <LoginForm />;
		case State.NoDashboard:
		case State.OldDashboardReady:
		case State.Ready:
		case State.MayNeedLogin:
			return <Navigator />;
		default:
			return <Loading />;
	}
};

export default Home;
