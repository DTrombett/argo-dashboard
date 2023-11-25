import type { Metadata } from "next";
import localFont from "next/font/local";
import "tailwindcss/tailwind.css";
import "./globals.css";

/**
 * - Thin
 * - ExtraLight
 * - Light
 * - Regular
 * - Medium
 * - SemiBold
 * - Bold
 * - ExtraBold
 */
const poppinsRegular = localFont({ src: "../public/Poppins-Regular.ttf" });

export const metadata: Metadata = {
	title: "Argo Dashboard",
	description: "Dashboard per il registro elettronico Argo!",
	authors: [{ name: "D Trombett", url: "https://github.com/DTrombett" }],
	creator: "D Trombett",
	generator: "Next.js",
	publisher: "Vercel",
	other: {
		"google-site-verification": "TAmOsVi35BnusH1-Lx2BJLhd3O42orZcSRdGt2QON6A",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="it">
			<body
				className={`min-h-screen bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white ${poppinsRegular.className}`}
			>
				{children}
			</body>
		</html>
	);
}
