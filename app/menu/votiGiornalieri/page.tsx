"use client";
import { ClientContext } from "@/components/dashboard/ClientProvider";
import type { Client } from "portaleargo-api";
import { memo, useContext, useState } from "react";
import type { FilterType } from "./Filters";
import Filters from "./Filters";
import ListaVoti from "./ListaVoti";

export type VotoType = NonNullable<Client["dashboard"]>["voti"][number];

const VotiGiornalieri = () => {
	const {
		client: { dashboard },
	} = useContext(ClientContext);
	const [filters, setFilters] = useState<FilterType[]>([]);

	return (
		<div className="flex-1 mt-4 lg:mt-0 flex flex-col lg:flex-row-reverse justify-between">
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
