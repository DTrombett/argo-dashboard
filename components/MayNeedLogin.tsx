import { State } from "@/app/utils";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import localFont from "next/font/local";

const semiBold = localFont({ src: "../fonts/Poppins-Medium.ttf" });

const MayNeedLogin = ({ setState }: { setState: (state: State) => void }) => (
	<div
		className={`${semiBold.className} transition-transform fixed bottom-4 left-4 max-w-md z-50 p-4 rounded text-white text-lg bg-red-500 flex items-center`}
	>
		<FontAwesomeIcon
			icon={faXmark}
			className="w-4 h-4 p-1 rounded-full bg-red-800 cursor-pointer"
			onClick={() => {
				setState(State.Ready);
			}}
		/>
		<span className="pl-2 max-w-xs text-left">
			Aggiornamento dati non riuscito, prova a eseguire il log out
		</span>
	</div>
);

export default MayNeedLogin;
