import local from "next/font/local";
import type { Dispatch, SetStateAction } from "react";
import { memo, useCallback, useMemo } from "react";
import Filter from "./Filter";
import type { VotoType } from "./page";

export type Filter = (typeof filterFunctions)[keyof typeof filterFunctions];

const filterFunctions = {
	orali: [(v: VotoType) => v.codVotoPratico === "N", "codVotoPratico"],
	scritti: [(v: VotoType) => v.codVotoPratico === "S", "codVotoPratico"],
	note: [(v: VotoType) => v.codTipo === "N", "codTipo"],
	sufficienti: [(v: VotoType) => v.codTipo === "V" && v.valore >= 6, "valore"],
	insufficienti: [(v: VotoType) => v.codTipo === "V" && v.valore < 6, "valore"],
} as const;
const filtersArray = Object.values(filterFunctions).map(([f]) => f);
const semiBold = local({ src: "../../../fonts/Poppins-SemiBold.ttf" });

const Filters = ({
	voti,
	filters,
	setFilters,
}: {
	voti?: VotoType[];
	filters: Filter[];
	setFilters: Dispatch<SetStateAction<Filter[]>>;
}) => {
	const counts = useMemo(
		() =>
			voti?.reduce<number[]>(
				(arr, v) => arr.map((n, i) => (filtersArray[i](v) ? n + 1 : n)),
				Array(5).fill(0)
			) ?? Array<number>(5).fill(0),
		[voti]
	);
	const handleChange = useCallback(
		(filter: Filter) =>
			setFilters.bind(null, (oldFilters) => {
				const i = oldFilters.indexOf(filter);

				return i === -1 ? [...oldFilters, filter] : oldFilters.toSpliced(i, 1);
			}),
		[setFilters]
	);

	return (
		<fieldset className="border lg:border-0 px-4 py-2 mb-4 mx-2 lg:mx-0 rounded-xl text-left text-lg h-fit lg:max-w-60">
			<legend className={`${semiBold.className} text-xl`}>Filtri</legend>
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

export default memo(Filters);
