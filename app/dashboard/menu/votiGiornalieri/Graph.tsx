import { useMemo } from "react";
import { sortFunctions, type VotoType } from "./utils";

const months = [
	"GEN",
	"FEB",
	"MAR",
	"APR",
	"MAG",
	"GIU",
	"LUG",
	"AGO",
	"SET",
	"OTT",
	"NOV",
	"DIC",
];
const getColor = (n: number) =>
	n >= 6 ? "#0c6" : n >= 5 || n === 0 ? "#fa3" : "#f33";

const Graph = ({ voti: votiRaw }: { voti?: VotoType[] }) => {
	const [grades, numbers] = useMemo(() => {
		let highest: VotoType | undefined, lowest: VotoType | undefined;
		const voti = votiRaw
			?.filter((v) => {
				if (v.codTipo === "V") {
					if (v.valore > (highest?.valore ?? 0)) highest = v;
					if (v.valore < (lowest?.valore ?? 10)) lowest = v;
					return true;
				}
				return false;
			})
			.sort(sortFunctions["Meno recente"]);

		if (!voti?.length) return [];
		const startTime = Date.parse(voti[0].datGiorno);
		const totalTime = Date.parse(voti.at(-1)!.datGiorno) - startTime;
		const last = Math.max(Math.floor(lowest!.valore - 0.25), 0);
		const first = Math.min(Math.ceil(highest!.valore + 0.25), 10);
		const diff = first - last + 1;

		return [
			voti.map((v) => (
				<div
					key={v.pk}
					className="w-3 h-3 absolute rounded-full"
					style={{
						backgroundColor: getColor(v.valore),
						left: `calc(${
							(Date.parse(v.datGiorno) - startTime) / totalTime
						} * (100% - 1.25rem) + 0.25rem)`,
						top: `calc(${((first + 0.5 - v.valore) / diff) * 100}% - 6px)`,
					}}
					title={v.valore.toLocaleString()}
				></div>
			)),
			[...Array(diff).keys()].map((n) => (
				<span key={n} className="w-6 my-auto">
					{first - n}
				</span>
			)),
		];
	}, [votiRaw]);

	return (
		<div className="h-60 flex w-full">
			<div className="flex flex-col justify-evenly">{numbers}</div>
			<div className="relative flex-1">{grades}</div>
		</div>
	);
};

export default Graph;
