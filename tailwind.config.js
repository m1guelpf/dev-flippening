const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				mono: ['"Jetbrains Mono"', ...defaultTheme.fontFamily.mono],
			},
		},
	},
	plugins: [],
}
