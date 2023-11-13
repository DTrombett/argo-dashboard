"use client";
import { login } from "@/app/actions";
import dynamic from "next/dynamic";
import { useFormState } from "react-dom";
import Loading from "./Loading";

const LoginForm = dynamic(() => import("./LoginForm"), {
	loading: Loading,
});
const Utilities = dynamic(() => import("./Utilities"), {
	loading: Loading,
});
const ErrorMessage = dynamic(() => import("./ErrorMessage"), {
	loading: Loading,
});

const PageContent = ({ loggedIn }: { loggedIn: boolean }) => {
	const [state, formAction] = useFormState(login, loggedIn);

	return state === false ? (
		<LoginForm action={formAction} />
	) : state === true ? (
		<Utilities formAction={formAction} />
	) : (
		<div>
			<ErrorMessage message={state.message} errors={state.errors} />
			<LoginForm action={formAction} />
		</div>
	);
};

export default PageContent;
