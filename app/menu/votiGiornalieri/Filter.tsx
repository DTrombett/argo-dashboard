import { memo } from "react";
import type { FilterType } from "./Filters";
import type { VotoType } from "./page";

const filterFunctions = {
	orali: [(v: VotoType) => v.codVotoPratico === "N", "codVotoPratico"],
	scritti: [(v: VotoType) => v.codVotoPratico === "S", "codVotoPratico"],
	note: [(v: VotoType) => v.codTipo === "N", "codTipo"],
	sufficienti: [(v: VotoType) => v.codTipo === "V" && v.valore >= 6, "valore"],
	insufficienti: [(v: VotoType) => v.codTipo === "V" && v.valore < 6, "valore"],
} as const;

const Filter = ({
	name,
	filters,
	handleChange,
	count,
}: {
	name: keyof typeof filterFunctions;
	filters: FilterType[];
	handleChange: (filter: FilterType) => () => void;
	count: number;
}) => {
	const onChange = handleChange(filterFunctions[name]);

	return (
		<label
			htmlFor={name}
			onKeyDown={(event) => {
				if (event.key === "Enter") onChange();
			}}
		>
			{name[0].toUpperCase()}
			{name.slice(1)} ({count})
			<input
				type="checkbox"
				id={name}
				name={name}
				onChange={onChange}
				checked={filters.includes(filterFunctions[name])}
			/>
			<span className="transition" />
		</label>
	);
};

export default memo(Filter);
