import { useFormStatus } from "react-dom";

const LogOutButton = () => {
	const { pending } = useFormStatus();

	return (
		<button
			className="m-4 p-4 w-1/4 rounded duration-500 bg-zinc-300 dark:bg-zinc-700 text-xl focus-visible:outline-zinc-400 dark:focus-visible:outline-zinc-600 enabled:hover:scale-110 enabled:active:scale-95 disabled:cursor-wait disabled:opacity-50 disabled:bg-zinc-200 dark:disabled:bg-zinc-800"
			disabled={pending}
		>
			Log out
		</button>
	);
};

export default LogOutButton;
