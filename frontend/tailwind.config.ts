import type { Config } from "tailwindcss";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const flowbite = require("flowbite-react/tailwind");

export default {
	content: [
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
		flowbite.content(),
	],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
			},
			fontFamily: {
				"geist-sans": 'var(--font-geist-sans)',
				"geist-mono": 'var(--font-geist-mono)',
				"bakbak": 'var(--font-bakbak)',
			}
		},
	},
	plugins: [
		require('flowbite/plugin'),
		flowbite.plugin(),
	],
} satisfies Config;
