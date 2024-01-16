const cspHeader = `
  default-src 'none';
	connect-src 'self' www.portaleargo.it;
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data:;
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'self';
  block-all-mixed-content;
  upgrade-insecure-requests;
`;

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
	headers:
		process.env.NODE_ENV === "development"
			? undefined
			: async () => [
					{
						source: "/(.*)",
						headers: [
							{
								key: "Content-Security-Policy",
								value: cspHeader.replace(/\n/g, ""),
							},
							{ key: "X-Frame-Options", value: "SAMEORIGIN" },
							{ key: "X-Content-Type-Options", value: "nosniff" },
							{ key: "X-XSS-Protection", value: "1" },
						],
					},
			  ],
};

module.exports = nextConfig;
