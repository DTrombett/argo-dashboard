import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "tailwindcss/tailwind.css";
import "./globals.css";

const font = Noto_Sans({
	weight: "400",
	subsets: ["latin"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "Registro",
	description: "Utilità per il registro elettronico Argo!",
	authors: [{ name: "D Trombett", url: "https://github.com/DTrombett" }],
	creator: "D Trombett",
	generator: "Next.js",
	publisher: "Vercel",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="it">
			<body
				className={`h-screen bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white ${font.className}`}
			>
				{children}
			</body>
		</html>
	);
}
