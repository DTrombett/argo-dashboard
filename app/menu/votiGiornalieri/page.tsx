"use client";
import { ClientContext } from "@/components/dashboard/ClientProvider";
import local from "next/font/local";
import type { Client } from "portaleargo-api";
import { memo, useCallback, useContext, useMemo, useState } from "react";
import Voto from "./Voto";

type Voto = NonNullable<Client["dashboard"]>["voti"][number];
type Filter = (typeof filterFunctions)[keyof typeof filterFunctions];

const filterFunctions = {
	orali: [(v: Voto) => v.codVotoPratico === "N", "codVotoPratico"],
	scritti: [(v: Voto) => v.codVotoPratico === "S", "codVotoPratico"],
	note: [(v: Voto) => v.codTipo === "N", "codTipo"],
	sufficienti: [(v: Voto) => v.codTipo === "V" && v.valore >= 6, "valore"],
	insufficienti: [(v: Voto) => v.codTipo === "V" && v.valore < 6, "valore"],
} as const;
const filtersArray = Object.values(filterFunctions).map(([f]) => f);
const italic = local({ src: "../../../fonts/Poppins-Italic.ttf" });
const semiBold = local({ src: "../../../fonts/Poppins-SemiBold.ttf" });

const VotiGiornalieri = () => {
	const {
		client: { dashboard },
	} = useContext(ClientContext);
	const [filters, setFilters] = useState<Filter[]>([]);
	const handleChange = useCallback(
		(filter: Filter) =>
			setFilters.bind(null, (oldFilters) => {
				const i = oldFilters.indexOf(filter);

				return i === -1 ? [...oldFilters, filter] : oldFilters.toSpliced(i, 1);
			}),
		[]
	);
	const filterFn = useCallback(
		(v: Voto) => {
			const checked: string[] = [];
			const types = new Set<string>();

			for (const [filter, type] of filters) {
				types.add(type);
				if (!checked.includes(type) && filter(v)) checked.push(type);
			}
			return checked.length === types.size;
		},
		[filters]
	);
	const counts = useMemo(
		() =>
			dashboard?.voti.reduce<number[]>(
				(arr, v) => arr.map((n, i) => (filtersArray[i](v) ? n + 1 : n)),
				Array(5).fill(0)
			) ?? Array<number>(5).fill(0),
		[dashboard?.voti]
	);
	const list = useMemo(
		() => (
			<div className="flex flex-col flex-1 lg:mx-4 my-auto lg:my-0">
				{dashboard?.voti.length ? (
					dashboard.voti
						.filter(filterFn)
						.toSorted((a, b) =>
							new Date(a.datGiorno) > new Date(b.datGiorno) ? -1 : 1
						)
						.map((v) => <Voto v={v} key={v.pk} />)
				) : (
					<span className={`${italic.className} text-xl py-4 lg:pr-64`}>
						Nessun voto disponibile!
					</span>
				)}
			</div>
		),
		[dashboard?.voti, filterFn]
	);

	return (
		<div className="flex-1 mt-4 lg:mt-0 flex flex-col lg:flex-row-reverse justify-between lg:overflow-y-auto">
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
			{list}
		</div>
	);
};

export default memo(VotiGiornalieri);
