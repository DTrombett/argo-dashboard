import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
	active: boolean;
	className?: string;
}) => (
	<div
		className={`my-2 lg:my-1 w-full border lg:border-0 rounded-lg bg-opacity-50 dark:bg-opacity-50 hover:bg-zinc-400 dark:hover:bg-zinc-600 flex items-center justify-center cursor-pointer px-4 lg:px-0 menuEntry ${
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
		<FontAwesomeIcon
			icon={faChevronRight}
			className="h-4 w-4 ml-1 p-2 rounded-lg hover:bg-zinc-400 dark:hover:bg-zinc-600 lg:hidden"
		/>
	</div>
);

export default MenuEntry;
