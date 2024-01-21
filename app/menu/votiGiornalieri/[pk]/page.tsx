"use client";
import { ClientContext } from "@/components/dashboard/ClientProvider";
import { memo, useContext, useMemo, useState } from "react";
import type { Filter } from "../Filters";
import Filters from "../Filters";
import ListaVoti from "../ListaVoti";

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
