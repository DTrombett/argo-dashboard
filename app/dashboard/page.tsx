import LogOutButton from "@/components/LogOutButton";
import SetToken from "@/components/SetToken";
import { redirect } from "next/navigation";
import { getDashboard } from "../actions";

const Utilities = async () => {
	const { dashboard, token } = await getDashboard();

	if (!token) redirect("/");
	return (
		<>
			<main className="flex flex-col h-full p-4 justify-center text-center">
				<div className="flex flex-col justify-center items-center w-full">
					<span>Media: {dashboard?.mediaGenerale}</span>
					<LogOutButton />
				</div>
			</main>
			<SetToken token={JSON.stringify(token)} />
		</>
	);
};

export default Utilities;
