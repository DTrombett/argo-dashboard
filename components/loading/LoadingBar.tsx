import { memo } from "react";

const LoadingBar = () => (
	<div className="absolute h-2 bottom-0 bg-cyan-400 loading" />
);

export default memo(LoadingBar);
