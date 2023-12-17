import LogOutButton from "@/components/dashboard/LogOutButton";
import RimuoviDati from "@/components/dashboard/RimuoviDati";
import local from "next/font/local";

const bold = local({ src: "../../fonts/Poppins-Bold.ttf" });

const Options = () => (
	<div className="container px-1 lg:px-8 my-2">
		<h2 className={`${bold.className} text-2xl`}>Opzioni</h2>
		<div className="mt-6 lg:text-left">
			<span>
				<span className={bold.className}>Nota</span>: Questo sito è stato creato
				da studenti per gli studenti. Non siamo affiliati in alcun modo ad{" "}
				<span className={bold.className}>Argo Software Srl</span> e si prega di
				fare affidamento al loro{" "}
				<a href="https://argosoft.it" className="link" target="_blank">
					sito ufficiale
				</a>{" "}
				per problemi riscontrati con il registro.
				<br />
				Se, invece, avete trovato un bug nel nostro sito o avete semplicemente
				una fantastica idea in mente, potete segnalarcelo nella nostra{" "}
				<a
					href="https://github.com/DTrombett/argo-dashboard"
					target="_blank"
					className="link"
				>
					repository GitHub
				</a>
				.
			</span>
			<div className="border rounded-lg my-6 text-left p-4">
				<h3 className={`${bold.className} text-xl`}>Rimuovi cache</h3>
				<div className="flex flex-col lg:flex-row items-center justify-center pt-2 lg:pt-4">
					<div className="flex-1 pb-4 lg:pb-0 lg:pr-4">
						A volte può capitare che alcuni dati appaiano duplicati, non
						aggiornati o incorretti. Cancellando la cache, tutti i dati locali
						verranno ricaricati per assicurarsi che siano aggiornati. Se
						continui a riscontrare problemi anche dopo aver ricaricato la cache,
						potrebbe essere un nostro problema! Segnalacelo su GitHub in modo da
						poterci dare un&apos;occhiata.
					</div>
					<RimuoviDati />
				</div>
			</div>
			<div className="border rounded-lg mt-6 mb-4 text-left p-4">
				<h3 className={`${bold.className} text-xl`}>Log out</h3>
				<div className="flex flex-col lg:flex-row items-center justify-center pt-2 lg:pt-4">
					<div className="flex-1 pb-4 lg:pb-0 lg:pr-4">
						Effettua il log out rimuovendo il profilo dal dispositivo. Nota che
						il profilo non verrà scollegato da altri dispositivi o da altri
						browser e app sullo stesso dispositivo.
					</div>
					<LogOutButton />
				</div>
			</div>
		</div>
	</div>
);

export default Options;
