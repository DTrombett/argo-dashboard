"use client";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

const TabIcon = ({
	name,
	icon,
	className,
	href,
}: {
	name: string;
	icon: React.ReactNode;
	className?: string;
	href: string;
}) => (
	<Link
		href={href}
		className={`flex flex-col lg:flex-row justify-center items-center select-none cursor-pointer bg-opacity-50 dark:bg-opacity-50 hover:bg-zinc-400 dark:hover:bg-zinc-600 w-full rounded-lg my-1 tabIcon mx-2 lg:mx-0 pt-2 lg:pt-0 ${
			className ?? ""
		} ${
			useSelectedLayoutSegment() === (href === "/" ? null : href)
				? "bg-zinc-400 dark:bg-zinc-600 hover:bg-opacity-75 dark:hover:bg-opacity-75"
				: "lg:bg-zinc-300 dark:lg:bg-zinc-700 lg:bg-opacity-50 dark:lg:bg-opacity-50 hover:bg-opacity-50 dark:hover:bg-opacity-50"
		}`}
	>
		{icon}
		<span className="text-lg lg:pl-4 lg:overflow-hidden lg:hidden">{name}</span>
	</Link>
);

export default TabIcon;
