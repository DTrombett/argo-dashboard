import type { State } from "@/app/utils";
import { Tab } from "@/app/utils";
import dynamic from "next/dynamic";
import type { Client } from "portaleargo-api";
import { useState } from "react";
import Home from "../icons/home-bianca.svg";
import MenuIcon from "../icons/menu-icon.svg";
import Opzioni from "../icons/opzioni.svg";
import Dashboard from "./Dashboard";
import Loading from "./Loading";
import TabIcon from "./TabIcon";

const Menu = dynamic(() => import("@/components/Menu"), {
	loading: Loading,
});

const Navigator = ({
	client,
	loading,
	setState,
}: {
	loading?: boolean;
	client: Client;
	setState: (state: State) => void;
}) => {
	const [tab, setTab] = useState(Tab.Home);

	return (
		<>
			{tab === Tab.Home ? (
				<Dashboard loading={loading} client={client} setState={setState} />
			) : tab === Tab.Menu ? (
				<Menu client={client} />
			) : (
				<></>
			)}
			<div className="w-full h-16 fixed rounded-t-xl -mb-px bottom-0 left-0 px-8 bg-zinc-200 dark:bg-zinc-800 flex justify-evenly items-center lg:w-20 lg:h-full lg:top-0 lg:flex-col lg:px-1 lg:py-4 lg:rounded-t-none lg:rounded-tr-2xl lg:rounded-br-2xl lg:justify-start">
				<TabIcon
					name="Home"
					icon={<Home className="invert dark:invert-0" />}
					onClick={setTab.bind(null, Tab.Home)}
					active={tab === Tab.Home}
				/>
				<TabIcon
					name="Menu"
					icon={<MenuIcon />}
					onClick={setTab.bind(null, Tab.Menu)}
					active={tab === Tab.Menu}
				/>
				<TabIcon
					name="Opzioni"
					icon={<Opzioni />}
					onClick={setTab.bind(null, Tab.Options)}
					active={tab === Tab.Options}
				/>
			</div>
		</>
	);
};

export default Navigator;
