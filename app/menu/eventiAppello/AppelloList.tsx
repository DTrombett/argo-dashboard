"use client";
import { ClientContext } from "@/components/dashboard/ClientProvider";
import dynamic from "next/dynamic";
import local from "next/font/local";
import { memo, useContext, useMemo } from "react";
import AppelloItem from "./AppelloItem";

const italic = local({ src: "../../../fonts/Poppins-Italic.ttf" });
const iconAppello = dynamic(() => import("../../../icons/calendario.svg"));
const icons: Record<
	string,
	React.ComponentType<React.SVGProps<SVGElement>> | undefined
> = {
	A: dynamic(() => import("../../../icons/appello/assenza-dashboard-icon.svg")),
	I: dynamic(() => import("../../../icons/appello/ritardo-dashboard-icon.svg")),
	U: dynamic(() => import("../../../icons/appello/uscita-dashboard-icon.svg")),
};

const AppelloList = () => {
	const {
		client: { dashboard },
	} = useContext(ClientContext);

	return useMemo(() => {
		const elements = dashboard?.appello
			.map((event) => {
				const date = new Date(event.data);

				return {
					element: (
						<AppelloItem
							key={event.pk}
							title={event.commentoGiustificazione}
							content={event.nota}
							date={date}
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
					date,
				};
			})
			.concat(
				dashboard.fuoriClasse.map((event) => {
					const date = new Date(event.data);

					return {
						element: (
							<AppelloItem
								key={event.pk}
								content={`Fuori classe ${event.nota}`}
								date={date}
								icon={iconAppello}
								header={event.docente}
								footer={event.descrizione}
							/>
						),
						date,
					};
				})
			);

		return elements?.length ? (
			elements
				.sort(
					({ date: date1 }, { date: date2 }) =>
						date2.getTime() - date1.getTime()
				)
				.filter((e, i, array) =>
					array.every((a, j) => j <= i || a.element.key !== e.element.key)
				)
				.map(({ element }) => element)
		) : (
			<span className={italic.className}>Nessun evento disponibile!</span>
		);
	}, [dashboard?.appello, dashboard?.fuoriClasse]);
};

export default memo(AppelloList);
