"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const RedirectDesktop = () => {
	const ref = useRef<HTMLDivElement>(null);
	const router = useRouter();

	useEffect(() => {
		if (ref.current) {
			const observer = new IntersectionObserver((entries) => {
				if (entries.find((entry) => entry.isIntersecting)) router.replace("/");
			});

			observer.observe(ref.current);
			return observer.disconnect.bind(observer);
		}
		return undefined;
	}, [router]);
	return <div className="hidden lg:block" ref={ref}></div>;
};

export default RedirectDesktop;
