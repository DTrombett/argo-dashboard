import dynamic from "next/dynamic";
import { useFormStatus } from "react-dom";

const LoadingBar = dynamic(() => import("./LoadingBar"));

const SubmitButton = () => {
	const { pending } = useFormStatus();

	return (
		<button
			className="relative m-4 mb-2 p-4 w-1/2 rounded duration-500 bg-zinc-300 dark:bg-zinc-700 text-xl focus-visible:outline-zinc-400 dark:focus-visible:outline-zinc-600 enabled:hover:scale-110 enabled:active:scale-95 disabled:cursor-wait disabled:opacity-50 disabled:bg-zinc-200 dark:disabled:bg-zinc-800"
			disabled={pending}
		>
			Login
			{pending && <LoadingBar />}
		</button>
	);
};

export default SubmitButton;
