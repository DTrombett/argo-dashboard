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
}) => {
	const segment = useSelectedLayoutSegment();

	return (
		<Link
			href={href}
			className={`flex flex-col lg:flex-row justify-center items-center select-none cursor-pointer w-full rounded-lg my-1 tabIcon mx-2 lg:mx-0 pt-2 lg:pt-0 transition ${
				className ?? ""
			} ${
				`/dashboard${segment ? `/${segment}` : ""}` === href
					? "bg-zinc-400 dark:bg-zinc-600 bg-opacity-50 dark:bg-opacity-50 hover:bg-zinc-500 hover:bg-opacity-40 dark:hover:bg-opacity-40"
					: "lg:bg-zinc-300 dark:lg:bg-zinc-700 lg:bg-opacity-50 dark:lg:bg-opacity-50 hover:bg-zinc-400 dark:hover:bg-zinc-600 hover:bg-opacity-75 dark:hover:bg-opacity-75"
			}`}
		>
			{icon}
			<span className="text-lg lg:pl-4 lg:overflow-hidden lg:hidden">
				{name}
			</span>
		</Link>
	);
};

export default TabIcon;
