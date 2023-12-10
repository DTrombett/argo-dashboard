import { Tab } from "@/app/utils";
import dynamic from "next/dynamic";
import { useState } from "react";
import Home from "../icons/home-bianca.svg";
import MenuIcon from "../icons/menu-icon.svg";
import Opzioni from "../icons/opzioni.svg";
import Dashboard from "./Dashboard";
import Loading from "./Loading";
import TabIcon from "./TabIcon";

const Menu = dynamic(() => import("./Menu"), {
	loading: Loading,
});
const MenuList = dynamic(() => import("./MenuList"));

const Navigator = () => {
	const [tab, setTab] = useState(Tab.Home);

	return (
		<>
			{tab === Tab.Home ? <Dashboard /> : tab === Tab.Menu ? <Menu /> : <></>}
			<div className="fixed lg:top-0 left-0 bottom-0 w-screen lg:w-20 bg-zinc-200 dark:bg-zinc-800 flex flex-row lg:flex-col p-2 rounded-t-2xl lg:rounded-r-2xl lg:rounded-tl-none whitespace-nowrap overflow-auto navigator hideScrollbar">
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
					className="lg:hidden"
				/>
				<TabIcon
					name="Opzioni"
					icon={<Opzioni />}
					onClick={setTab.bind(null, Tab.Options)}
					active={tab === Tab.Options}
				/>
				<MenuList className="hidden lg:flex" />
			</div>
		</>
	);
};

export default Navigator;
