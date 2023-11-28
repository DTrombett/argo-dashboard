"use client";
import Loading from "@/components/Loading";
import LoginForm from "@/components/LoginForm";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
		<main className="flex flex-col min-h-screen p-4 items-center text-center">
			<span className={`m-4 text-4xl ${titleFont.className}`}>
				Argo Dashboard
			</span>
			<div className="h-full w-full flex flex-col flex-auto justify-center items-center">
				{PageElement}
				<Link
					href="https://github.com/DTrombett/argo-dashboard"
					target="_blank"
					className="mt-4 px-1 hover:underline link text-base"
				>
					<FontAwesomeIcon icon={faGithub} height={"1rem"} /> Open Source
				</Link>
			</div>
		</main>
	);
};

export default Home;
