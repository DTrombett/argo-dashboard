"use client";
import { useEffect, useRef } from "react";

const Canvas = ({ media }: { media: number }) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const { current: canvas } = canvasRef;

		if (!canvas) return;
		const context = canvas.getContext("2d");

		if (!context) return;
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.beginPath();
		context.arc(
			canvas.width / 2,
			canvas.height / 2,
			canvas.width / 3,
			-0.5 * Math.PI,
			(media / 5 - 0.5) * Math.PI
		);
		context.lineWidth = 10;
		context.strokeStyle = "limegreen";
		context.stroke();
	}, [media]);
	return <canvas ref={canvasRef} width={150} height={150} />;
};

export default Canvas;
