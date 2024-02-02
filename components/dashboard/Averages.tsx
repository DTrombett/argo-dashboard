"use client";
import { regularItalic } from "@/app/fonts";
import Link from "next/link";
import { useContext, useMemo } from "react";
import TouchableOpacity from "../utils/TouchableOpacity";
import { ClientContext } from "./ClientProvider";

const Averages = () => {
	const {
		client: { dashboard },
	} = useContext(ClientContext);
	const result = useMemo(() => {
		if (!dashboard?.mediaMaterie) return undefined;
		const { listaMaterie, ...mediaMaterie } = dashboard.mediaMaterie;

		return Object.entries(mediaMaterie).map(([pk, m]) => (
			<Link key={pk} href={`/dashboard/menu/votiGiornalieri/${pk}`}>
				<TouchableOpacity className="flex justify-between lg:hover:underline">
					<span
						className="text-left whitespace-nowrap overflow-auto outline-0 hideScrollbar subject"
						tabIndex={-1}
					>
						{dashboard.listaMaterie.find((s) => s.pk === pk)?.materia}
					</span>
					<span className="text-right">{m.mediaMateria}</span>
				</TouchableOpacity>
			</Link>
		));
	}, [dashboard?.listaMaterie, dashboard?.mediaMaterie]);

	return result?.length ? (
		result
	) : (
		<span className={regularItalic.className}>
			Nessun dato disponibile riguardo la media!
		</span>
	);
};

export default Averages;
