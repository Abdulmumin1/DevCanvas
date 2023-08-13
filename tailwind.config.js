/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte}'],
	theme: {
		extend: {
			animation: {
				'spin-fast': 'spin .2s linear'
			}
		}
	},
	plugins: []
};
