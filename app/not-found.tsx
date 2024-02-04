import { faHome } from "@fortawesome/free-solid-svg-icons/faHome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { extraBold } from "./fonts";

const NotFound = () => (
	<div className="my-auto">
		<div className="flex items-center mb-4">
			<span
				className={`${extraBold.className} text-4xl px-4 border-r border-zinc-500`}
			>
				404
			</span>
			<span className="px-4 text-2xl">Ti sei perso?</span>
		</div>
		<Link href="/dashboard" className="link text-xl">
			Torna a casa
			<FontAwesomeIcon icon={faHome} height={"1rem"} className="inline px-2" />
		</Link>
	</div>
);

export default NotFound;
