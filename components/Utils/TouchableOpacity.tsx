"use client";
import type { KeyboardEventHandler, MouseEventHandler, ReactNode } from "react";
import { memo, useState } from "react";

const TouchableOpacity = ({
	children,
	className,
	tabIndex,
	onKeyDown,
	onClick,
}: {
	children: ReactNode;
	className?: string;
	tabIndex?: number;
	onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
	onClick?: MouseEventHandler<HTMLDivElement>;
}) => {
	const [touch, setTouch] = useState(false);

	return (
		<div
			className={`transition ${touch ? "opacity-75 " : ""}${className ?? ""}`}
			onTouchStart={setTouch.bind(null, true)}
			onTouchEnd={setTouch.bind(null, false)}
			tabIndex={tabIndex}
			onKeyDown={onKeyDown}
			onClick={onClick}
		>
			{children}
		</div>
	);
};

export default memo(TouchableOpacity);
