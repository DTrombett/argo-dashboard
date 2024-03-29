import { faEye } from "@fortawesome/free-regular-svg-icons/faEye";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons/faEyeSlash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const PasswordField = () => {
	const [show, setShow] = useState(false);

	return (
		<>
			<input
				autoComplete="current-password"
				className="p-4 w-full rounded outline-none bg-zinc-200 dark:bg-zinc-800 duration-200 text-xl hover:bg-opacity-80 sm:text-2xl"
				name="password"
				placeholder="Password"
				type={show ? "text" : "password"}
				required
			/>
			<button
				className="h-12 w-12 right-2 relative text-xl eye"
				type="button"
				onClick={(event) => {
					event.preventDefault();
					setShow(!show);
				}}
				aria-label={`${show ? "Nascondi" : "Mostra"} password`}
			>
				<FontAwesomeIcon icon={show ? faEyeSlash : faEye} />
			</button>
		</>
	);
};

export default PasswordField;
