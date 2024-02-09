"use client";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faCopy } from "@fortawesome/free-solid-svg-icons/faCopy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const Copy = ({ text }: { text: string }) => {
	const [copied, setCopied] = useState(false);

	return (
		text &&
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		navigator.clipboard && (
			<FontAwesomeIcon
				icon={copied ? faCheck : faCopy}
				className="ml-2 inline cursor-pointer"
				onClick={() =>
					navigator.clipboard.writeText(text).then(setCopied.bind(null, true))
				}
			/>
		)
	);
};

export default Copy;
