"use client";
import { ClientContext } from "@/components/dashboard/ClientProvider";
import { useContext, useMemo, useState } from "react";
import Filters from "../Filters";
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
		<div className="flex-1 mt-4 lg:mt-0 flex flex-col lg:flex-row-reverse justify-between lg:overflow-y-auto">
			<div>
				<Filters filters={filters} setFilters={setFilters} voti={voti} />
				<SortOptions sort={sort} setSort={setSort} />
			</div>
			<ListaVoti filters={filters} voti={voti} sort={sort} showDescription />
		</div>
	);
};

export default VotiMateria;
