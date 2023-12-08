import local from "next/font/local";

const bold = local({ src: "../fonts/Poppins-Bold.ttf" });

const Column = ({
	name,
	children,
	id,
}: {
	name: string;
	children?: React.ReactNode;
	id: string;
}) => (
	<div className="flex flex-col w-full lg:flex-1 lg:max-w-md" id={id}>
		<div className={`m-4 text-2xl ${bold.className}`}>{name}</div>
		<div className="flex flex-col sm:flex-row lg:flex-col">{children}</div>
	</div>
);

export default Column;
