/** @type {import('tailwindcss').Config} */
module.exports = {
	prefix: 'tw-',
	important: false,
	content: [
		"**/*.{html, jsx, js}",
		"**/*.js",
		"**/*.html",
	],
	theme: {
		extend: {
			colors: {
				primary: "#BE3345"
                'RMcolor1': "#30383F"
                'RMcolor2': "#738595"
                'RMcolor3': "#ECA400"
			}
		},
	},
	plugins: [],
}

