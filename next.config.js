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
		return config;
	},
};

module.exports = nextConfig;
