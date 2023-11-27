import { useEffect, useState } from "react";

const Loading = () => {
	const [n, setN] = useState(3);

	useEffect(() => {
		setTimeout(() => {
			setN(n === 3 ? 0 : n + 1);
		}, 250);
	}, [n]);
	return <span>Loading{".".repeat(n)}</span>;
};

export default Loading;
