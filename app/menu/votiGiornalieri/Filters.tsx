"use client";
import TouchableOpacity from "@/components/Utils/TouchableOpacity";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons/faChevronUp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import local from "next/font/local";
import type { Dispatch, SetStateAction } from "react";
import { useCallback, useMemo, useState } from "react";
import Filter from "./Filter";
import type { FilterType, VotoType } from "./utils";
import { filtersArray } from "./utils";

const semiBold = local({ src: "../../../fonts/Poppins-SemiBold.ttf" });

const Filters = ({
	voti,
	filters,
	setFilters,
}: {
	voti?: VotoType[];
	filters: FilterType[];
	setFilters: Dispatch<SetStateAction<FilterType[]>>;
}) => {
	const [open, setOpen] = useState(false);
	const counts = useMemo(
		() =>
			voti?.reduce<number[]>(
				(arr, v) => arr.map((n, i) => (filtersArray[i](v) ? n + 1 : n)),
				Array(5).fill(0)
			) ?? Array<number>(5).fill(0),
		[voti]
	);
	const handleChange = useCallback(
		(filter: FilterType) =>
			setFilters.bind(null, (oldFilters) => {
				const i = oldFilters.indexOf(filter);

				return i === -1 ? [...oldFilters, filter] : oldFilters.toSpliced(i, 1);
			}),
		[setFilters]
	);

	return (
		<fieldset
			className={`px-2 py-2 mx-2 my-2 lg:mx-0 rounded-xl text-left text-lg lg:h-fit lg:max-w-60 overflow-y-hidden ${
				open ? "" : "h-10"
			}`}
		>
			<legend
				className={`${semiBold.className} text-xl w-full pr-4 cursor-pointer`}
				onClick={setOpen.bind(null, !open)}
			>
				<TouchableOpacity className="flex justify-between">
					<span>Filtri</span>
					<FontAwesomeIcon
						icon={open ? faChevronUp : faChevronDown}
						className="pt-px lg:hidden"
					/>
				</TouchableOpacity>
			</legend>
			<Filter
				filters={filters}
				handleChange={handleChange}
				name="orali"
				count={counts[0]}
			/>
			<Filter
				filters={filters}
				handleChange={handleChange}
				name="scritti"
				count={counts[1]}
			/>
			<Filter
				filters={filters}
				handleChange={handleChange}
				name="note"
				count={counts[2]}
			/>
			<Filter
				filters={filters}
				handleChange={handleChange}
				name="sufficienti"
				count={counts[3]}
			/>
			<Filter
				filters={filters}
				handleChange={handleChange}
				name="insufficienti"
				count={counts[4]}
			/>
		</fieldset>
	);
};

export default Filters;
