"use client";
import { semiBold } from "@/app/fonts";
import { useEffect, useState } from "react";

const radius = 56;
const totalRadius = radius + 16;
const duration = 1_000;

const MediaCircle = ({ media = 0 }: { media?: number }) => {
	const color =
		media >= 6 ? "#0c6" : media >= 5 || media === 0 ? "#fa3" : "#f33";
	const [x, setX] = useState(0);
	const circle = Math.PI * radius * 2;
	const arc = (circle * x) / 10;

	useEffect(() => {
		let start;
		const callback = (timeStamp: number): void => {
			const elapsed = timeStamp - (start ??= timeStamp);

			setX((media * elapsed) / duration);
			if (elapsed < duration) requestAnimationFrame(callback);
		};
		if (navigator.webdriver) {
			start = 0;
			callback(Infinity);
		} else requestAnimationFrame(callback);
	}, [media]);
	return (
		<svg width={totalRadius * 2} height={totalRadius * 2}>
			<circle
				cx={totalRadius}
				cy={totalRadius}
				r={radius}
				stroke={color}
				fill={color}
				fillOpacity={0.1}
				strokeDasharray={`${arc} ${circle - arc}`}
				strokeDashoffset={circle / 4}
				strokeWidth={8}
				strokeLinecap="round"
			/>
			<text
				fill={color}
				x="50%"
				y="50%"
				dominantBaseline="middle"
				textAnchor="middle"
				alignmentBaseline="central"
				className={`${semiBold.className} text-2xl`}
			>
				{media.toLocaleString()}
			</text>
		</svg>
	);
};

export default MediaCircle;
