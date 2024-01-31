import { useState } from "react";

const ExpandText = ({
	title,
	content,
}: {
	title?: string;
	content: string;
}) => {
	const [expanded, setExpanded] = useState(false);
	const long = content.length > 100;

	return (
		<span
			title={title}
			onClick={long ? setExpanded.bind(null, (e) => !e) : undefined}
		>
			{long && !expanded ? `${content.slice(0, 97).trimEnd()}...` : content}
		</span>
	);
};

export default ExpandText;
