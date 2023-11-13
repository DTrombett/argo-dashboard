import { useEffect, useState } from "react";

const Loading = () => {
	const [n, setN] = useState(0);

	useEffect(() => {
		setInterval(() => {
			setN((old) => (old === 3 ? 0 : old + 1));
		}, 250);
	}, []);
	return <p>Loading{".".repeat(n)}</p>;
};

export default Loading;
