import { useEffect, useState } from "react";

const Loading = () => {
	const [n, setN] = useState(0);

	useEffect(() => {
		setTimeout(() => {
			setN(n === 3 ? 0 : n + 1);
		}, 250);
	}, [n]);
	return <p>Loading{".".repeat(n)}</p>;
};

export default Loading;
