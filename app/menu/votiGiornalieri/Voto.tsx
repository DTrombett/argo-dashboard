import local from "next/font/local";
import type { Client } from "portaleargo-api";
import { memo } from "react";

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

const Voto = ({
	v,
	showDescription = false,
}: {
	v: NonNullable<Client["dashboard"]>["voti"][number];
	showDescription?: boolean;
}) => {
	const date = new Date(v.datGiorno);

	return (
		<div className="flex text-lg p-4 my-2 w-full rounded-xl bg-zinc-200 dark:bg-zinc-800">
			<div
				className={`flex mx-1 my-4 w-12 h-12 items-center justify-center text-white bg-opacity-80 rounded-full ${
					v.codTipo === "V"
						? v.valore >= 6
							? "bg-green-500"
							: v.valore < 5
							? "bg-red-500"
							: "bg-orange-500"
						: v.codTipo === "N"
						? "bg-blue-500"
						: ""
				} ${semiBold.className}`}
			>
				<span title={v.valore.toLocaleString()}>{v.codCodice}</span>
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
					className={`py-1 ${
						!showDescription || v.descrizioneProva
							? light.className
							: italic.className
					}`}
				>
					{showDescription
						? v.descrizioneProva || "Descrizione non presente"
						: v.desMateria}
				</span>
				<div
					className={`flex flex-col lg:flex-row justify-between ${light.className} text-sm text-opacity-50 text-black dark:text-white dark:text-opacity-50`}
				>
					<span title={v.descrizioneProva}>
						{v.codTipo === "N" && "Nota — "}Prova{" "}
						{v.codVotoPratico === "S" ? "Scritta" : "Orale"}
					</span>
					<span title={v.descrizioneVoto}>
						{v.codTipo === "V"
							? `Valore: ${v.valore.toLocaleString()}`
							: "Non fa media"}
					</span>
				</div>
			</div>
		</div>
	);
};

export default memo(Voto);
