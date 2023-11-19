import Canvas from "@/components/Canvas";
import LogOutButton from "@/components/LogOutButton";
import SetToken from "@/components/SetToken";
import localFont from "next/font/local";
import { redirect } from "next/navigation";
import { getDashboard } from "../actions";

const poppinsItalic = localFont({ src: "../../public/Poppins-Italic.ttf" });

const Dashboard = async () => {
	const { dashboard, token } = await getDashboard();

	if (!token) redirect("/");
	const period = dashboard.listaPeriodi.find((p) => p.pkPeriodo === "*");
	const dataInizio = period?.dataInizio.split("-");
	const dataFine = period?.dataFine.split("-");

	return (
		<>
			<main className="flex flex-col min-h-screen p-4 justify-center text-center">
				<div className="flex flex-col justify-center items-center w-full">
					<h1 className="my-8 text-5xl">Argo Dashboard</h1>
					<div className="text-xl">
						<div>
							<div className="m-4">Media</div>
							<div className="py-4 border-t-2">
								<span>Generale</span>
								<div className="relative flex justify-center">
									<Canvas media={dashboard.mediaGenerale} />
									<span className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
										{dashboard.mediaGenerale.toFixed(2)}
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
									{Object.entries(dashboard.mediaMaterie).map(([id, m]) => (
										<div key={id} className="flex justify-between">
											<span
												className="text-left whitespace-nowrap overflow-auto outline-0 hideScrollbar subject"
												tabIndex={-1}
											>
												{
													dashboard.listaMaterie.find((s) => s.pk === id)
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
					<LogOutButton />
				</div>
			</main>
			<SetToken token={JSON.stringify(token)} />
		</>
	);
};

export default Dashboard;
