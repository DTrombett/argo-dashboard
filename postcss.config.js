module.exports = {
	plugins: {
		"postcss-flexbugs-fixes": {},
		"postcss-preset-env": {
			autoprefixer: {
				flexbox: "no-2009",
			},
			stage: 3,
			features: {
				"custom-properties": false,
			},
		},
		"@fullhuman/postcss-purgecss": {
			content: ["./**/*.{js,jsx,ts,tsx}"],
			defaultExtractor: (/** @type {string} */ content) =>
				content.match(/[\w-/:]+(?<!:)/g) || [],
			safelist: ["html", "body"],
		},
		"tailwindcss": {},
		"autoprefixer": {},
	},
};
