"use client";
import { login } from "@/app/actions";
import dynamic from "next/dynamic";
import { useFormState } from "react-dom";
import Loading from "./Loading";

const LoginForm = dynamic(() => import("./LoginForm"), {
	loading: Loading,
});
const ErrorMessage = dynamic(() => import("./ErrorMessage"), {
	loading: Loading,
});

const PageContent = () => {
	const [state, formAction] = useFormState(login, undefined);

	return state ? (
		<div>
			<ErrorMessage message={state.message} errors={state.errors} />
			<LoginForm action={formAction} />
		</div>
	) : (
		<LoginForm action={formAction} />
	);
};

export default PageContent;
