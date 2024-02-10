"use client";
import { ClientContext } from "@/components/dashboard/ClientProvider";
import { useContext, useMemo, useState } from "react";
import Filters from "../Filters";
import Graph from "../Graph";
import ListaVoti from "../ListaVoti";
import SortOptions from "../SortOptions";
import type { FilterType, SortName } from "../utils";

const VotiMateria = ({ params: { pk } }: { params: { pk: string } }) => {
	const {
		client: { dashboard },
	} = useContext(ClientContext);
	const [filters, setFilters] = useState<FilterType[]>([]);
	const [sort, setSort] = useState<SortName>("Più recente");
	const voti = useMemo(
		() => dashboard?.voti.filter((v) => v.pkMateria === pk),
		[dashboard?.voti, pk]
	);

	return (
		<>
			<div>
				<Filters filters={filters} setFilters={setFilters} voti={voti} />
				<SortOptions sort={sort} setSort={setSort} />
			</div>
			<div className="flex flex-col flex-1 lg:mx-4 my-auto lg:my-0">
				<Graph voti={voti} />
				<ListaVoti filters={filters} voti={voti} sort={sort} showDescription />
			</div>
		</>
	);
};

export default VotiMateria;
