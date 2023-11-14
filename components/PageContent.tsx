"use client";
import { login } from "@/app/actions";
import dynamic from "next/dynamic";
import { useFormState } from "react-dom";
import LoginForm from "./LoginForm";

const ErrorMessage = dynamic(() => import("./ErrorMessage"));

const PageContent = () => {
	const [state, formAction] = useFormState(login, undefined);

	return (
		<>
			{state && <ErrorMessage message={state.message} errors={state.errors} />}
			<LoginForm action={formAction} />
		</>
	);
};

export default PageContent;
