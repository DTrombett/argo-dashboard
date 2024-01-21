"use client";
import { ClientContext } from "@/components/dashboard/ClientProvider";
import { useSelectedLayoutSegment } from "next/navigation";
import { memo, useContext, useMemo } from "react";

const SubjectName = () => {
	const selectedPk = useSelectedLayoutSegment();
	const {
		client: { dashboard },
	} = useContext(ClientContext);

	return useMemo(
		() => (
			<span className="flex-1 text-left max-h-16 overflow-y-auto hideScrollbar">
				{selectedPk == null
					? "Scegli una materia"
					: dashboard?.listaMaterie.find(({ pk }) => pk === selectedPk)
							?.materia}
			</span>
		),
		[dashboard?.listaMaterie, selectedPk]
	);
};

export default memo(SubjectName);
