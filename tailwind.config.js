/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte}'],
	theme: {
		extend: {
			animation: {
				'bounce-fast': 'spin 1.5s linear'
			}
		}
	},
	plugins: []
};
