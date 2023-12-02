import { useState } from "react";

const Allegato = ({
	allegato,
	getLink,
}: {
	allegato: { nomeFile: string; descrizioneFile?: string | null };
	getLink: () => Promise<string>;
}) => {
	const [link, setLink] = useState<string | Promise<string | void>>();

	return typeof link === "string" ? (
		<a
			href={link}
			className="link"
			title={allegato.descrizioneFile ?? undefined}
		>
			{allegato.nomeFile}
		</a>
	) : (
		<span
			className="link"
			title={allegato.descrizioneFile ?? undefined}
			onMouseOver={async () => {
				if (!link) setLink(getLink().then(setLink).catch(setLink));
			}}
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
