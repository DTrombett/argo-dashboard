"use client";
import { useSelectedLayoutSegment } from "next/navigation";
import { memo } from "react";
import MenuItem from "./MenuItem";

const AllSubjectsButton = () => (
	<MenuItem
		name="Tutte le materie"
		selected={useSelectedLayoutSegment() == null}
	/>
);

export default memo(AllSubjectsButton);
