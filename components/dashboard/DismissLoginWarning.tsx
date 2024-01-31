"use client";
import { State } from "@/app/utils";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { ClientContext } from "./ClientProvider";

const DismissLoginWarning = () => {
	const { setState } = useContext(ClientContext);

	return (
		<FontAwesomeIcon
			icon={faXmark}
			className="w-4 h-4 p-1 rounded-full bg-red-800 cursor-pointer"
			onClick={() => {
				setState(State.Ready);
			}}
		/>
	);
};

export default DismissLoginWarning;
