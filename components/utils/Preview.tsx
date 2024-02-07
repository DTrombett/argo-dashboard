import type { StaticImageData } from "next/image";
import Image from "next/image";

const Preview = ({
	src,
	className,
}: {
	src: StaticImageData;
	className: string;
}) => (
	<Image
		alt="Preview"
		src={src}
		sizes="50vw"
		placeholder="blur"
		className={`${className} h-auto`}
		style={{ width: "50vw" }}
	/>
);

export default Preview;
