import type { Client } from "portaleargo-api";
import MenuList from "./MenuList";

const Menu = ({ client }: { client: Client }) => (
	<div className="container flex flex-col my-2 items-center">
		<MenuList client={client} />
	</div>
);

export default Menu;
