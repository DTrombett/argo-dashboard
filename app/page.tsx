"use client";
import Loading from "@/components/Loading";
import LoginForm from "@/components/LoginForm";
import dynamic from "next/dynamic";
import localFont from "next/font/local";
import Link from "next/link";
import { Client } from "portaleargo-api";
import { useEffect, useState } from "react";

const titleFont = localFont({ src: "../public/Poppins-ExtraBold.ttf" });
const Dashboard = dynamic(() => import("@/components/Dashboard"), {
	loading: Loading,
});

const Home = () => {
	const [client, setClient] = useState<Client>();
	const [ready, setReady] = useState<boolean>();

	useEffect(() => {
		const newClient = new Client();

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
