import type { FilterName, FilterType } from "./utils";
import { filterFunctions } from "./utils";

const Filter = ({
	name,
	filters,
	handleChange,
	count,
}: {
	name: FilterName;
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

export default Filter;
