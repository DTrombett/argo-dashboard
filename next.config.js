/** @type {import('next').NextConfig} */
const nextConfig = {
	/**
	 *
	 * @param {import("webpack").Configuration} config
	 * @returns
	 */
	webpack: (config, { isServer }) => {
		if (!isServer)
			config.externals = [
				...config.externals,
				({ context, request }, callback) => {
					if (context?.includes("portaleargo-api"))
						return callback(null, `"${request}"`);
					return callback();
				},
			];
		return config;
	},
};

module.exports = nextConfig;
