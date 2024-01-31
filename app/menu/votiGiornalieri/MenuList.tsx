"use client";
import { ClientContext } from "@/components/dashboard/ClientProvider";
import { useSelectedLayoutSegment } from "next/navigation";
import { useContext, useMemo } from "react";
import MenuItem from "./MenuItem";

const PageElements = () => {
	const { client } = useContext(ClientContext);
	const selectedPk = useSelectedLayoutSegment();

	return useMemo(
		() =>
			client.dashboard?.listaMaterie.map((subject, i) => {
				const data = client.dashboard?.mediaMaterie[subject.pk];

				return (
					<MenuItem
						name={subject.materia}
						last={i + 1 === client.dashboard?.listaMaterie.length}
						selected={selectedPk === subject.pk}
						avg={data?.mediaMateria}
						key={subject.pk}
						mediaMateria={data?.mediaMateria}
						mediaOrale={data?.mediaOrale}
						mediaScritta={data?.mediaScritta}
						numValutazioniOrale={data?.numValutazioniOrale}
						numValutazioniScritto={data?.numValutazioniScritto}
						numVoti={data?.numVoti}
						pk={subject.pk}
					/>
				);
			}),
		[client.dashboard?.listaMaterie, client.dashboard?.mediaMaterie, selectedPk]
	);
};

export default PageElements;
