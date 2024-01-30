"use client";
import { useSelectedLayoutSegment } from "next/navigation";
import MenuItem from "./MenuItem";

const AllSubjectsButton = () => (
	<MenuItem
		name="Tutte le materie"
		selected={useSelectedLayoutSegment() == null}
	/>
);

export default AllSubjectsButton;
