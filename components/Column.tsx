import localFont from "next/font/local";

const bold = localFont({ src: "../public/Poppins-Bold.ttf" });

const Column = ({
	name,
	children,
}: {
	name: string;
	children?: React.ReactNode;
}) => (
	<div className="flex flex-col max-w-full lg:w-1/4">
		<div className={`m-4 ${bold.className}`}>{name}</div>
		<div className="flex flex-col">{children}</div>
	</div>
);

export default Column;
