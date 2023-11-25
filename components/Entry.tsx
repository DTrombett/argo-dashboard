import localFont from "next/font/local";

const semiBold = localFont({ src: "../public/Poppins-SemiBold.ttf" });

const Entry = ({
	name,
	children,
}: {
	name: string;
	children?: React.ReactNode;
}) => (
	<div className="flex flex-col max-w-full border-t-2 max-h-64 py-4 md:h-64 md:px-2">
		<span className={semiBold.className}>{name}</span>
		<div className="flex flex-col mt-2 px-2 max-h-64 h-full overflow-y-auto text-lg">
			{children}
		</div>
	</div>
);

export default Entry;