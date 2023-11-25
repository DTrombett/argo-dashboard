"use client";
import Loading from "@/components/Loading";
import dynamic from "next/dynamic";
import localFont from "next/font/local";
import { Client } from "portaleargo-api";
import { useEffect, useState } from "react";

const titleFont = localFont({ src: "../public/Poppins-ExtraBold.ttf" });
const Dashboard = dynamic(() => import("@/components/Dashboard"), {
	loading: Loading,
});
const LoginForm = dynamic(() => import("@/components/LoginForm"), {
	loading: Loading,
});

const Home = () => {
	const [client, setClient] = useState<Client>();
	const [ready, setReady] = useState<boolean>();

	useEffect(() => {
		const newClient = new Client({ debug: true });

		setClient(newClient);
		if (!localStorage.getItem("token")) {
			setReady(false);
			return;
		}
		newClient
			.login()
			.then(() => {
				setReady(true);
			})
			.catch(() => {
				setReady(false);
			});
	}, []);
	return (
		<main className="flex flex-col min-h-screen p-4 items-center justify-center text-center">
			<span className={`my-4 text-4xl ${titleFont.className}`}>
				Argo Dashboard
			</span>
			{ready === undefined ? (
				<Loading />
			) : ready ? (
				<Dashboard client={client!} setReady={setReady} />
			) : (
				<LoginForm client={client!} setReady={setReady} />
			)}
		</main>
	);
};

export default Home;
