import local from "next/font/local";
import type { SVGProps } from "react";
import { useState } from "react";

const months = [
	"GEN",
	"FEB",
	"MAR",
	"APR",
	"MAG",
	"GIU",
	"LUG",
	"AGO",
	"SET",
	"OTT",
	"NOV",
	"DIC",
];
const medium = local({ src: "../../fonts/Poppins-Medium.ttf" });
const light = local({ src: "../../fonts/Poppins-Light.ttf" });

const ListElement = ({
	icon: Icon,
	date,
	header,
	content,
	children,
	title,
	headerTitle,
}: {
	icon: React.ComponentType<SVGProps<SVGElement>>;
	date: Date;
	header: string;
	content: string;
	children?: React.ReactNode;
	title?: string;
	headerTitle?: string;
}) => {
	const [expanded, setExpanded] = useState(false);

	return (
		<div className="flex flex-col p-2 my-1 rounded-xl bg-zinc-300 dark:bg-zinc-700">
			<div className={medium.className} title={headerTitle}>
				<Icon className="icon inline" />
				{date.getDate()} {months[date.getMonth()]}{" "}
				{date.getFullYear().toString().slice(-2)}
				{" — "}
				{header}
			</div>
			<div className={`text-base ${light.className}`}>
				<span
					title={title}
					onClick={
						content.length > 100
							? () => {
									setExpanded((e) => !e);
							  }
							: undefined
					}
				>
					{!expanded && content.length > 100
						? `${content.slice(0, 97).trimEnd()}...`
						: content}
				</span>
				{children}
			</div>
		</div>
	);
};

export default ListElement;
