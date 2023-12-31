const LoadingPlaceholder = ({
	children,
	loading = true,
	height,
	width,
	repeat = 1,
}: {
	children?: React.ReactNode;
	loading?: boolean;
	height?: React.CSSProperties["height"];
	width?: React.CSSProperties["width"];
	repeat?: number;
}) =>
	loading
		? new Array<React.ReactElement | null>(repeat)
				.fill(null)
				.map((_, i) => (
					<div
						className="h-6 w-full bg-zinc-200 dark:bg-zinc-800 bg-opacity-50 dark:bg-opacity-50 rounded-2xl my-1 m-auto"
						style={{ height, width }}
						key={i}
					/>
				))
		: children;

export default LoadingPlaceholder;
