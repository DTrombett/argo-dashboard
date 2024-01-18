"use client";
import { ClientContext } from "@/components/dashboard/ClientProvider";
import local from "next/font/local";
import { memo, useContext, useMemo } from "react";

const italic = local({ src: "../../../fonts/Poppins-Italic.ttf" });
const semiBold = local({ src: "../../../fonts/Poppins-SemiBold.ttf" });
const medium = local({ src: "../../../fonts/Poppins-Medium.ttf" });
const light = local({ src: "../../../fonts/Poppins-Light.ttf" });
const months = [
	"GEN",
	"FEB",
	"MAR",
	"APR",
	"MAG",
	"GIU",
	"LUG",
	"AGO",
	"SET",
	"OTT",
	"NOV",
	"DIC",
];

const VotiGiornalieri = () => {
	const {
		client: { dashboard },
	} = useContext(ClientContext);

	return useMemo(
		() => (
			<div className="flex flex-col lg:flex-row-reverse justify-between my-2">
				<div className="flex flex-col flex-1 lg:mx-8 my-auto">
					{dashboard?.voti.length ? (
						dashboard.voti
							.toSorted((a, b) =>
								new Date(a.datEvento) > new Date(b.datEvento) ? -1 : 1
							)
							.map((v) => {
								const date = new Date(v.datGiorno);

								return (
									<div
										className="flex text-lg p-4 my-2 w-full rounded-xl bg-zinc-200 dark:bg-zinc-800"
										key={v.pk}
									>
										<div
											className={`flex mx-1 my-4 w-12 h-12 items-center justify-center ${
												v.valore
													? v.valore >= 6
														? "bg-green-500"
														: v.valore < 5
														? "bg-red-500"
														: "bg-orange-500"
													: ""
											} bg-opacity-80 rounded-full ${semiBold.className}`}
										>
											<span title={v.valore.toLocaleString()}>
												{v.codCodice}
											</span>
										</div>
										<div className="ml-4 flex-1 text-left flex flex-col">
											<div className="flex flex-col sm:flex-row w-full justify-between">
												<span
													className={`${medium.className} uppercase`}
													title={v.desCommento}
												>
													{v.docente}
												</span>
												<span className="text-cyan-500 text-base contents">
													{date.getDate()} {months[date.getMonth()]}{" "}
													{date.getFullYear().toString().slice(-2)}
												</span>
											</div>
											<span
												title={v.desCommento}
												className={`py-1 ${light.className}`}
											>
												{v.desMateria}
											</span>
											<div
												className={`flex flex-col lg:flex-row justify-between ${light.className} text-sm text-opacity-50 text-black dark:text-white dark:text-opacity-50`}
											>
												<span title={v.descrizioneProva}>
													Prova {v.codVotoPratico === "S" ? "Scritta" : "Orale"}
												</span>
												<span title={v.descrizioneVoto}>
													Valore: {v.valore.toLocaleString()}
												</span>
											</div>
										</div>
									</div>
								);
							})
					) : (
						<span className={`${italic.className} text-xl py-4 lg:pr-64`}>
							Nessun voto disponibile!
						</span>
					)}
				</div>
			</div>
		),
		[dashboard?.voti]
	);
};

export default memo(VotiGiornalieri);
