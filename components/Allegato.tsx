import { useState } from "react";

const Allegato = ({
	allegato,
	getLink,
}: {
	allegato: { nomeFile: string; descrizioneFile?: string | null };
	getLink: () => Promise<string>;
}) => {
	const [link, setLink] = useState<string | Promise<string | void>>();

	if (typeof link === "string")
		return (
			<a
				href={link}
				className="link"
				title={allegato.descrizioneFile ?? undefined}
				download={allegato.nomeFile}
			>
				{allegato.nomeFile}
			</a>
		);
	const loadLink = async () => {
		if (!link) setLink(getLink().then(setLink).catch(setLink));
		throw new Error();
	};

	return (
		<span
			className="link"
			title={allegato.descrizioneFile ?? undefined}
			onMouseEnter={loadLink}
			onTouchStart={loadLink}
			onClick={async () => {
				let url = await link;

				if (!url) {
					const promise = getLink()
						.then((l) => {
							setLink(l);
							return l;
						})
						.catch(setLink);

					setLink(promise);
					url = await promise;
				}
				if (url) window.location.href = url;
			}}
		>
			{allegato.nomeFile}
		</span>
	);
};

export default Allegato;
