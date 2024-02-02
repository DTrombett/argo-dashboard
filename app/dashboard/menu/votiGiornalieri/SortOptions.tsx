"use client";
import { semiBold } from "@/app/fonts";
import TouchableOpacity from "@/components/utils/TouchableOpacity";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons/faChevronUp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import Sort from "./Sort";
import { sortNames, type SortName } from "./utils";

const SortOptions = ({
	sort,
	setSort,
}: {
	sort: SortName;
	setSort: Dispatch<SetStateAction<SortName>>;
}) => {
	const [open, setOpen] = useState(false);

	return (
		<fieldset
			className={`px-2 pt-1 mx-2 lg:mt-2 lg:mx-0 rounded-xl text-left text-lg lg:h-fit lg:max-w-60 overflow-y-hidden transition-all duration-500 ${
				open ? "h-56" : "h-10"
			}`}
		>
			<legend
				className={`${semiBold.className} text-xl w-full pr-4 cursor-pointer lg:cursor-auto`}
				onClick={setOpen.bind(null, !open)}
			>
				<TouchableOpacity className="flex justify-between">
					<span>Ordina per</span>
					<FontAwesomeIcon
						icon={open ? faChevronUp : faChevronDown}
						className="pt-px lg:hidden"
					/>
				</TouchableOpacity>
			</legend>
			{sortNames.map((name) => (
				<Sort name={name} key={name} setSort={setSort} sort={sort} />
			))}
		</fieldset>
	);
};

export default SortOptions;
