"use client";
import { memo, useState } from "react";
import AllSubjectsButton from "./AllSubjectsButton";
import MenuList from "./MenuList";
import MenuOpener from "./MenuOpener";

const Menu = () => {
	const [open, setOpen] = useState(false);

	return (
		<div
			className="mx-4 lg:mx-0 lg:ml-2 lg:pr-1 lg:w-1/3 lg:border-0 lg:pl-0 border-zinc-500 border lg:rounded-none rounded-lg"
			onClick={setOpen.bind(null, !open)}
		>
			<MenuOpener open={open} />
			<div
				className={`fixed left-0 right-0 top-0 bottom-0 z-10 w-full h-full lg:static bg-zinc-900 bg-opacity-50 lg:bg-inherit ${
					open ? "blockScroll" : "hidden lg:block"
				}`}
			>
				<div className="absolute left-4 right-4 -translate-y-1/2 lg:translate-y-0 top-1/2 lg:static lg:pr-2 border-zinc-500 border rounded-2xl lg:rounded-none lg:border-0 bg-zinc-100 dark:bg-zinc-900 overflow-y-auto transition subjectsList">
					<AllSubjectsButton />
					<MenuList />
				</div>
			</div>
		</div>
	);
};

export default memo(Menu);
