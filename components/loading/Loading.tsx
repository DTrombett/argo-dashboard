import local from "next/font/local";
import { memo } from "react";

const font = local({ src: "../../fonts/Poppins-Light.ttf" });

const Loading = () => (
	<div className={`text-xl flex center-vertically ${font.className}`}>
		<span className="mt-auto">Loading...</span>
	</div>
);

export default memo(Loading);
