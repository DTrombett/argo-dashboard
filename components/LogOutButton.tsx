import { State } from "@/app/utils";
import type { Client } from "portaleargo-api";
import { useState } from "react";
import LoadingBar from "./LoadingBar";

const LogOutButton = ({
	client,
	setState,
}: {
	client: Client;
	setState: (state: State) => void;
}) => {
	const [pending, setPending] = useState(false);

	return (
		<button
			className="relative mt-4 p-4 w-40 rounded duration-500 bg-zinc-300 dark:bg-zinc-700 text-xl focus-visible:outline-zinc-400 dark:focus-visible:outline-zinc-600 enabled:hover:scale-110 enabled:active:scale-95 disabled:cursor-wait disabled:opacity-50 disabled:bg-zinc-200 dark:disabled:bg-zinc-800"
			disabled={pending}
			onClick={async () => {
				setPending(true);
				await client.logOut().catch(() => {});
				setState(State.NeedLogin);
			}}
		>
			Log out
			{pending && <LoadingBar />}
		</button>
	);
};

export default LogOutButton;
