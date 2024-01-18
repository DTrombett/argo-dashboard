import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import local from "next/font/local";
import Link from "next/link";
import { memo } from "react";

const light = local({ src: "../../../fonts/Poppins-Light.ttf" });
const handlePlural = (n: number) => `${n} vot${n === 1 ? "o" : "i"}`;

const MenuItem = ({
	name,
	selected,
	last = false,
	pk = "",
	avg,
	numVoti,
	mediaMateria,
	mediaOrale = 0,
	mediaScritta = 0,
	numValutazioniOrale = 0,
	numValutazioniScritto = 0,
}: {
	name: string;
	selected: boolean;
	last?: boolean;
	pk?: string;
	avg?: number;
	numVoti?: number;
	mediaMateria?: number;
	mediaOrale?: number;
	mediaScritta?: number;
	numValutazioniOrale?: number;
	numValutazioniScritto?: number;
}) => (
	<Link
		className={`lg:my-3 lg:rounded-lg h-16 hover:bg-zinc-400 dark:hover:bg-zinc-600 flex items-center justify-center cursor-pointer px-4 text-base lg:border border-zinc-500 ${
			avg
				? avg >= 6
					? "lg:border-green-500"
					: avg < 5
					? "lg:border-red-500"
					: "lg:border-orange-500"
				: ""
		} ${
			selected
				? "bg-zinc-300 dark:bg-zinc-700 hover:bg-opacity-75 dark:hover:bg-opacity-75"
				: "bg-zinc-200 dark:bg-zinc-800 hover:bg-opacity-50 dark:hover:bg-opacity-50"
		} ${last ? "rounded-b-lg" : "border-b"}`}
		href={`/menu/votiGiornalieri/${pk}`}
	>
		<div className="flex flex-col flex-1 text-left overflow-hidden lg:mx-1">
			<span className="whitespace-nowrap overflow-auto hideScrollbar">
				{name}
			</span>
			{pk && (
				<span
					className={`${light.className} text-opacity-50 text-black dark:text-white dark:text-opacity-50 overflow-auto cursor-text whitespace-nowrap hideScrollbar`}
				>
					{numVoti
						? `Media: ${mediaMateria} (${handlePlural(numVoti)}) | Scritto: ${
								mediaScritta || "N/A"
						  } (${handlePlural(numValutazioniScritto)}) | Orale: ${
								mediaOrale || "N/A"
						  } (${handlePlural(numValutazioniOrale)})`
						: "Nessun voto disponibile!"}
				</span>
			)}
		</div>
		<FontAwesomeIcon
			icon={faChevronRight}
			className="h-4 w-4 ml-1 p-2 rounded-lg hidden lg:block hover:bg-zinc-400 dark:hover:bg-zinc-600"
		/>
	</Link>
);

export default memo(MenuItem);
