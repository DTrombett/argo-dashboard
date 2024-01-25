import { memo } from "react";
import LoginForm from "./LoginForm";

const Login = () => (
	<div className="flex center-vertically flex-col flex-wrap max-w-fit">
		<div className="mt-auto">
			<LoginForm />
		</div>
	</div>
);

export default memo(Login);
