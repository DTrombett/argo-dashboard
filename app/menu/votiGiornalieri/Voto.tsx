"use client";
import TouchableOpacity from "@/components/Utils/TouchableOpacity";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons/faUpRightFromSquare";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dynamic from "next/dynamic";
import local from "next/font/local";
import type { Client } from "portaleargo-api";
import { memo, useMemo, useState } from "react";

const semiBold = local({ src: "../../../fonts/Poppins-SemiBold.ttf" });
const medium = local({ src: "../../../fonts/Poppins-Medium.ttf" });
const light = local({ src: "../../../fonts/Poppins-Light.ttf" });
const italic = local({ src: "../../../fonts/Poppins-LightItalic.ttf" });
const Popup = dynamic(() => import("@/components/Utils/Popup"));
const PopupVoto = dynamic(() => import("./PopupVoto"));
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
	voto,
	showDescription = false,
}: {
	voto: NonNullable<Client["dashboard"]>["voti"][number];
	showDescription?: boolean;
}) => {
	const [open, setOpen] = useState(false);
	const date = useMemo(() => new Date(voto.datGiorno), [voto.datGiorno]);
	const details = useMemo(
		() => (
			<>
				<div
					className={`flex mx-1 my-4 w-12 h-12 items-center justify-center text-white bg-opacity-80 rounded-full ${
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
					<span title={voto.valore.toLocaleString()}>{voto.codCodice}</span>
				</div>
				<div className="ml-4 flex-1 text-left flex flex-col">
					<div className="flex flex-row w-full justify-between">
						<div className="flex flex-col">
							<span
								className={`${medium.className} uppercase`}
								title={voto.desCommento}
							>
								{voto.docente}
							</span>
							<span className="text-cyan-500 text-base contents">
								{date.getDate()} {months[date.getMonth()]}{" "}
								{date.getFullYear().toString().slice(-2)}
							</span>
						</div>
						<FontAwesomeIcon
							icon={faUpRightFromSquare}
							className="w-6 h-6 p-2 rounded-lg hover:bg-zinc-400 dark:hover:bg-zinc-600 hover:bg-opacity-65 dark:hover:bg-opacity-65"
						/>
					</div>
					<span
						title={voto.desCommento}
						className={`py-1 ${
							!showDescription || voto.descrizioneProva
								? light.className
								: italic.className
						}`}
					>
						{showDescription
							? voto.descrizioneProva || "Descrizione non presente"
							: voto.desMateria}
					</span>
					<div
						className={`flex flex-col sm:flex-row justify-between ${light.className} text-sm text-opacity-50 text-black dark:text-white dark:text-opacity-50`}
					>
						<span title={showDescription ? undefined : voto.descrizioneProva}>
							{voto.codTipo === "N" && "Nota — "}Prova{" "}
							{voto.codVotoPratico === "S" ? "Scritta" : "Orale"}
						</span>
						<span title={voto.descrizioneVoto}>
							{voto.codTipo === "V"
								? `Valore: ${voto.valore.toLocaleString()}`
								: "Non fa media"}
						</span>
					</div>
				</div>
			</>
		),
		[showDescription, voto, date]
	);

	return (
		<TouchableOpacity
			className={`flex text-lg p-4 my-2 w-full rounded-xl bg-zinc-200 dark:bg-zinc-800 ${
				open
					? ""
					: "cursor-pointer lg:hover:bg-zinc-300 lg:dark:hover:bg-zinc-700 lg:hover:bg-opacity-65 lg:dark:hover:bg-opacity-65"
			}`}
			tabIndex={0}
			onKeyDown={
				open
					? undefined
					: (event) => {
							if (event.key === "Enter") setOpen(true);
					  }
			}
			onClick={open ? undefined : setOpen.bind(null, true)}
		>
			{details}
			{open && (
				<Popup setOpen={setOpen}>
					<PopupVoto date={date} setOpen={setOpen} voto={voto} />
				</Popup>
			)}
		</TouchableOpacity>
	);
};

export default memo(Voto);
