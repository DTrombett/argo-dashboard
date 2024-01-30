import MenuList from "@/components/menu/MenuList";
import RedirectDesktop from "@/components/menu/RedirectDesktop";

const Menu = () => (
	<>
		<div className="container flex flex-col my-2 items-center lg:hidden">
			<MenuList />
		</div>
		<RedirectDesktop />
	</>
);

export default Menu;
