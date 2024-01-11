/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config, { isServer }) => {
		if (!isServer)
			config.externals = [
				...config.externals,
				({ context, request }, callback) =>
					context?.includes("portaleargo-api")
						? callback(null, `"${request}"`)
						: callback(),
			];
		const fileLoaderRule = config.module?.rules?.find(
			(rule) =>
				rule &&
				typeof rule === "object" &&
				"test" in rule &&
				rule.test &&
				typeof rule.test === "object" &&
				"test" in rule.test &&
				rule.test?.test?.(".svg")
		);

		config.module?.rules?.push(
			{
				...fileLoaderRule,
				test: /\.svg$/i,
				resourceQuery: /url/, // *.svg?url
			},
			{
				test: /\.svg$/i,
				issuer: fileLoaderRule.issuer,
				resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
				use: ["@svgr/webpack"],
			}
		);
		fileLoaderRule.exclude = /\.svg$/i;
		return config;
	},
	headers: async () => [
		{
			source: "/:path*",
			headers: [
				{ key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
				{ key: "X-Frame-Options", value: "SAMEORIGIN" },
				{ key: "X-Content-Type-Options", value: "nosniff" },
				{ key: "X-XSS-Protection", value: "0" },
			],
		},
	],
};

module.exports = nextConfig;
