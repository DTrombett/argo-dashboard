import PasswordField from "components/PasswordField";
import { login } from "./actions";

const Home = () => (
	<main className="flex flex-col h-full p-4 items-center justify-center text-center">
		<span className="my-8 text-5xl">Utilità per il registro elettronico</span>
		<form className="flex flex-col justify-center items-center" action={login}>
			<span className="my-4 text-xl font-light">
				Effettua il login con Argo!
			</span>
			<input
				className="p-4 m-2 rounded outline-none duration-200 bg-zinc-200 dark:bg-zinc-800 text-2xl hover:bg-opacity-80"
				name="schoolCode"
				placeholder="Codice Scuola"
				type="text"
				required
			/>
			<input
				autoComplete="username"
				className="p-4 m-2 rounded outline-none duration-200 bg-zinc-200 dark:bg-zinc-800 text-2xl hover:bg-opacity-80"
				name="username"
				placeholder="Nome Utente"
				type="text"
				required
			/>
			<PasswordField />
			<button className="m-4 p-4 w-1/2 rounded duration-500 bg-zinc-300 dark:bg-zinc-700 text-xl focus-visible:outline-zinc-400 dark:focus-visible:outline-zinc-600 enabled:hover:scale-110 enabled:active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-zinc-200 dark:disabled:bg-zinc-800">
				Login
			</button>
		</form>
	</main>
);

export default Home;
