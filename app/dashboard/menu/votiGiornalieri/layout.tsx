import { bold } from "@/app/fonts";
import Menu from "./Menu";

const Layout = ({ children }: { children: React.ReactNode }) => (
	<div className="mt-2 container flex flex-col justify-center h-full w-full">
		<h2 className={`${bold.className} text-2xl mb-4`}>Voti Giornalieri</h2>
		<div className="flex flex-col lg:flex-row">
			<Menu />
			<div className="flex-1 mt-4 lg:mt-0 flex flex-col lg:flex-row-reverse justify-between">
				{children}
			</div>
		</div>
	</div>
);

export default Layout;
