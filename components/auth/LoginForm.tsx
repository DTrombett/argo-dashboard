import { getClientToken } from "@/app/actions";
import { State } from "@/app/utils";
import dynamic from "next/dynamic";
import { useContext, useState } from "react";
import { ClientContext } from "../dashboard/ClientProvider";
import PasswordField from "./PasswordField";
import SubmitButton from "./SubmitButton";

const ErrorMessage = dynamic(() => import("./ErrorMessage"));

const LoginForm = () => {
	const [error, setError] = useState<string>();
	const { client, setState } = useContext(ClientContext);

	return (
		<div className="flex center-vertically flex-col flex-wrap max-w-fit">
			<div className="mt-auto">
				{error && <ErrorMessage message={error} />}
				<form
					className="flex flex-col justify-center items-center"
					action={async (formData) => {
						const token = await getClientToken(formData);

						if ("message" in token) {
							setError(token.error);
							return;
						}
						client.token = token;
						await client
							.login()
							.then(() => {
								setState(State.Ready);
							})
							.catch((err) => {
								setError(String(err));
							});
					}}
				>
					<span className="my-4 text-xl font-light">
						Effettua il login con Argo!
					</span>
					<input
						className="input"
						name="schoolCode"
						placeholder="Codice Scuola"
						type="text"
						required
					/>
					<input
						autoComplete="username"
						className="input"
						name="username"
						placeholder="Nome Utente"
						type="text"
						required
					/>
					<PasswordField />
					<SubmitButton />
				</form>
			</div>
		</div>
	);
};

export default LoginForm;
