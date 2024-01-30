import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import local from "next/font/local";
import type { Dispatch, SetStateAction } from "react";
import type { VotoType } from "./page";

const semiBold = local({ src: "../../../fonts/Poppins-SemiBold.ttf" });
const medium = local({ src: "../../../fonts/Poppins-Medium.ttf" });
const light = local({ src: "../../../fonts/Poppins-Light.ttf" });
const italic = local({ src: "../../../fonts/Poppins-LightItalic.ttf" });
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

const PopupVoto = ({
	date,
	setOpen,
	voto,
}: {
	date: Date;
	setOpen: Dispatch<SetStateAction<boolean>>;
	voto: VotoType;
}) => (
	<>
		<div className="flex flex-row w-full justify-between">
			<div className="flex flex-col">
				<span className={`${medium.className} uppercase`}>{voto.docente}</span>
				<span className="text-cyan-500 text-base py-1">
					{date.getDate()} {months[date.getMonth()]}{" "}
					{date.getFullYear().toString().slice(-2)}
				</span>
			</div>
			<FontAwesomeIcon
				icon={faXmark}
				className="w-8 h-8 p-2 rounded-lg hover:bg-zinc-400 dark:hover:bg-zinc-600 hover:bg-opacity-65 dark:hover:bg-opacity-65 cursor-pointer"
				onClick={setOpen.bind(null, false)}
			/>
		</div>
		<div className="flex my-8 items-center">
			<div
				className={`flex mx-1 w-16 h-16 items-center justify-center text-white bg-opacity-80 rounded-full text-2xl ${
					voto.codTipo === "V"
						? voto.valore >= 6
							? "bg-green-500"
							: voto.valore < 5
							? "bg-red-500"
							: "bg-orange-500"
						: voto.codTipo === "N"
						? "bg-blue-500"
						: ""
				} ${semiBold.className}`}
			>
				<span>{voto.codCodice}</span>
			</div>
			<div className="flex flex-1 flex-col ml-4">
				<span className={`${semiBold.className}`}>{voto.desMateria}</span>
				<span
					className={`${semiBold.className} text-base text-opacity-75 text-black dark:text-white dark:text-opacity-75`}
				>
					{voto.codTipo === "N" && "Nota — "}Prova{" "}
					{voto.codVotoPratico === "S" ? "Scritta" : "Orale"}
				</span>
				<span
					className={`${light.className} text-base text-opacity-50 text-black dark:text-white dark:text-opacity-50`}
				>
					{voto.codTipo === "V"
						? `Valore: ${voto.valore.toLocaleString()}`
						: "Non fa media"}
				</span>
			</div>
		</div>
		<div className="flex flex-col my-4">
			<span className={light.className}>Descrizione prova</span>
			<span className={voto.descrizioneProva ? undefined : italic.className}>
				{voto.descrizioneProva || "Descrizione non presente"}
			</span>
		</div>
		<div className="flex flex-col my-4">
			<span className={light.className}>Commento docente</span>
			<span className={voto.desCommento ? undefined : italic.className}>
				{voto.desCommento || "Descrizione non presente"}
			</span>
		</div>
		<div className="flex flex-col my-4">
			<span className={light.className}>Descrizione voto</span>
			<span className={voto.descrizioneVoto ? undefined : italic.className}>
				{voto.descrizioneVoto || "Descrizione non presente"}
			</span>
		</div>
	</>
);

export default PopupVoto;
