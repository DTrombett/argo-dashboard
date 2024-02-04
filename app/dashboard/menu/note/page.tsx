"use client";
import { regularItalic } from "@/app/fonts";
import { ClientContext } from "@/components/dashboard/ClientProvider";
import { faCopy } from "@fortawesome/free-regular-svg-icons/faCopy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";

const Note = () => {
	const {
		client: { dashboard },
	} = useContext(ClientContext);
	const data = JSON.stringify(dashboard?.noteDisciplinari, null, 2);

	return (
		<>
			{dashboard?.noteDisciplinari.length ? (
				<code className="m-2 sm:m-4 md:m-6 lg:m-8 p-4 whitespace-break-spaces break-all text-left bg-zinc-200 dark:bg-zinc-800 rounded-xl relative">
					{/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */}
					{navigator.clipboard && (
						<FontAwesomeIcon
							icon={faCopy}
							className="absolute right-4 top-4 h-8 p-3 rounded-lg cursor-pointer hover:bg-zinc-300 dark:hover:bg-zinc-700 hover:bg-opacity-80 dark:hover:bg-opacity-80"
							onClick={navigator.clipboard.writeText.bind(
								navigator.clipboard,
								data
							)}
						/>
					)}
					{data}
				</code>
			) : (
				<span className={`${regularItalic.className} my-4`}>
					Non hai alcuna nota disciplinare!
				</span>
			)}
		</>
	);
};

export default Note;
