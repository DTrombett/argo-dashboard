import type { SortName } from "./utils";

const Sort = ({
	name,
	sort,
	setSort,
}: {
	name: SortName;
	sort: SortName;
	setSort: (sort: SortName) => void;
}) => (
	<label
		htmlFor={name}
		onKeyDown={(event) => {
			if (event.key === "Enter") setSort(name);
		}}
	>
		{name[0].toUpperCase()}
		{name.slice(1)}
		<input
			type="radio"
			id={name}
			name={name}
			onChange={setSort.bind(null, name)}
			checked={name === sort}
		/>
		<span className="transition" />
	</label>
);

export default Sort;
