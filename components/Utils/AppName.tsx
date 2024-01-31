"use client";
import { useEffect, useState } from "react";

const AppName = () => {
	const [beta, setBeta] = useState(false);

	useEffect(() => {
		if (location.hostname !== "argo-dashboard.vercel.app") setBeta(true);
	}, []);
	return beta ? (
		<>
			Argo Dash<span className="font-extrabold">β</span>oard
		</>
	) : (
		"Argo Dashboard"
	);
};

export default AppName;
