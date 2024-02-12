"use client";
import { ClientContext } from "@/components/dashboard/ClientProvider";
import { useContext, useState } from "react";
import Filters from "./Filters";
import Graph from "./Graph";
import ListaVoti from "./ListaVoti";
import SortOptions from "./SortOptions";
import type { FilterType, SortName } from "./utils";

const VotiGiornalieri = () => {
	const {
		client: { dashboard },
	} = useContext(ClientContext);
	const [filters, setFilters] = useState<FilterType[]>([]);
	const [sort, setSort] = useState<SortName>("Più recente");

	return (
		<>
			<div>
				<Filters
					filters={filters}
					setFilters={setFilters}
					voti={dashboard?.voti}
				/>
				<SortOptions sort={sort} setSort={setSort} />
			</div>
			<div className="flex flex-col flex-1 lg:mx-4 my-auto lg:my-0">
				<Graph
					voti={dashboard?.voti}
					period={dashboard?.listaPeriodi?.find((p) => p.pkPeriodo === "*")}
				/>
				<ListaVoti filters={filters} sort={sort} voti={dashboard?.voti} />
			</div>
		</>
	);
};

export default VotiGiornalieri;
