"use client";
import { ClientContext } from "@/components/dashboard/ClientProvider";
import type { Client } from "portaleargo-api";
import { memo, useContext, useState } from "react";
import Filters from "./Filters";
import ListaVoti from "./ListaVoti";

export type VotoType = NonNullable<Client["dashboard"]>["voti"][number];
export type Filter = (typeof filterFunctions)[keyof typeof filterFunctions];

export const filterFunctions = {
	orali: [(v: VotoType) => v.codVotoPratico === "N", "codVotoPratico"],
	scritti: [(v: VotoType) => v.codVotoPratico === "S", "codVotoPratico"],
	note: [(v: VotoType) => v.codTipo === "N", "codTipo"],
	sufficienti: [(v: VotoType) => v.codTipo === "V" && v.valore >= 6, "valore"],
	insufficienti: [(v: VotoType) => v.codTipo === "V" && v.valore < 6, "valore"],
} as const;
export const filtersArray = Object.values(filterFunctions).map(([f]) => f);

const VotiGiornalieri = () => {
	const {
		client: { dashboard },
	} = useContext(ClientContext);
	const [filters, setFilters] = useState<Filter[]>([]);

	return (
		<div className="flex-1 mt-4 lg:mt-0 flex flex-col lg:flex-row-reverse justify-between lg:overflow-y-auto">
			<Filters
				filters={filters}
				setFilters={setFilters}
				voti={dashboard?.voti}
			/>
			<ListaVoti filters={filters} voti={dashboard?.voti} />
		</div>
	);
};

export default memo(VotiGiornalieri);
