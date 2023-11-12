import PasswordField from "@/components/PasswordField";
import SubmitButton from "@/components/SubmitButton";
import { login } from "./actions";

const Home = () => (
	<main className="flex flex-col h-full p-4 items-center justify-center text-center">
		<span className="my-8 text-5xl">Utilità per il registro elettronico</span>
		<form className="flex flex-col justify-center items-center" action={login}>
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
	</main>
);
export default Home;
