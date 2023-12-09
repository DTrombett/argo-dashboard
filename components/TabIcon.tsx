const TabIcon = ({
	name,
	icon,
	active,
	onClick,
	expanded,
}: {
	name: string;
	icon: React.ReactNode;
	onClick: () => void;
	active?: boolean;
	expanded: boolean;
}) => (
	<div
		className={`flex flex-row justify-center items-center select-none cursor-pointer bg-opacity-50 dark:bg-opacity-50 hover:bg-zinc-400 dark:hover:bg-zinc-600 w-full rounded-lg my-1 menuEntry ${
			active
				? "bg-zinc-400 dark:bg-zinc-600 hover:bg-opacity-75 dark:hover:bg-opacity-75"
				: "bg-zinc-300 dark:bg-zinc-700 hover:bg-opacity-50 dark:hover:bg-opacity-50"
		}`}
		style={
			expanded
				? {
						justifyContent: "flex-start",
						paddingLeft: "1.25rem",
				  }
				: undefined
		}
		onClick={onClick}
	>
		{icon}
		{expanded && <span className="text-lg pl-4 overflow-hidden">{name}</span>}
	</div>
);

export default TabIcon;
