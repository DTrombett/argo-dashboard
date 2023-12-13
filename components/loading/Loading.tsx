import local from "next/font/local";

const font = local({ src: "../../fonts/Poppins-Light.ttf" });

const Loading = () => (
	<span className={`text-xl ${font.className}`}>Loading...</span>
);

export default Loading;
