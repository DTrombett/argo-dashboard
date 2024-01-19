import local from "next/font/local";
import { memo } from "react";
import Menu from "./Menu";

const bold = local({ src: "../../../fonts/Poppins-Bold.ttf" });

const Layout = ({ children }: { children: React.ReactNode }) => (
	<div className="mt-2 container flex flex-col justify-center h-full w-full">
		<h2 className={`${bold.className} text-2xl mb-4`}>Voti Giornalieri</h2>
		<div className="flex flex-col lg:flex-row">
			<Menu />
			{children}
		</div>
	</div>
);

export default memo(Layout);
