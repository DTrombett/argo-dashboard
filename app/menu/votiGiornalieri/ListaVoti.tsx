import local from "next/font/local";
import { memo } from "react";
import type { FilterType } from "./Filters";
import Voto from "./Voto";
import type { VotoType } from "./page";

const italic = local({ src: "../../../fonts/Poppins-Italic.ttf" });

const ListaVoti = ({
	voti,
	filters,
	showDescription,
}: {
	voti?: VotoType[];
	filters: FilterType[];
	showDescription?: boolean;
}) => {
	const pks: string[] = [];
	const resolved = voti?.filter((v) => {
		if (pks.includes(v.pk)) return false;
		pks.push(v.pk);
		const checked: string[] = [];
		const types = new Set<string>();

		for (const [filter, type] of filters) {
			types.add(type);
			if (!checked.includes(type) && filter(v)) checked.push(type);
		}
		return checked.length === types.size;
	});

	return (
		<div className="flex flex-col flex-1 lg:mx-4 my-auto lg:my-0">
			{resolved?.length ? (
				resolved
					.toSorted((a, b) =>
						new Date(a.datGiorno) > new Date(b.datGiorno) ? -1 : 1
					)
					.map((v) => (
						<Voto voto={v} key={v.pk} showDescription={showDescription} />
					))
			) : (
				<span className={`${italic.className} text-xl py-4 lg:pr-64`}>
					Nessun voto disponibile!
				</span>
			)}
		</div>
	);
};

export default memo(ListaVoti);
