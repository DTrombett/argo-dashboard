import type { Property } from "csstype";
import local from "next/font/local";
import type { SVGProps } from "react";

const light = local({ src: "../fonts/Poppins-Light.ttf" });

const MenuEntry = ({
	name,
	color: borderColor,
	icon: Icon,
	summary,
	active,
	className,
}: {
	name: string;
	color: Property.BorderColor;
	icon: React.ComponentType<SVGProps<SVGElement>>;
	summary?: string;
	children?: () => React.ReactNode;
	active: boolean;
	className?: string;
}) => (
	<div
		className={`my-1 w-full rounded-lg bg-opacity-50 dark:bg-opacity-50 hover:bg-zinc-400 dark:hover:bg-zinc-600 flex items-center justify-center cursor-pointer px-4 lg:px-0 menuEntry ${
			className ?? ""
		} ${
			active
				? "bg-zinc-400 dark:bg-zinc-600 hover:bg-opacity-75 dark:hover:bg-opacity-75"
				: "bg-zinc-300 dark:bg-zinc-700 hover:bg-opacity-50 dark:hover:bg-opacity-50"
		}`}
		style={{
			borderColor,
			...(active ? { borderWidth: "1px" } : undefined),
		}}
	>
		<Icon className="menuIcon inline w-8" />
		<div className="flex flex-col flex-1 text-left overflow-hidden ml-2 mr-1 lg:hidden">
			<span>{name}</span>
			{summary && (
				<span
					className={`${light.className} text-opacity-50 text-black dark:text-white dark:text-opacity-50 overflow-auto cursor-text whitespace-nowrap hideScrollbar`}
				>
					{summary}
				</span>
			)}
		</div>
	</div>
);

export default MenuEntry;
