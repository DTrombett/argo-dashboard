"use client";
import { ClientContext } from "@/components/dashboard/ClientProvider";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import local from "next/font/local";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { memo, useContext, useMemo } from "react";

const light = local({ src: "../../../fonts/Poppins-Light.ttf" });
const handlePlural = (n: number) => `${n} vot${n === 1 ? "o" : "i"}`;

const PageElements = () => {
	const { client } = useContext(ClientContext);
	const selectedPk = useSelectedLayoutSegment();

	return useMemo(
		() =>
			client.dashboard?.listaMaterie.map((subject, i) => {
				const data = client.dashboard?.mediaMaterie[subject.pk];

				return (
					<Link
						key={subject.pk}
						className={`lg:my-3 lg:rounded-lg hover:bg-zinc-400 dark:hover:bg-zinc-600 flex items-center justify-center cursor-pointer px-4 text-base lg:border h-16 ${
							i + 1 === client.dashboard?.listaMaterie.length
								? "rounded-b-lg "
								: ""
						}${
							selectedPk === subject.pk
								? "bg-zinc-300 dark:bg-zinc-700 hover:bg-opacity-75 dark:hover:bg-opacity-75"
								: "bg-zinc-200 dark:bg-zinc-800 hover:bg-opacity-50 dark:hover:bg-opacity-50"
						}`}
						style={{
							borderColor: data?.mediaMateria
								? data.mediaMateria >= 6
									? "limegreen"
									: data.mediaMateria < 5
									? "orangered"
									: "orange"
								: undefined,
						}}
						href={`/menu/votiGiornalieri/${subject.pk}`}
					>
						<div className="flex flex-col flex-1 text-left overflow-hidden lg:mx-1">
							<span className="whitespace-nowrap overflow-auto hideScrollbar">
								{subject.materia}
							</span>
							<span
								className={`${light.className} text-opacity-50 text-black dark:text-white dark:text-opacity-50 overflow-auto cursor-text whitespace-nowrap hideScrollbar`}
							>
								{data?.numVoti
									? `Media: ${data.mediaMateria || "N/A"} (${handlePlural(
											data.numVoti
									  )}) | Scritto: ${
											data.mediaScritta || "N/A"
									  } (${handlePlural(data.numValutazioniScritto)}) | Orale: ${
											data.mediaOrale || "N/A"
									  } (${handlePlural(data.numValutazioniOrale)})`
									: "Nessun voto disponibile!"}
							</span>
						</div>
						<FontAwesomeIcon
							icon={faChevronRight}
							className="h-4 w-4 ml-1 p-2 rounded-lg hidden lg:block hover:bg-zinc-400 dark:hover:bg-zinc-600"
						/>
					</Link>
				);
			}),
		[client.dashboard?.listaMaterie, client.dashboard?.mediaMaterie, selectedPk]
	);
};

export default memo(PageElements);
