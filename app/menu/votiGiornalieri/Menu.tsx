"use client";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons/faChevronUp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo, useState } from "react";
import AllSubjectsButton from "./AllSubjectsButton";
import MenuList from "./MenuList";
import SubjectName from "./SubjectName";

const Menu = () => {
	const [open, setOpen] = useState(false);

	return (
		<div
			className={`lg:px-4 mx-4 lg:mx-0 lg:w-1/3 lg:border-0 lg:border-r lg:pl-0 border-zinc-500 border lg:rounded-none ${
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
				className={`fixed left-0 right-0 top-0 bottom-0 z-10 w-full h-full lg:static bg-zinc-900 bg-opacity-50 lg:bg-inherit ${
					open ? "blockScroll" : "hidden lg:block"
				}`}
			>
				<div
					className="absolute left-4 right-4 -translate-y-1/2 lg:translate-y-0 top-1/2 lg:min-h-fit lg:static border-zinc-500 border rounded-2xl lg:rounded-none lg:border-0 bg-zinc-100 dark:bg-zinc-900 overflow-y-auto hideScrollbar"
					style={{ maxHeight: "95%" }}
				>
					<AllSubjectsButton />
					<MenuList />
				</div>
			</div>
		</div>
	);
};

export default memo(Menu);
