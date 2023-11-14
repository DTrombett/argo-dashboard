import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ErrorMessage = ({ message }: { message: string; errors?: string[] }) => (
	<div className="h-12 px-4 flex items-center rounded-xl bg-red-500 bg-opacity-80 text-lg">
		<FontAwesomeIcon
			icon={faXmark}
			className="w-4 h-4 p-2 rounded-full bg-red-800"
		/>
		<span className="px-2">Errore: {message}</span>
	</div>
);

export default ErrorMessage;
