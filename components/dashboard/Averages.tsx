"use client";
import local from "next/font/local";
import Link from "next/link";
import { memo, useContext, useMemo } from "react";
import TouchableOpacity from "../Utils/TouchableOpacity";
import { ClientContext } from "./ClientProvider";

const italic = local({ src: "../../fonts/Poppins-Italic.ttf" });

const Averages = () => {
	const {
		client: { dashboard },
	} = useContext(ClientContext);
	const result = useMemo(
		() =>
			dashboard?.mediaMaterie &&
			Object.entries(dashboard.mediaMaterie).map(([pk, m]) => (
				<Link key={pk} href={`/menu/votiGiornalieri/${pk}`}>
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
			)),
		[dashboard?.listaMaterie, dashboard?.mediaMaterie]
	);

	return result?.length ? (
		result
	) : (
		<span className={italic.className}>
			Nessun dato disponibile riguardo la media!
		</span>
	);
};

export default memo(Averages);
