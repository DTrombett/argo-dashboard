import local from "next/font/local";
import Voto from "./Voto";
import type { FilterType, SortName, VotoType } from "./utils";
import { sortFunctions } from "./utils";

const italic = local({ src: "../../../fonts/Poppins-Italic.ttf" });

const ListaVoti = ({
	voti,
	filters,
	sort,
	showDescription,
}: {
	voti?: VotoType[];
	filters: FilterType[];
	sort: SortName;
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
					.sort(sortFunctions[sort])
					.map((v) => (
						<Voto voto={v} key={v.pk} showDescription={showDescription} />
					))
			) : (
				<span className={`${italic.className} text-xl py-4 lg:pr-16`}>
					Nessun voto disponibile!
				</span>
			)}
		</div>
	);
};

export default ListaVoti;
