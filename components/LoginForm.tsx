import PasswordField from "./PasswordField";
import SubmitButton from "./SubmitButton";

const LoginForm = ({ action }: { action: (payload: FormData) => void }) => (
	<form className="flex flex-col justify-center items-center" action={action}>
		<span className="my-4 text-xl font-light">Effettua il login con Argo!</span>
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
);

export default LoginForm;
