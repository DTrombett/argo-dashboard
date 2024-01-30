"use client";
import { State } from "@/app/utils";
import Link from "next/link";
import { useContext } from "react";
import { ClientContext } from "./ClientProvider";

const LogOutButton = () => {
	const { client, setState } = useContext(ClientContext);

	return (
		<Link
			href="/"
			className="relative p-4 w-40 whitespace-nowrap rounded duration-500 text-center bg-zinc-300 dark:bg-zinc-700 text-xl focus-visible:outline-zinc-400 dark:focus-visible:outline-zinc-600 hover:scale-110 active:scale-95"
			onClick={async () => {
				setState(State.NeedLogin);
				await client.logOut().catch(() => {});
			}}
		>
			Log out
		</Link>
	);
};

export default LogOutButton;
