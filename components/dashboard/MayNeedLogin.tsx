import local from "next/font/local";
import { memo } from "react";
import DismissLoginWarning from "./DismissLoginWarning";

const semiBold = local({ src: "../../fonts/Poppins-Medium.ttf" });

const MayNeedLogin = () => (
	<div
		className={`${semiBold.className} transition-transform fixed bottom-4 left-4 max-w-md z-50 p-4 rounded text-white text-lg bg-red-500 flex items-center`}
	>
		<DismissLoginWarning />
		<span className="pl-2 max-w-xs text-left">
			Aggiornamento dati non riuscito, prova a eseguire il log out
		</span>
	</div>
);

export default memo(MayNeedLogin);
