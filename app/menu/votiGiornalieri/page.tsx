"use client";
import { ClientContext } from "@/components/dashboard/ClientProvider";
import { useContext, useState } from "react";
import Filters from "./Filters";
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
		<div className="flex-1 mt-4 lg:mt-0 flex flex-col lg:flex-row-reverse justify-between">
			<div>
				<Filters
					filters={filters}
					setFilters={setFilters}
					voti={dashboard?.voti}
				/>
				<SortOptions sort={sort} setSort={setSort} />
			</div>
			<ListaVoti filters={filters} sort={sort} voti={dashboard?.voti} />
		</div>
	);
};

export default VotiGiornalieri;
