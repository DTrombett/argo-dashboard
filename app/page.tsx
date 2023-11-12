import PageContent from "@/components/PageContent";
import { getCookie } from "./actions";

const Home = () => (
	<main className="flex flex-col h-full p-4 items-center justify-center text-center">
		<span className="my-8 text-5xl">Utilità per il registro elettronico</span>
		<PageContent accessToken={getCookie("accessToken")} />
	</main>
);
export default Home;
