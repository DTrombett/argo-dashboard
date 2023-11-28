import localFont from "next/font/local";

const semiBold = localFont({ src: "../public/fonts/Poppins-SemiBold.ttf" });

const Entry = ({
	name,
	children,
}: {
	name: string;
	children?: React.ReactNode;
}) => (
	<div className="flex flex-col sm:flex-1 lg:flex-auto max-w-full border-t-2 max-h-72 py-4 lg:h-72 lg:max-h-72 lg:px-2">
		<span className={semiBold.className}>{name}</span>
		<div className="flex flex-col mt-2 px-2 h-full overflow-y-auto text-lg">
			{children}
		</div>
	</div>
);

export default Entry;
