import type { SVGProps } from "react";

const MenuEntry = ({
	name,
	color: backgroundColor,
	icon: Icon,
}: {
	name: string;
	color: string;
	icon: React.ComponentType<SVGProps<SVGElement>>;
}) => (
	<div
		className="relative flex w-40 h-24 m-2 px-2 rounded-lg bg-zinc-300 dark:bg-zinc-700 bg-opacity-50 dark:bg-opacity-50"
		style={{ borderWidth: "1px", borderColor: backgroundColor }}
	>
		<Icon className="absolute right-1 top-1 icon" />
		<span className="m-auto">{name}</span>
	</div>
);

export default MenuEntry;
