import { memo, useLayoutEffect, useRef } from "react";

const duration = 1_000;

const Canvas = ({ media = 0 }: { media?: number }) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useLayoutEffect(() => {
		const { current: canvas } = canvasRef;

		if (!canvas) return;
		const context = canvas.getContext("2d");

		if (!context) return;
		context.lineWidth = 10;
		context.strokeStyle =
			media >= 6 ? "limegreen" : media >= 5 || media === 0 ? "orange" : "red";
		let start;

		const callback = (timeStamp: number): void => {
			const elapsed = timeStamp - (start ??= timeStamp);

			context.clearRect(0, 0, canvas.width, canvas.height);
			context.beginPath();
			context.arc(
				canvas.width / 2,
				canvas.height / 2,
				canvas.width / 2.5,
				-0.5 * Math.PI,
				((((media || 10) / 5) * Math.PI) / duration) *
					Math.min(elapsed, duration) -
					0.5 * Math.PI
			);
			context.stroke();
			if (elapsed < duration) requestAnimationFrame(callback);
		};
		requestAnimationFrame(callback);
	}, [media]);
	return <canvas ref={canvasRef} width={125} height={125} />;
};

export default memo(Canvas);
