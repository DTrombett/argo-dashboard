"use client";
import { ClientContext } from "@/components/dashboard/ClientProvider";
import local from "next/font/local";
import type { Client } from "portaleargo-api";
import { memo, useContext, useMemo, useState } from "react";
import ListaVoti from "../ListaVoti";

type APIVoto = NonNullable<Client["dashboard"]>["voti"][number];
type Filter = (typeof filterFunctions)[keyof typeof filterFunctions];

const filterFunctions = {
	orali: [(v: APIVoto) => v.codVotoPratico === "N", "codVotoPratico"],
	scritti: [(v: APIVoto) => v.codVotoPratico === "S", "codVotoPratico"],
	note: [(v: APIVoto) => v.codTipo === "N", "codTipo"],
	sufficienti: [(v: APIVoto) => v.codTipo === "V" && v.valore >= 6, "valore"],
	insufficienti: [(v: APIVoto) => v.codTipo === "V" && v.valore < 6, "valore"],
} as const;
const filtersArray = Object.values(filterFunctions).map(([f]) => f);
const semiBold = local({ src: "../../../../fonts/Poppins-SemiBold.ttf" });

const VotiMateria = ({ params: { pk } }: { params: { pk: string } }) => {
	const {
		client: { dashboard },
	} = useContext(ClientContext);
	const [filters, setFilters] = useState<Filter[]>([]);
	const handleChange = (filter: Filter) =>
		setFilters.bind(null, (oldFilters) => {
			const i = oldFilters.indexOf(filter);

			return i === -1 ? [...oldFilters, filter] : oldFilters.toSpliced(i, 1);
		});
	const voti = useMemo(
		() => dashboard?.voti.filter((v) => v.pkMateria === pk),
		[dashboard?.voti, pk]
	);
	const counts = useMemo(
		() =>
			voti?.reduce<number[]>(
				(arr, v) => arr.map((n, i) => (filtersArray[i](v) ? n + 1 : n)),
				Array(5).fill(0)
			) ?? Array<number>(5).fill(0),
		[voti]
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
			<ListaVoti filters={filters} voti={voti} />
		</div>
	);
};

export default memo(VotiMateria);
