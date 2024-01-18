"use client";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons/faChevronUp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo, useState } from "react";
import MenuList from "./MenuList";
import SubjectName from "./SubjectName";

const Menu = () => {
	const [open, setOpen] = useState(false);

	return (
		<div
			className={`relative lg:px-4 mx-4 lg:mx-0 lg:w-1/3 lg:border-0 lg:border-r lg:pl-0 border-zinc-500 border lg:rounded-none ${
				open ? "rounded-t-lg border-b-0" : "rounded-lg"
			}`}
			onClick={setOpen.bind(null, !open)}
		>
			<div
				className={`bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center cursor-pointer px-4 text-base h-16 lg:hidden ${
					open ? "rounded-t-lg" : "rounded-lg"
				}`}
			>
				<SubjectName />
				<FontAwesomeIcon
					icon={open ? faChevronUp : faChevronDown}
					className="h-4 w-4 ml-1 p-2 rounded-lg"
				/>
			</div>
			<div
				className={`absolute lg:static w-full max-h-96 lg:max-h-fit border-zinc-500 border-b border-x rounded-b-lg lg:border-0 bg-zinc-100 dark:bg-zinc-900 box-content overflow-y-auto hideScrollbar ${
					open ? "" : "hidden lg:block"
				}`}
				style={{ left: "-0.75px" }}
			>
				<MenuList />
			</div>
		</div>
	);
};

export default memo(Menu);
