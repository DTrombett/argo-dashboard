import localFont from "next/font/local";
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
const medium = localFont({ src: "../fonts/Poppins-Medium.ttf" });
const light = localFont({ src: "../fonts/Poppins-Light.ttf" });

const ListElement = ({
	Icon,
	date,
	header,
	content,
	children,
	title,
	headerTitle,
}: {
	Icon: React.ComponentType<SVGProps<SVGElement>>;
	date: Date;
	header: string;
	content: string;
	children?: React.ReactNode;
	title?: string;
	headerTitle?: string;
}) => {
	const [expanded, setExpanded] = useState(false);

	return (
		<div className="flex flex-col py-1">
			<div className={medium.className} title={headerTitle}>
				<Icon className="icon inline" />
				{date.getDate()} {months[date.getMonth()]}{" "}
				{date.getFullYear().toString().slice(-2)}
				{" — "}
				{header}
			</div>
			<span className={`text-base ${light.className}`}>
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
			</span>
		</div>
	);
};

export default ListElement;
