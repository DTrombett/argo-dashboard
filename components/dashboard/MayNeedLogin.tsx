import { medium } from "@/app/fonts";
import DismissLoginWarning from "./DismissLoginWarning";

const MayNeedLogin = () => (
	<div
		className={`${medium.className} transition-transform fixed bottom-4 left-4 max-w-md z-50 p-4 rounded text-white text-lg bg-red-500 flex items-center`}
	>
		<DismissLoginWarning />
		<span className="pl-2 max-w-xs text-left">
			Aggiornamento dati non riuscito, prova a eseguire il log out
		</span>
	</div>
);

export default MayNeedLogin;
