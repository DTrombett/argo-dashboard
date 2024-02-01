import { semiBold } from "@/app/fonts";

const Entry = ({
	name,
	children,
	id,
}: {
	name: string;
	children?: React.ReactNode;
	id: string;
}) => (
	<div
		className="flex flex-col sm:flex-1 lg:flex-auto max-w-full border-t-2 max-h-80 py-4 lg:h-72 lg:max-h-72 lg:px-2 last:pb-2"
		id={id}
	>
		<span className={semiBold.className}>{name}</span>
		<div className="flex flex-col mt-2 px-1 mx-1 h-full overflow-y-auto text-lg">
			{children}
		</div>
	</div>
);

export default Entry;
