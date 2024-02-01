"use client";
import type { KeyboardEventHandler, MouseEventHandler, ReactNode } from "react";
import { useState } from "react";

const TouchableOpacity = ({
	children,
	className = "",
	additionalClasses = "",
	tabIndex,
	onKeyDown,
	onClick,
}: {
	children: ReactNode;
	className?: string;
	additionalClasses?: string;
	tabIndex?: number;
	onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
	onClick?: MouseEventHandler<HTMLDivElement>;
}) => {
	const [touch, setTouch] = useState(false);

	return (
		<div
			className={`transition ${
				touch ? `opacity-75 ${additionalClasses}` : ""
			} ${className}`}
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

export default TouchableOpacity;
