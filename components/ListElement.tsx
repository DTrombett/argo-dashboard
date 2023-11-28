import { StaticImport } from "next/dist/shared/lib/get-img-props";
import localFont from "next/font/local";
import Image from "next/image";
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
const medium = localFont({ src: "../public/fonts/Poppins-Medium.ttf" });
const light = localFont({ src: "../public/fonts/Poppins-Light.ttf" });

const ListElement = ({
	icon,
	date,
	header,
	content,
}: {
	icon: string | StaticImport;
	date: Date;
	header: string;
	content: string;
}) => {
	const [expanded, setExpanded] = useState(false);

	return (
		<div className="flex flex-col py-1">
			<div className={medium.className}>
				<Image src={icon} alt="icon" height={18} className="relative icon" />
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
