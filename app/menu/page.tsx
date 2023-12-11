import MenuList from "@/components/MenuList";
import RedirectDesktop from "@/components/RedirectDesktop";

const Menu = () => (
	<>
		<div className="container flex flex-col my-2 items-center lg:hidden">
			<MenuList />
		</div>
		<RedirectDesktop />
	</>
);

export default Menu;
