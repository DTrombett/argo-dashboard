import Canvas from "@/components/Canvas";
import localFont from "next/font/local";
import { Client } from "portaleargo-api";
import { useState } from "react";

const poppinsItalic = localFont({ src: "../public/Poppins-Italic.ttf" });

const Dashboard = ({
	client,
	setReady,
}: {
	client: Client;
	setReady: (ready: boolean) => void;
}) => {
	const [pending, setPending] = useState(false);

	if (!client.dashboard) {
		setReady(false);
		return <></>;
	}
	const period = client.dashboard.listaPeriodi.find((p) => p.pkPeriodo === "*");
	const dataInizio = period?.dataInizio.split("-");
	const dataFine = period?.dataFine.split("-");

	return (
		<>
			<div className="text-xl">
				<div>
					<div className="m-4">Media</div>
					<div className="py-4 border-t-2">
						<span>Generale</span>
						<div className="relative flex justify-center">
							<Canvas media={client.dashboard.mediaGenerale} />
							<span className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
								{client.dashboard.mediaGenerale.toFixed(2)}
							</span>
						</div>
						{period && (
							<div className={`flex flex-col ${poppinsItalic.className}`}>
								<span>Calcolata nel periodo</span>
								<span>
									{dataInizio![2]}/{dataInizio![1]}/{dataInizio![0]} -{" "}
									{dataFine![2]}/{dataFine![1]}/{dataFine![0]}
								</span>
							</div>
						)}
					</div>
					<div className="border-t-2">
						<div className="my-4">Per materia</div>
						<div className="px-4 max-h-40 overflow-y-auto">
							{Object.entries(client.dashboard.mediaMaterie).map(([id, m]) => (
								<div key={id} className="flex justify-between">
									<span
										className="text-left whitespace-nowrap overflow-auto outline-0 hideScrollbar subject"
										tabIndex={-1}
									>
										{
											client.dashboard!.listaMaterie.find((s) => s.pk === id)
												?.materia
										}
									</span>
									<span className="text-right">{m.mediaMateria}</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
			<button
				className="my-8 p-4 w-40 rounded duration-500 bg-zinc-300 dark:bg-zinc-700 text-xl focus-visible:outline-zinc-400 dark:focus-visible:outline-zinc-600 enabled:hover:scale-110 enabled:active:scale-95 disabled:cursor-wait disabled:opacity-50 disabled:bg-zinc-200 dark:disabled:bg-zinc-800"
				disabled={pending}
				onClick={async () => {
					setPending(true);
					await client.logOut().catch(() => {});
					setReady(false);
				}}
			>
				Log out
			</button>
		</>
	);
};

export default Dashboard;
