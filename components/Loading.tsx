import localFont from "next/font/local";
import { useEffect, useState } from "react";

const font = localFont({ src: "../public/fonts/Poppins-Light.ttf" });

const Loading = () => {
	const [n, setN] = useState(3);

	useEffect(() => {
		setTimeout(() => {
			setN(n === 3 ? 0 : n + 1);
		}, 250);
	}, [n]);
	return (
		<span className={`text-xl ${font.className}`}>Loading{".".repeat(n)}</span>
	);
};

export default Loading;
