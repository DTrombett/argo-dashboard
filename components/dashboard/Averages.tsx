import local from "next/font/local";
import Link from "next/link";
import type { Dashboard } from "portaleargo-api";

const italic = local({ src: "../../fonts/Poppins-Italic.ttf" });

const Averages = ({ dashboard }: { dashboard: Dashboard }) => {
	const result = Object.entries(dashboard.mediaMaterie).map(([pk, m]) => (
		<Link
			key={pk}
			href={`/menu/votiGiornalieri/${pk}`}
			className="flex justify-between"
		>
			<span
				className="text-left whitespace-nowrap overflow-auto outline-0 hideScrollbar subject underline"
				tabIndex={-1}
			>
				{dashboard.listaMaterie.find((s) => s.pk === pk)?.materia}
			</span>
			<span className="text-right">{m.mediaMateria}</span>
		</Link>
	));

	return result.length ? (
		result
	) : (
		<span className={italic.className}>
			Nessun dato disponibile riguardo la media!
		</span>
	);
};

export default Averages;
