"use client";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Property } from "csstype";
import local from "next/font/local";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import { type SVGProps } from "react";

const light = local({ src: "../../fonts/Poppins-Light.ttf" });

const MenuEntry = ({
	name,
	color: borderColor,
	icon: Icon,
	summary,
	className,
	page = "",
}: {
	name: string;
	color: Property.BorderColor;
	icon: React.ComponentType<SVGProps<SVGElement>>;
	summary?: string;
	className?: string;
	page: string;
}) => (
	<Link
		href={`/menu/${page}`}
		className={`my-2 lg:my-1 w-full border rounded-lg bg-opacity-50 dark:bg-opacity-50 hover:bg-zinc-400 dark:hover:bg-zinc-600 flex items-center justify-center cursor-pointer px-4 text-base lg:px-0 transition menuEntry ${
			className ?? ""
		} ${
			useSelectedLayoutSegments()[1] === page
				? "lg:border bg-zinc-400 dark:bg-zinc-600 hover:bg-opacity-75 dark:hover:bg-opacity-75"
				: "lg:border-0 bg-zinc-300 dark:bg-zinc-700 hover:bg-opacity-50 dark:hover:bg-opacity-50"
		}`}
		style={{ borderColor }}
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
	</Link>
);

export default MenuEntry;
