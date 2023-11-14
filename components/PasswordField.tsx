import { faEye } from "@fortawesome/free-regular-svg-icons/faEye";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons/faEyeSlash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const PasswordField = () => {
	const [show, setShow] = useState(false);

	return (
		<div>
			<input
				autoComplete="current-password"
				className="input"
				name="password"
				placeholder="Password"
				type={show ? "text" : "password"}
				required
			/>
			<button
				className="h-12 w-12 right-4 relative text-xl eye"
				type="button"
				onClick={(event) => {
					event.preventDefault();
					setShow(!show);
				}}
				aria-label={`${show ? "Nascondi" : "Mostra"} password`}
			>
				<FontAwesomeIcon icon={show ? faEyeSlash : faEye} />
			</button>
		</div>
	);
};

export default PasswordField;
