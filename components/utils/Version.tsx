"use client";
import { useRef } from "react";
import pkg from "../../package.json";

const Version = () => {
	const click = useRef(0);

	return (
		<span
			className="px-2 select-none"
			onClick={() => {
				if (
					location.hostname ===
						"argo-dashboard-git-beta-dtrombett.vercel.app" ||
					click.current > 7
				)
					return;
				click.current++;
				if (click.current === 7)
					location.host = "argo-dashboard-git-beta-dtrombett.vercel.app:443";
			}}
		>
			Versione {pkg.version}
		</span>
	);
};

export default Version;
