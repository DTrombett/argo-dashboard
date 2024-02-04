import ClientProvider from "@/components/dashboard/ClientProvider";
import MenuList from "@/components/menu/MenuList";
import TabIcon from "@/components/menu/TabIcon";
import Home from "../../icons/home-bianca.svg";
import MenuIcon from "../../icons/menu-icon.svg";
import Opzioni from "../../icons/opzioni.svg";

const RootLayout = ({ children }: { children: React.ReactNode }) => (
	<ClientProvider>
		<div className="fixed lg:top-0 left-0 bottom-0 w-screen lg:w-20 bg-zinc-200 dark:bg-zinc-800 flex flex-row lg:flex-col p-2 rounded-t-2xl lg:rounded-r-2xl lg:rounded-tl-none whitespace-nowrap overflow-auto navigator z-10 hideScrollbar">
			<TabIcon
				name="Home"
				icon={<Home className="invert dark:invert-0" />}
				href="/dashboard"
			/>
			<TabIcon
				name="Menu"
				icon={<MenuIcon />}
				className="lg:hidden"
				href="/dashboard/menu"
			/>
			<TabIcon name="Opzioni" icon={<Opzioni />} href="/dashboard/options" />
			<MenuList className="hidden lg:flex" />
		</div>
		{children}
	</ClientProvider>
);

export default RootLayout;
