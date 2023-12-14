import local from "next/font/local";

const months = [
	"GEN",
	"FEB",
	"MAR",
	"APR",
	"MAG",
	"GIU",
	"LUG",
	"AGO",
	"SET",
	"OTT",
	"NOV",
	"DIC",
];
const medium = local({ src: "../../../fonts/Poppins-Medium.ttf" });
const light = local({ src: "../../../fonts/Poppins-Light.ttf" });

const AppelloItem = ({
	icon: Icon,
	date,
	header,
	content,
	footer,
	title,
	headerTitle,
}: {
	icon: React.ComponentType<React.SVGProps<SVGElement>>;
	date: Date;
	header: string;
	content: string;
	footer?: string;
	title?: string;
	headerTitle?: string;
}) => (
	<div className="flex text-lg p-4 my-2 w-full rounded-xl bg-zinc-200 dark:bg-zinc-800">
		<Icon className="mx-2 my-4 w-8 text-center" />
		<div className="ml-4 flex-1 text-left flex flex-col">
			<div className="flex flex-col sm:flex-row w-full justify-between">
				<span className={`${medium.className} uppercase`}>{header}</span>
				<span className="text-cyan-500 text-base contents" title={headerTitle}>
					{date.getDate()} {months[date.getMonth()]}{" "}
					{date.getFullYear().toString().slice(-2)}
				</span>
			</div>
			<span title={title} className={`py-2 ${light.className}`}>
				{content}
			</span>
			<span
				className={`${light.className} text-sm text-opacity-50 text-black dark:text-white dark:text-opacity-50`}
			>
				{footer}
			</span>
		</div>
	</div>
);

export default AppelloItem;
