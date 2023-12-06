const TabIcon = ({
	name,
	icon,
	active,
	onClick,
}: {
	name: string;
	icon: React.ReactNode;
	onClick: () => void;
	active?: boolean;
}) => (
	<div
		className={`relative flex flex-col justify-center items-center h-full flex-1 select-none cursor-pointer pt-1 bg-opacity-50 hover:bg-zinc-300 dark:bg-opacity-50 dark:hover:bg-zinc-700 lg:max-h-18 lg:w-full lg:rounded-lg lg:my-1 ${
			active
				? " bg-zinc-400 dark:bg-zinc-600"
				: " hover:bg-opacity-30 dark:hover:bg-opacity-30"
		}`}
		onClick={onClick}
	>
		{active && (
			<div className="bg-cyan-500 hidden lg:block absolute h-10 w-1/12 left-0 rounded-r-lg"></div>
		)}
		{icon}
		<span className="text-lg lg:text-sm">{name}</span>
	</div>
);

export default TabIcon;
