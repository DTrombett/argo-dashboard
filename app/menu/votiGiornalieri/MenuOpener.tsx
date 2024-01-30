import TouchableOpacity from "@/components/Utils/TouchableOpacity";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SubjectName from "./SubjectName";

const MenuOpener = ({ open }: { open: boolean }) => (
	<TouchableOpacity
		className={
			"bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center cursor-pointer px-4 text-base h-16 lg:hidden rounded-lg"
		}
	>
		<SubjectName />
		<FontAwesomeIcon
			icon={open ? faChevronUp : faChevronDown}
			className="h-4 w-4 ml-1 p-2 rounded-lg"
		/>
	</TouchableOpacity>
);

export default MenuOpener;
