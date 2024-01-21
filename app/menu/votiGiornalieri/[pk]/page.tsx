"use client";
import { ClientContext } from "@/components/dashboard/ClientProvider";
import type { Client } from "portaleargo-api";
import { memo, useContext, useMemo, useState } from "react";
import Filters from "../Filters";
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

const VotiMateria = ({ params: { pk } }: { params: { pk: string } }) => {
	const {
		client: { dashboard },
	} = useContext(ClientContext);
	const [filters, setFilters] = useState<Filter[]>([]);
	const voti = useMemo(
		() => dashboard?.voti.filter((v) => v.pkMateria === pk),
		[dashboard?.voti, pk]
	);

	return (
		<div className="flex-1 mt-4 lg:mt-0 flex flex-col lg:flex-row-reverse justify-between lg:overflow-y-auto">
			<Filters filters={filters} setFilters={setFilters} voti={voti} />
			<ListaVoti filters={filters} voti={voti} showDescription />
		</div>
	);
};

export default memo(VotiMateria);
