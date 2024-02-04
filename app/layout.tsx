import AppName from "@/components/utils/AppName";
import Version from "@/components/utils/Version";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Metadata } from "next";
import Link from "next/link";
import "tailwindcss/tailwind.css";
import { extraBold, regular } from "./fonts";
import "./globals.css";

const description =
	"Dashboard compatta, sicura e di facile utilizzo per gestire il registro elettronico Argo (DidUP)";

export const metadata: Metadata = {
	alternates: {
		canonical: "https://argo-dashboard.vercel.app",
		types: { beta: "https://argo-dashboard-git-beta-dtrombett.vercel.app" },
	},
	applicationName: "Argo Dashboard",
	authors: [{ name: "D Trombett", url: "https://github.com/DTrombett" }],
	creator: "D Trombett",
	description,
	generator: "Next.js",
	icons: "/favicon.ico",
	keywords: ["react", "nextjs", "argo", "registro", "vercel"],
	// TODO: manifest
	metadataBase: new URL("https://argo-dashboard.vercel.app"),
	openGraph: {
		type: "website",
		countryName: "Italy",
		description,
		locale: "it",
		siteName: "Argo Dashboard",
		title: "Argo Dashboard",
		url: "https://argo-dashboard.vercel.app",
		images: "/preview.png",
	},
	publisher: "Vercel",
	title: "Argo Dashboard",
	twitter: {
		card: "summary_large_image",
		description,
		images: "/preview.png",
		creator: "@dtrombett",
		title: "Argo Dashboard",
	},
	verification: { google: "TAmOsVi35BnusH1-Lx2BJLhd3O42orZcSRdGt2QON6A" },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
	<html lang="it">
		<body
			className={`min-h-screen bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white text-center text-lg ${regular.className}`}
		>
			<main className="flex flex-col min-h-screen p-4 items-center">
				<span className={`m-4 text-4xl ${extraBold.className}`} id="title">
					<AppName />
				</span>
				<div className="h-full w-full flex-1 flex flex-col items-center">
					{children}
					<div className="mt-4 text-base">
						<Link
							href="https://github.com/DTrombett/argo-dashboard"
							target="_blank"
							className="px-2 link"
						>
							<FontAwesomeIcon
								icon={faGithub}
								height={"1rem"}
								className="inline"
							/>{" "}
							Open Source
						</Link>
						<Version />
					</div>
				</div>
			</main>
		</body>
	</html>
);

export default RootLayout;
