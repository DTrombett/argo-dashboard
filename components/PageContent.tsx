"use client";
import { login } from "@/app/actions";
import { useFormState } from "react-dom";
import ErrorMessage from "./ErrorMessage";
import LoginForm from "./LoginForm";
import Utilities from "./Utilities";

const PageContent = ({ accessToken }: { accessToken?: string }) => {
	const [state, formAction] = useFormState(login, accessToken);

	return state == null ? (
		<LoginForm action={formAction} />
	) : typeof state === "string" ? (
		<Utilities accessToken={state} formAction={formAction} />
	) : (
		<div>
			<ErrorMessage message={state.message} errors={state.errors} />
			<LoginForm action={formAction} />
		</div>
	);
};

export default PageContent;
