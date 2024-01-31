"use client";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { useEffect } from "react";

const Popup = ({
	setOpen,
	children,
}: {
	setOpen: Dispatch<SetStateAction<boolean>>;
	children: ReactNode;
}) => {
	useEffect(() => {
		const listener = (event: KeyboardEvent) => {
			if (event.key === "Escape") setOpen(false);
		};

		document.body.addEventListener("keydown", listener);
		return window.removeEventListener.bind(
			null,
			"keydown",
			listener as EventListener
		);
	}, [setOpen]);

	return (
		<div
			className="fixed left-0 right-0 top-0 bottom-0 z-10 w-full h-full bg-zinc-900 bg-opacity-75 blockScroll"
			onClick={setOpen.bind(null, false)}
		>
			<div
				className="absolute sm:left-0 sm:right-0 mx-auto w-full h-full sm:w-1/2 sm:min-w-96 sm:h-fit sm:max-h-full top-1/2 sm:rounded-xl bg-zinc-200 dark:bg-zinc-800 overflow-y-auto p-6 sm:-translate-y-1/2 text-left popup"
				onClick={(event) => {
					event.stopPropagation();
				}}
			>
				{children}
			</div>
		</div>
	);
};

export default Popup;
