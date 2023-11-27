import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import localFont from "next/font/local";
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
const medium = localFont({ src: "../public/Poppins-Medium.ttf" });
const light = localFont({ src: "../public/Poppins-Light.ttf" });

const ListElement = ({
	icon,
	date,
	header,
	content,
}: {
	icon?: IconProp;
	date: Date;
	header: string;
	content: string;
}) => {
	const [expanded, setExpanded] = useState(false);

	return (
		<div className="flex flex-col py-1">
			<div className={medium.className}>
				{icon && <FontAwesomeIcon icon={icon} />}
				<span>
					{" "}
					{date.getDate()} {months[date.getMonth()]}{" "}
					{date.getFullYear().toString().slice(-2)}
					{" — "}
					{header}
				</span>
			</div>
			<span
				className={`text-base ${light.className}`}
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
		</div>
	);
};

export default ListElement;
