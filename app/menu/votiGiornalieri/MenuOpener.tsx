import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo, useState } from "react";
import SubjectName from "./SubjectName";

const MenuOpener = ({ open }: { open: boolean }) => {
	const [touch, setTouch] = useState(false);

	return (
		<div
			className={`bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center cursor-pointer px-4 text-base h-16 lg:hidden transition-all rounded-lg ${
				touch ? "opacity-50 " : ""
			}`}
			onTouchStart={setTouch.bind(null, true)}
			onTouchEnd={setTouch.bind(null, false)}
		>
			<SubjectName />
			<FontAwesomeIcon
				icon={open ? faChevronUp : faChevronDown}
				className="h-4 w-4 ml-1 p-2 rounded-lg"
			/>
		</div>
	);
};

export default memo(MenuOpener);
