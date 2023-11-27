"use client";
import Loading from "@/components/Loading";
import LoginForm from "@/components/LoginForm";
import dynamic from "next/dynamic";
import localFont from "next/font/local";
import Link from "next/link";
import { Client } from "portaleargo-api";
import { useEffect, useState } from "react";
import { State } from "./utils";

const client = new Client();
const titleFont = localFont({ src: "../public/Poppins-ExtraBold.ttf" });
const Dashboard = dynamic(() => import("@/components/Dashboard"), {
	loading: Loading,
});

const Home = () => {
	const [state, setState] = useState(State.FirstLoading);
	let PageElement: React.JSX.Element;

	useEffect(() => {
		if (!localStorage.getItem("token")) {
			setState(State.NeedLogin);
			return;
		}
		setState(State.NoDashboard);
		const dashboard = localStorage.getItem("dashboard");

		if (dashboard)
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
				setState(State.NeedLogin);
			});
	}, []);
	switch (state) {
		case State.NeedLogin:
			PageElement = <LoginForm client={client} setState={setState} />;
			break;
		case State.NoDashboard:
		case State.OldDashboardReady:
		case State.Ready:
			PageElement = (
				<Dashboard
					loading={state !== State.Ready}
					client={client}
					setState={setState}
				/>
			);
			break;
		default:
			PageElement = <Loading />;
	}
	return (
		<main className="flex flex-col min-h-screen p-4 items-center justify-center text-center">
			<span className={`my-4 text-4xl ${titleFont.className}`}>
				Argo Dashboard
			</span>
			{PageElement}
			<Link
				href="https://github.com/DTrombett/argo-dashboard"
				target="_blank"
				className="my-4 hover:underline link"
			>
				Source code
			</Link>
		</main>
	);
};

export default Home;
