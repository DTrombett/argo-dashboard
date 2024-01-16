import local from "next/font/local";
import MenuList from "./MenuList";

const bold = local({ src: "../../../fonts/Poppins-Bold.ttf" });

const Layout = ({ children }: { children: React.ReactNode }) => (
	<div className="mt-2 lg:px-2 container flex flex-col justify-center h-full w-full">
		<h2 className={`${bold.className} text-2xl mb-2`}>Voti Giornalieri</h2>
		<div className="flex">
			<MenuList />
			<div className="flex-1 hidden lg:flex">{children}</div>
		</div>
	</div>
);

export default Layout;
