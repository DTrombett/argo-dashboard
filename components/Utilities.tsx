const Utilities = ({
	accessToken,
	formAction,
}: {
	accessToken: string;
	formAction: (payload: FormData) => void;
}) => (
	<div className="flex flex-col justify-center items-center">
		<span>{accessToken}</span>
		<form className="w-full" action={formAction}>
			<button className="m-4 p-4 w-1/4 rounded duration-500 bg-zinc-300 dark:bg-zinc-700 text-xl focus-visible:outline-zinc-400 dark:focus-visible:outline-zinc-600 enabled:hover:scale-110 enabled:active:scale-95 disabled:cursor-wait disabled:opacity-50 disabled:bg-zinc-200 dark:disabled:bg-zinc-800">
				Log out
			</button>
		</form>
	</div>
);

export default Utilities;
