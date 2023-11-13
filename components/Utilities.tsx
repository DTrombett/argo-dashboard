import LogOutButton from "./LogOutButton";

const Utilities = ({
	formAction,
}: {
	formAction: (payload: FormData) => void;
}) => (
	<div className="flex flex-col justify-center items-center w-full">
		<span>Logged in!</span>
		<form className="w-full" action={formAction}>
			<LogOutButton />
		</form>
	</div>
);

export default Utilities;
