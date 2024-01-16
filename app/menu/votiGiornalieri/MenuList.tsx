"use client";
import { ClientContext } from "@/components/dashboard/ClientProvider";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import local from "next/font/local";
import { useContext, useMemo, useState } from "react";

const light = local({ src: "../../../fonts/Poppins-Light.ttf" });
const handlePlural = (n: number) => `${n} vot${n === 1 ? "o" : "i"}`;

const PageElements = () => {
	const { client } = useContext(ClientContext);
	const [selectedPk, setSelected] = useState<string>();
	const list = useMemo(
		() =>
			client.dashboard?.listaMaterie.map((subject) => {
				const data = client.dashboard?.mediaMaterie[subject.pk];

				return (
					<div
						key={subject.pk}
						className={`my-3 rounded-lg hover:bg-zinc-400 dark:hover:bg-zinc-600 flex items-center justify-center cursor-pointer px-4 text-base border menuEntry ${
							selectedPk === subject.pk
								? "bg-zinc-300 dark:bg-zinc-700 hover:bg-opacity-75 dark:hover:bg-opacity-75"
								: "bg-zinc-200 dark:bg-zinc-800 hover:bg-opacity-50 dark:hover:bg-opacity-50"
						}`}
						onClick={setSelected.bind(null, subject.pk)}
						style={{
							borderColor: data?.mediaMateria
								? data.mediaMateria >= 6
									? "limegreen"
									: data.mediaMateria < 5
									? "orangered"
									: "orange"
								: undefined,
						}}
					>
						<div className="flex flex-col flex-1 text-left overflow-hidden ml-2 mr-1">
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
							className="h-4 w-4 ml-1 p-2 rounded-lg hover:bg-zinc-400 dark:hover:bg-zinc-600"
						/>
					</div>
				);
			}),
		[client.dashboard?.listaMaterie, client.dashboard?.mediaMaterie, selectedPk]
	);

	return (
		<div className="w-full lg:w-1/3 mt-2 lg:pr-4 lg:border-r border-zinc-500">
			{list}
		</div>
	);
};

export default PageElements;
