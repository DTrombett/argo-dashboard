"use client";
import { useEffect } from "react";

const RegisterServiceWorker = () => {
	useEffect(() => {
		if ("serviceWorker" in navigator)
			navigator.serviceWorker.register("/serviceworker.js").catch(() => {});
	}, []);
	return <></>;
};

export default RegisterServiceWorker;
