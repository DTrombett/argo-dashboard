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
const description =
	"Una dashboard compatta, sicura e di facile utilizzo per gestire il registro elettronico Argo (didUP)";

export const metadata: Metadata = {
	alternates: { canonical: "https://argo-dashboard.vercel.app" },
	applicationName: "Argo Dashboard",
	authors: [{ name: "D Trombett", url: "https://github.com/DTrombett" }],
	creator: "D Trombett",
	description,
	generator: "Next.js",
	icons: "https://argo-dashboard.vercel.app/favicon.ico",
	keywords: ["react", "nextjs", "argo", "registro", "vercel"],
	// manifest
	openGraph: {
		type: "website",
		countryName: "Italy",
		description,
		locale: "it",
		siteName: "Argo Dashboard",
		title: "Argo Dashboard",
		url: "https://argo-dashboard.vercel.app",
		images: "https://argo-dashboard.vercel.app/preview.png",
	},
	publisher: "Vercel",
	title: "Argo Dashboard",
	twitter: {
		card: "summary_large_image",
		description,
		images: "https://argo-dashboard.vercel.app/preview.png",
		creator: "@dtrombett",
		title: "Argo Dashboard",
	},
	verification: { google: "TAmOsVi35BnusH1-Lx2BJLhd3O42orZcSRdGt2QON6A" },
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
