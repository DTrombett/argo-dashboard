"use client";
import { ClientContext } from "@/components/dashboard/ClientProvider";
import dynamic from "next/dynamic";
import local from "next/font/local";
import { memo, useContext, useState } from "react";
import AppelloItem from "./AppelloItem";

const italic = local({ src: "../../../fonts/Poppins-Italic.ttf" });
const semiBold = local({ src: "../../../fonts/Poppins-SemiBold.ttf" });
const iconAppello = dynamic(() => import("../../../icons/calendario.svg"));
const icons: Record<
	string,
	React.ComponentType<React.SVGProps<SVGElement>> | undefined
> = {
	A: dynamic(() => import("../../../icons/appello/assenza-dashboard-icon.svg")),
	I: dynamic(() => import("../../../icons/appello/ritardo-dashboard-icon.svg")),
	U: dynamic(() => import("../../../icons/appello/uscita-dashboard-icon.svg")),
};

const FilteredList = () => {
	const { client } = useContext(ClientContext);
	const [filters, setFilters] = useState<string[]>([]);
	const elements: {
		element: JSX.Element;
		date: Date;
	}[] = [];
	const categories = {
		A: 0,
		I: 0,
		U: 0,
		FC: 0,
	};
	const pks: string[] = [];
	const handleChange = (type: string) => () => {
		const i = filters.indexOf(type);

		setFilters(i === -1 ? [...filters, type] : filters.toSpliced(i, 1));
	};

	if (client.dashboard) {
		for (const event of client.dashboard.appello)
			if (!pks.includes(event.pk)) {
				if (!filters.length || filters.includes(event.codEvento))
					elements.push({
						element: (
							<AppelloItem
								key={event.pk}
								title={event.commentoGiustificazione}
								content={event.nota}
								date={new Date(event.data)}
								icon={icons[event.codEvento] ?? iconAppello}
								header={event.docente}
								footer={
									event.giustificata === "S"
										? `(Giustificata il ${new Date(
												event.dataGiustificazione
										  ).toLocaleDateString("it-IT", {
												month: "long",
												day: "numeric",
												year: "numeric",
										  })})`
										: ""
								}
							/>
						),
						date: new Date(event.data),
					});
				if (event.codEvento in categories) categories[event.codEvento as "A"]++;
				pks.push(event.pk);
			}
		for (const event of client.dashboard.fuoriClasse)
			if (!pks.includes(event.pk)) {
				if (!filters.length || filters.includes("FC"))
					elements.push({
						element: (
							<AppelloItem
								key={event.pk}
								content={`Fuori classe ${event.nota}`}
								date={new Date(event.data)}
								icon={iconAppello}
								header={event.docente}
								footer={event.descrizione}
							/>
						),
						date: new Date(event.data),
					});
				categories.FC++;
				pks.push(event.pk);
			}
	}
	return (
		<div className="flex flex-col lg:flex-row justify-between my-2">
			<fieldset className="border lg:border-0 px-4 py-2 m-4 rounded-xl text-left text-lg h-fit lg:w-60">
				<legend className={`${semiBold.className} text-xl`}>Filtri</legend>
				<label htmlFor="assenze">
					Assenze ({categories.A})
					<input
						type="checkbox"
						id="assenze"
						name="assenze"
						onChange={handleChange("A")}
						checked={filters.includes("A")}
					/>
					<span />
				</label>
				<label htmlFor="uscite">
					Uscite ({categories.U})
					<input
						type="checkbox"
						id="uscite"
						name="uscite"
						onChange={handleChange("U")}
						checked={filters.includes("U")}
					/>
					<span />
				</label>
				<label htmlFor="ritardi">
					Ritardi ({categories.I})
					<input
						type="checkbox"
						id="ritardi"
						name="ritardi"
						onChange={handleChange("I")}
						checked={filters.includes("I")}
					/>
					<span />
				</label>
				<label htmlFor="fuoriClasse">
					Fuori classe ({categories.FC})
					<input
						type="checkbox"
						id="fuoriClasse"
						name="fuoriClasse"
						onChange={handleChange("FC")}
						checked={filters.includes("FC")}
					/>
					<span />
				</label>
			</fieldset>
			<div className="flex flex-col flex-1 lg:mx-8 my-auto">
				{elements.length ? (
					elements
						.sort(
							({ date: date1 }, { date: date2 }) =>
								date2.getTime() - date1.getTime()
						)
						.map(({ element }) => element)
				) : (
					<span className={`${italic.className} text-xl py-4 lg:pr-64`}>
						Nessun evento disponibile!
					</span>
				)}
			</div>
		</div>
	);
};

export default memo(FilteredList);
