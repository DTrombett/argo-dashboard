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

const Graph = ({
	voti: votiRaw,
	period,
}: {
	voti?: VotoType[];
	period?: { dataInizio: string; dataFine: string };
}) => {
	const [startDate, endDate] = useMemo(
		() =>
			period ? [new Date(period.dataInizio), new Date(period.dataFine)] : [],
		[period]
	);
	const startMonth = startDate?.getMonth();
	const startTime = startDate?.getTime();
	const startYear = startDate?.getFullYear();
	const totalTime =
		period && Math.min(Date.now(), endDate!.getTime()) - startTime!;
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

		if (!voti?.length || !period) return [];
		const first = Math.ceil(highest!.valore);
		const diff = first - Math.floor(lowest!.valore) + 1;

		return [
			voti.map((v) => (
				<div
					key={v.pk}
					className="w-4 h-4 absolute rounded-full border"
					style={{
						backgroundColor: getColor(v.valore),
						left: `calc(${
							totalTime
								? (Date.parse(v.datGiorno) - startTime!) / totalTime
								: 0.5
						} * (100% - 1.25rem) + 0.5rem)`,
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
	}, [votiRaw, period, totalTime, startTime]);
	const resolvedMonths = useMemo(
		() =>
			period &&
			months.map((m, i) => {
				const date = new Date(startYear! + Number(i < startMonth!), i);
				const per =
					((date.getTime() + date.setMonth(i + 1)) / 2 - startTime!) /
					totalTime!;

				return (
					<span
						key={m}
						className={`absolute w-10 ${per < 0 || per > 1 ? "hidden" : ""}`}
						style={{
							left: `calc(${per} * (100% - 1.5rem))`,
						}}
					>
						{m}
					</span>
				);
			}),
		[period, startMonth, startTime, startYear, totalTime]
	);

	return (
		<div className="min-h-40 sm:min-h-48 md:min-h-56 lg:min-h-64 xl:min-h-72 2xl:min-h-80 flex flex-col w-full mb-2">
			<div className="flex flex-1">
				<div className="flex flex-col justify-evenly">{numbers}</div>
				<div className="relative flex-1">{grades}</div>
			</div>
			<div className="relative h-7 overflow-x-hidden">{resolvedMonths}</div>
		</div>
	);
};

export default Graph;
