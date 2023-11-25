import localFont from "next/font/local";

const bold = localFont({ src: "../public/Poppins-Bold.ttf" });

const Column = ({
	name,
	children,
}: {
	name: string;
	children?: React.ReactNode;
}) => (
	<div className="flex flex-col w-full md:flex-1 md:max-w-md">
		<div className={`m-4 text-2xl ${bold.className}`}>{name}</div>
		<div className="flex flex-col">{children}</div>
	</div>
);

export default Column;