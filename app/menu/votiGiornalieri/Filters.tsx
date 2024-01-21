import local from "next/font/local";
import type { Dispatch, SetStateAction } from "react";
import { memo, useMemo } from "react";
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
	const handleChange = (filter: Filter) =>
		setFilters.bind(null, (oldFilters) => {
			const i = oldFilters.indexOf(filter);

			return i === -1 ? [...oldFilters, filter] : oldFilters.toSpliced(i, 1);
		});

	return (
		<fieldset className="border lg:border-0 px-4 py-2 mb-4 mx-2 lg:mx-0 rounded-xl text-left text-lg h-fit lg:max-w-60">
			<legend className={`${semiBold.className} text-xl`}>Filtri</legend>
			<label htmlFor="orali">
				Orali ({counts[0]})
				<input
					type="checkbox"
					id="orali"
					name="orali"
					onChange={handleChange(filterFunctions.orali)}
					checked={filters.includes(filterFunctions.orali)}
				/>
				<span />
			</label>
			<label htmlFor="scritti">
				Scritti ({counts[1]})
				<input
					type="checkbox"
					id="scritti"
					name="scritti"
					onChange={handleChange(filterFunctions.scritti)}
					checked={filters.includes(filterFunctions.scritti)}
				/>
				<span />
			</label>
			<label htmlFor="note">
				Note ({counts[2]})
				<input
					type="checkbox"
					id="note"
					name="note"
					onChange={handleChange(filterFunctions.note)}
					checked={filters.includes(filterFunctions.note)}
				/>
				<span />
			</label>
			<label htmlFor="sufficienti">
				Sufficienti ({counts[3]})
				<input
					type="checkbox"
					id="sufficienti"
					name="sufficienti"
					onChange={handleChange(filterFunctions.sufficienti)}
					checked={filters.includes(filterFunctions.sufficienti)}
				/>
				<span />
			</label>
			<label htmlFor="insufficienti">
				Insufficienti ({counts[4]})
				<input
					type="checkbox"
					id="insufficienti"
					name="insufficienti"
					onChange={handleChange(filterFunctions.insufficienti)}
					checked={filters.includes(filterFunctions.insufficienti)}
				/>
				<span />
			</label>
		</fieldset>
	);
};

export default memo(Filters);
