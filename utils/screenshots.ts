/* eslint-disable node/no-unpublished-import */
import {
	chromium,
	devices,
	selectors,
	type BrowserContextOptions,
} from "playwright";
import localStorage from "./localStorage.json" assert { type: "json" };

console.time("Screenshots");
selectors.setTestIdAttribute("id");
const url = "http://localhost:3000";
const schemes = ["light", "dark"] as const;
const viewports: Record<string, (typeof devices)[string]> = {
	default: devices["iPhone 14 Pro Max"],
	sm: devices["Galaxy Tab S4"],
	md: devices["iPad (gen 5)"],
	lg: devices["iPad (gen 5) landscape"],
	xl: { ...devices["Desktop Chrome"], deviceScaleFactor: 1.5 },
	"2xl": {
		...devices["Desktop Chrome HiDPI"],
		viewport: { width: 1536, height: 864 },
	},
};
const baseOptions: BrowserContextOptions = {
	baseURL: url,
	storageState: {
		origins: [
			{
				origin: url,
				localStorage: Object.entries(localStorage).map(([name, value]) => ({
					name,
					value: JSON.stringify(value),
				})),
			},
		],
		cookies: [],
	},
};
const browser = await chromium.launch();

await Promise.all(
	Object.keys(viewports).flatMap((viewport) =>
		schemes.map(async (colorScheme) => {
			const page = await browser.newPage({
				...baseOptions,
				...viewports[viewport],
				colorScheme,
			});

			await page
				.context()
				.route(
					new RegExp(
						`^(?:(?!${url.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")}).)*$`
					),
					(route) => route.abort()
				);
			await page.goto("/dashboard");
			await page.getByTestId("dismissLoginWarning").click();
			await page.getByTestId("title").hover();
			await page.screenshot({
				animations: "disabled",
				path: `../../public/previews/${viewport}-${colorScheme}.png`,
			});
		})
	)
);
await browser.close();
console.timeEnd("Screenshots");
