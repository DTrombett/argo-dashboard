"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const RedirectDesktop = () => {
	const ref = useRef<HTMLDivElement>(null);
	const router = useRouter();

	useEffect(() => {
		if (ref.current?.checkVisibility()) router.replace("/");
	});
	return <div className="hidden lg:block" ref={ref}></div>;
};

export default RedirectDesktop;
