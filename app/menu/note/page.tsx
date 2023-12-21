"use client";
import { ClientContext } from "@/components/dashboard/ClientProvider";
import local from "next/font/local";
import { useContext } from "react";

const italic = local({ src: "../../../fonts/Poppins-Italic.ttf" });

const Note = () => {
	const { client } = useContext(ClientContext);

	return (
		<>
			{!client.dashboard?.noteDisciplinari.length && (
				<span className={`${italic.className} my-4`}>
					Non hai alcuna nota disciplinare!
				</span>
			)}
			<span className="my-auto px-2 sm:px-4 lg:px-8">
				Nota: Purtroppo il layout delle note disciplinari non è ancora
				disponibile in quanto non abbiamo dati reali su cui testare.
				<br />
				Se hai ricevuto una nota disciplinare (spero per te di no!) ti saremmo
				veramente grati se potessi segnalarcelo su GitHub (
				<a href="https://github.com/DTrombett/argo-dashboard" className="link">
					argo-dashboard
				</a>{" "}
				o{" "}
				<a href="https://github.com/DTrombett/portaleargo-api" className="link">
					portaleargo-api
				</a>
				) tramite un issue e ti diremo come potrai facilmente fornirci un
				esempio sul quale lavorare (senza alcuna informazione personale,
				ovviamente).
			</span>
		</>
	);
};

export default Note;
