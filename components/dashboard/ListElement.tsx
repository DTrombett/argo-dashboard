import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons/faUpRightFromSquare";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dynamic from "next/dynamic";
import local from "next/font/local";
import type { Dispatch, SetStateAction, SVGProps } from "react";
import { memo, useState } from "react";
import ExpandText from "./ExpandText";

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
const Popup = dynamic(() => import("../Utils/Popup"));

const ListElement = ({
	icon: Icon,
	date,
	header,
	content,
	children,
	title,
	headerTitle,
	popup: PopupComponent,
}: {
	icon: React.ComponentType<SVGProps<SVGElement>>;
	date: Date;
	header: string;
	content: string;
	children?: React.ReactNode;
	title?: string;
	headerTitle?: string;
	popup?: React.ComponentType<{ setOpen: Dispatch<SetStateAction<boolean>> }>;
}) => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<div
				className={`flex flex-col p-2 my-1 rounded-xl bg-zinc-300 dark:bg-zinc-700${
					PopupComponent ? " cursor-pointer" : ""
				}`}
				onClick={PopupComponent && !open ? setOpen.bind(null, true) : undefined}
			>
				<div className={medium.className} title={headerTitle}>
					<Icon className="icon inline" />
					{date.getDate()} {months[date.getMonth()]}{" "}
					{date.getFullYear().toString().slice(-2)}
					{" — "}
					{header}
					{PopupComponent && (
						<FontAwesomeIcon
							icon={faUpRightFromSquare}
							className="inline pl-2"
						/>
					)}
				</div>
				<div className={`text-base ${light.className}`}>
					<ExpandText title={title} content={content} />
					{children}
				</div>
			</div>
			{open && PopupComponent && (
				<Popup setOpen={setOpen}>
					<PopupComponent setOpen={setOpen} />
				</Popup>
			)}
		</>
	);
};

export default memo(ListElement);
