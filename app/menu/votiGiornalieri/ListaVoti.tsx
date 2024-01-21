import local from "next/font/local";
import { memo } from "react";
import Voto from "./Voto";
import type { Filter, Voto as VotoType } from "./page";

const italic = local({ src: "../../../fonts/Poppins-Italic.ttf" });

const ListaVoti = ({
	voti,
	filters,
}: {
	voti?: VotoType[];
	filters: Filter[];
}) => {
	const pks: string[] = [];

	return (
		<div className="flex flex-col flex-1 lg:mx-4 my-auto lg:my-0">
			{voti?.length ? (
				voti
					.filter((v) => {
						if (pks.includes(v.pk)) return false;
						pks.push(v.pk);
						const checked: string[] = [];
						const types = new Set<string>();

						for (const [filter, type] of filters) {
							types.add(type);
							if (!checked.includes(type) && filter(v)) checked.push(type);
						}
						return checked.length === types.size;
					})
					.toSorted((a, b) =>
						new Date(a.datGiorno) > new Date(b.datGiorno) ? -1 : 1
					)
					.map((v) => <Voto v={v} key={v.pk} />)
			) : (
				<span className={`${italic.className} text-xl py-4 lg:pr-64`}>
					Nessun voto disponibile!
				</span>
			)}
		</div>
	);
};

export default memo(ListaVoti);
