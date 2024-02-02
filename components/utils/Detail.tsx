import { bold } from "@/app/fonts";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Detail = ({
	icon,
	title,
	text,
}: {
	icon: IconDefinition;
	title: string;
	text: string;
}) => (
	<div className="flex flex-col sm:w-5/12 max-w-md sm:h-72 md:h-64 items-center border border-zinc-500 rounded-lg p-5 my-4 mx-2 sm:mx-4">
		<FontAwesomeIcon icon={icon} className="w-8 lg:w-10" />
		<span className={`${bold.className} pt-3 pb-2`}>{title}</span>
		<span>{text}</span>
	</div>
);

export default Detail;
