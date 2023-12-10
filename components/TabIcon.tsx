const TabIcon = ({
	name,
	icon,
	active,
	onClick,
	className,
}: {
	name: string;
	icon: React.ReactNode;
	onClick: () => void;
	active?: boolean;
	className?: string;
}) => (
	<div
		className={`flex flex-col lg:flex-row justify-center items-center select-none cursor-pointer bg-opacity-50 dark:bg-opacity-50 hover:bg-zinc-400 dark:hover:bg-zinc-600 w-full rounded-lg my-1 tabIcon mx-2 lg:mx-0 pt-2 lg:pt-0 ${
			className ?? ""
		} ${
			active
				? "bg-zinc-400 dark:bg-zinc-600 hover:bg-opacity-75 dark:hover:bg-opacity-75"
				: "lg:bg-zinc-300 dark:lg:bg-zinc-700 hover:bg-opacity-50 dark:hover:bg-opacity-50"
		}`}
		onClick={onClick}
	>
		{icon}
		<span className="text-lg lg:pl-4 lg:overflow-hidden lg:hidden">{name}</span>
	</div>
);

export default TabIcon;
