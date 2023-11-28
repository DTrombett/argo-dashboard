/** @type {import('next').NextConfig} */
const nextConfig = {
	/**
	 * @param {import("webpack").Configuration} config
	 * @returns
	 */
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
};

module.exports = nextConfig;
