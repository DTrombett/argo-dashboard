"use client";
import { useEffect, useState } from "react";

const AppName = () => {
	const [beta, setBeta] = useState(false);

	useEffect(() => {
		if (location.hostname === "argo-dashboard-git-beta-dtrombett.vercel.app")
			setBeta(true);
	}, []);
	return beta ? "Argo Dashßoard" : "Argo Dashboard";
};

export default AppName;
