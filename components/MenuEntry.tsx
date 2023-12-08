import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Property } from "csstype";
import local from "next/font/local";
import type { SVGProps } from "react";
import { useEffect, useState } from "react";

const light = local({ src: "../fonts/Poppins-Light.ttf" });

const MenuEntry = ({
	name,
	color: borderColor,
	icon: Icon,
	summary,
	children: Children,
}: {
	name: string;
	color: Property.BorderColor;
	icon: React.ComponentType<SVGProps<SVGElement>>;
	summary?: string;
	children?: () => React.ReactNode;
}) => {
	const [expanded, setExpanded] = useState(false);
	const [toHide, setHide] = useState(0);

	useEffect(() => {
		if (toHide) {
			const id = setTimeout(() => {
				setHide(0);
				setExpanded(false);
			}, toHide + 1_000 - Date.now());

			return () => {
				clearTimeout(id);
			};
		}
		return undefined;
	}, [toHide, expanded]);
	return (
		<div
			className="w-11/12 m-2 p-2 border rounded-lg bg-zinc-300 dark:bg-zinc-700 bg-opacity-50 dark:bg-opacity-50"
			style={{ borderColor }}
		>
			<div
				className={`flex items-center h-12 cursor-pointer${
					expanded ? " mb-2" : ""
				}`}
				onClick={() => {
					if (expanded) setHide(Date.now());
					else setExpanded(true);
				}}
			>
				<Icon className="icon inline w-8" />
				<div className="flex flex-col sm:flex-row flex-1 text-left overflow-hidden ml-2 mr-1">
					<span>{name}</span>
					{summary && (
						<span
							className={`${light.className} flex-1 sm:ml-2 lg:ml-4 lg:mr-2 text-opacity-50 text-black dark:text-white dark:text-opacity-50 sm:text-right overflow-auto whitespace-nowrap hideScrollbar`}
						>
							{summary}
						</span>
					)}
				</div>
				<FontAwesomeIcon
					icon={faChevronDown}
					className="md:mr-1 lg:mr-2 p-2 rounded-md hover:bg-zinc-400 hover:dark:bg-zinc-600 hover:bg-opacity-50 dark:hover:bg-opacity-50"
				/>
			</div>
			{expanded && Children && (
				<div
					className="border-t border-zinc-500 pt-2 overflow-hidden"
					style={toHide ? { padding: 0, borderWidth: 0 } : undefined}
				>
					<div className={`expand${toHide ? " hide" : ""}`}>
						<Children />
					</div>
				</div>
			)}
		</div>
	);
};

export default MenuEntry;
