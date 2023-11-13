import PageContent from "@/components/PageContent";
import { redirect } from "next/navigation";
import { getClientToken } from "./actions";

const Home = () => {
	const token = getClientToken();

	if (token) redirect("/dashboard");
	return (
		<main className="flex flex-col h-full p-4 items-center justify-center text-center">
			<span className="my-8 text-5xl">Utilità per il registro elettronico</span>
			<PageContent />
		</main>
	);
};

export default Home;
