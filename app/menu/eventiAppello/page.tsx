import local from "next/font/local";
import { memo } from "react";
import FilteredList from "./FilteredList";

const bold = local({ src: "../../../fonts/Poppins-Bold.ttf" });

const EventiAppello = () => (
	<div className="my-2 lg:px-2 container flex flex-col justify-center h-full w-full">
		<h2 className={`${bold.className} text-2xl`}>Eventi appello</h2>
		<FilteredList />
	</div>
);

export default memo(EventiAppello);
