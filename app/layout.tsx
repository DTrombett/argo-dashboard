import ClientProvider from "@/components/dashboard/ClientProvider";
import MenuList from "@/components/menu/MenuList";
import TabIcon from "@/components/menu/TabIcon";
import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Metadata } from "next";
import local from "next/font/local";
import Link from "next/link";
import "tailwindcss/tailwind.css";
import Home from "../icons/home-bianca.svg";
import MenuIcon from "../icons/menu-icon.svg";
import Opzioni from "../icons/opzioni.svg";
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
const poppinsRegular = local({ src: "../fonts/Poppins-Regular.ttf" });
const titleFont = local({ src: "../fonts/Poppins-ExtraBold.ttf" });
const description =
	"Dashboard compatta, sicura e di facile utilizzo per gestire il registro elettronico Argo (didUP)";

export const metadata: Metadata = {
	alternates: { canonical: "https://argo-dashboard.vercel.app" },
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

const RootLayout = ({ children }: { children: React.ReactNode }) => (
	<html lang="it">
		<body
			className={`min-h-screen bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white text-center text-lg ${poppinsRegular.className}`}
		>
			<main className="flex flex-col min-h-screen p-4 items-center">
				<span className={`m-4 text-4xl ${titleFont.className}`}>
					Argo Dashboard
				</span>
				<div className="h-full w-full flex-1 flex flex-col items-center">
					<ClientProvider>
						<div className="fixed lg:top-0 left-0 bottom-0 w-screen lg:w-20 bg-zinc-200 dark:bg-zinc-800 flex flex-row lg:flex-col p-2 rounded-t-2xl lg:rounded-r-2xl lg:rounded-tl-none whitespace-nowrap overflow-auto navigator z-10 hideScrollbar">
							<TabIcon
								name="Home"
								icon={<Home className="invert dark:invert-0" />}
								href="/"
							/>
							<TabIcon
								name="Menu"
								icon={<MenuIcon />}
								className="lg:hidden"
								href="/menu"
							/>
							<TabIcon name="Opzioni" icon={<Opzioni />} href="/options" />
							<MenuList className="hidden lg:flex" />
						</div>
						{children}
					</ClientProvider>
					<Link
						href="https://github.com/DTrombett/argo-dashboard"
						target="_blank"
						className="mt-4 px-1 text-base link"
					>
						<FontAwesomeIcon
							icon={faGithub}
							height={"1rem"}
							className="inline"
						/>{" "}
						Open Source
					</Link>
				</div>
			</main>
		</body>
	</html>
);

export default RootLayout;
