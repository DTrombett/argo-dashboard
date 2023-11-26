import { useEffect, useState } from "react";

const Loading = () => {
	const [n, setN] = useState(3);

	useEffect(() => {
		setInterval(() => {
			setN((old) => (old === 3 ? 0 : old + 1));
		}, 500);
	}, []);
	return <p>Loading{".".repeat(n)}</p>;
};

export default Loading;
