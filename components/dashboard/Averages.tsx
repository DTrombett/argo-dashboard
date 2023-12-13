import local from "next/font/local";
import type { Dashboard } from "portaleargo-api";

const italic = local({ src: "../../fonts/Poppins-Italic.ttf" });

const Averages = ({ dashboard }: { dashboard: Dashboard }) => {
	const result = Object.entries(dashboard.mediaMaterie).map(([id, m]) => (
		<div key={id} className="flex justify-between">
			<span
				className="text-left whitespace-nowrap overflow-auto outline-0 hideScrollbar subject"
				tabIndex={-1}
			>
				{dashboard.listaMaterie.find((s) => s.pk === id)?.materia}
			</span>
			<span className="text-right">{m.mediaMateria}</span>
		</div>
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
