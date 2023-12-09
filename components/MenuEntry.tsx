import type { Property } from "csstype";
import local from "next/font/local";
import type { SVGProps } from "react";

const light = local({ src: "../fonts/Poppins-Light.ttf" });

const MenuEntry = ({
	name,
	color: borderColor,
	icon: Icon,
	summary,
	expanded,
	active,
}: {
	name: string;
	color: Property.BorderColor;
	icon: React.ComponentType<SVGProps<SVGElement>>;
	summary?: string;
	children?: () => React.ReactNode;
	expanded: boolean;
	active: boolean;
}) => (
	<div
		className={`my-1 w-full rounded-lg bg-opacity-50 dark:bg-opacity-50 hover:bg-zinc-400 dark:hover:bg-zinc-600 flex items-center justify-center cursor-pointer menuEntry ${
			active
				? "bg-zinc-400 dark:bg-zinc-600 hover:bg-opacity-75 dark:hover:bg-opacity-75"
				: "bg-zinc-300 dark:bg-zinc-700 hover:bg-opacity-50 dark:hover:bg-opacity-50"
		}`}
		style={{
			borderColor,
			...(expanded ? { paddingLeft: "1rem", paddingRight: "1rem" } : null),
			...(active ? { borderWidth: "1px" } : undefined),
		}}
	>
		<Icon
			className="menuIcon inline"
			style={
				expanded
					? {
							width: "2rem",
					  }
					: undefined
			}
		/>
		{expanded && (
			<div className="flex flex-col flex-1 text-left overflow-hidden ml-2 mr-1">
				<span>{name}</span>
				{summary && (
					<span
						className={`${light.className} text-opacity-50 text-black dark:text-white dark:text-opacity-50 overflow-auto cursor-text whitespace-nowrap hideScrollbar`}
					>
						{summary}
					</span>
				)}
			</div>
		)}
	</div>
);

export default MenuEntry;
