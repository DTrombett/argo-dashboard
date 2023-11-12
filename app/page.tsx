"use client";

import { login } from "@/app/actions";
import LoginForm from "@/components/LoginForm";
import { useFormState } from "react-dom";

const Home = () => {
	const [state, formAction] = useFormState(
		login,
		localStorage.getItem("accessToken")
	);

	// TODO: Move logic to client component
	// TODO: Implement error message
	// TODO: Implement loading form submit button
	return (
		<main className="flex flex-col h-full p-4 items-center justify-center text-center">
			<span className="my-8 text-5xl">Utilità per il registro elettronico</span>
			{state == null ? (
				<LoginForm action={formAction} />
			) : typeof state === "string" ? (
				<span>state = accessToken</span>
			) : (
				<div>
					<span>Errore</span>
					<LoginForm action={formAction} />
				</div>
			)}
		</main>
	);
};
export default Home;
