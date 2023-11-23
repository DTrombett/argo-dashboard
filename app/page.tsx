"use client";
import Dashboard from "@/components/Dashboard";
import Loading from "@/components/Loading";
import LoginForm from "@/components/LoginForm";
import { Client } from "portaleargo-api";
import { useEffect, useState } from "react";

const Home = () => {
	const [client, setClient] = useState<Client>();
	const [ready, setReady] = useState<boolean>();

	useEffect(() => {
		void (async () => {
			const newClient = new Client({ debug: true });

			setClient(newClient);
			await newClient
				.login()
				.then(() => {
					setReady(true);
				})
				.catch(() => {
					setReady(false);
				});
		})();
	}, []);
	return (
		<main className="flex flex-col min-h-screen p-4 items-center justify-center text-center">
			<span className="my-4 text-5xl">Argo Dashboard</span>
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
