"use client";
import { extraLight, semiBold, thin } from "@/app/fonts";
import { useRouter } from "next/navigation";
import type { Dashboard } from "portaleargo-api";
import { useContext, useEffect, useMemo, useState } from "react";
import { ClientContext } from "./ClientProvider";

const radius = 54;
const secondRadius = radius + 16;
const totalRadius = secondRadius + 28;
const circle = Math.PI * radius * 2;
const secondCircle = Math.PI * secondRadius * 2;
const startOffset = secondCircle / 4 + 2;
const firstPart = (3 * startOffset) / 2;
const half = startOffset / 2;
const constOffset = 14;
const getColor = (n: number) =>
	n >= 6 ? "#0c6" : n >= 5 || n === 0 ? "#fa3" : "#f33";

const Media = () => {
	const {
		client: { dashboard },
	} = useContext(ClientContext);
	const media = dashboard?.mediaGenerale ?? 0;
	const color = getColor(media);
	const router = useRouter();
	const [arc, setArc] = useState(0);
	const mediaMaterie = useMemo(
		() =>
			dashboard &&
			Object.entries(dashboard.mediaMaterie).filter(
				(
					data
				): data is [
					string,
					Extract<Dashboard["mediaMaterie"][string], { mediaMateria: number }>
				] => "mediaMateria" in data[1]
			),
		[dashboard]
	);
	const voti = useMemo(
		() => mediaMaterie?.reduce((tot, [, data]) => data.numVoti + tot, 0),
		[mediaMaterie]
	);
	const subjects = useMemo(() => {
		if (!mediaMaterie || !voti) return undefined;
		const resolvedCircle =
			(secondCircle - mediaMaterie.length * constOffset) / voti;
		let offset = startOffset;

		return mediaMaterie.map(([pk, data]) => {
			const newArc = data.numVoti * resolvedCircle;
			const dashoffset = offset;
			const realArc =
				(newArc * data.mediaMateria * data.numVoti) / (data.numVoti * 10);
			const avgOffset = dashoffset + startOffset - newArc / 2;
			const rad = ((avgOffset - 2) * Math.PI * 2) / secondCircle;
			const materiaLight = dashboard?.voti.find(
				({ pkMateria }) => pkMateria === pk
			)?.materiaLight;

			offset -= newArc + constOffset;
			return (
				<g
					key={pk}
					stroke={getColor(data.mediaMateria)}
					strokeDashoffset={dashoffset}
					className="subjectGroup ease-in-out duration-300"
					onClick={(event) => {
						event.stopPropagation();
						router.push(`/dashboard/menu/votiGiornalieri/${pk}`);
					}}
				>
					<circle
						cx="50%"
						cy="50%"
						r={secondRadius}
						strokeOpacity={0.25}
						strokeWidth={10}
						strokeDasharray={`${newArc} ${secondCircle - newArc}`}
						className="transition-all duration-300 ease-in-out arcs"
					/>
					<circle
						cx="50%"
						cy="50%"
						r={secondRadius}
						strokeWidth={24}
						strokeDasharray={`${newArc} ${secondCircle - newArc}`}
						className="opacity-0"
					/>
					<circle
						cx="50%"
						cy="50%"
						r={secondRadius}
						strokeWidth={10}
						strokeDasharray={`${realArc} ${secondCircle - realArc}`}
						className="transition-all duration-300 ease-in-out arcs"
					/>
					<text
						x={Math.sin(rad) * (secondRadius + 10) + totalRadius * 1.5}
						y={Math.cos(rad) * (secondRadius + 8) + totalRadius}
						textAnchor={
							avgOffset < firstPart && avgOffset > half
								? "start"
								: -avgOffset < firstPart && -avgOffset > half
								? "end"
								: "middle"
						}
						alignmentBaseline={
							avgOffset > -half && avgOffset < half
								? "before-edge"
								: avgOffset < -firstPart || avgOffset > firstPart
								? "after-edge"
								: "central"
						}
						stroke="currentColor"
						className={`${thin.className} text-xs tracking-widest subjectName`}
					>
						{materiaLight?.codAggrInvalsi ?? materiaLight?.codMateria}
					</text>
					<text
						x={Math.sin(rad) * (secondRadius - 16) + totalRadius * 1.5}
						y={Math.cos(rad) * (secondRadius - 12) + totalRadius}
						textAnchor={
							avgOffset < firstPart && avgOffset > half
								? "end"
								: -avgOffset < firstPart && -avgOffset > half
								? "start"
								: "middle"
						}
						alignmentBaseline={
							avgOffset > -half && avgOffset < half
								? "after-edge"
								: avgOffset < -firstPart || avgOffset > firstPart
								? "before-edge"
								: "central"
						}
						className={`${extraLight.className} text-sm tracking-widest opacity-0 duration-300 ease-in-out subjectAvg`}
					>
						{data.mediaMateria.toLocaleString()}
					</text>
				</g>
			);
		});
	}, [mediaMaterie, voti, dashboard?.voti, router]);

	useEffect(() => {
		setTimeout(() => {
			setArc((circle * media) / 10);
		}, 250);
	}, [media]);
	return (
		<svg
			width={totalRadius * 3}
			height={totalRadius * 2}
			fill="none"
			strokeLinecap="round"
			className="circle"
			onClick={() => {
				router.push("/dashboard/menu/votiGiornalieri");
			}}
		>
			<g>
				<circle
					cx="50%"
					cy="50%"
					r={radius}
					stroke={color}
					fillOpacity={0.1}
					strokeDasharray={`${arc} ${circle - arc}`}
					strokeDashoffset={circle / 4 + 2}
					strokeWidth={8}
					className="arc duration-1000 ease-in-out"
				/>
				<circle
					cx="50%"
					cy="50%"
					r={radius + 4}
					fill={color}
					fillOpacity={0.1}
				/>
				<text
					x="50%"
					y="50%"
					textAnchor="middle"
					alignmentBaseline="central"
					fill={color}
					className={`${semiBold.className} text-2xl duration-300 ease-in-out lg:hover:underline average`}
				>
					{media.toLocaleString()}
				</text>
			</g>
			<g className="subjects opacity-0 duration-1000 ease-in-out">{subjects}</g>
		</svg>
	);
};

export default Media;
