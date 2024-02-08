/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte}'],
	darkMode: 'class',
	theme: {
		extend: {
			animation: {
				'bounce-fast': 'spin 1.5s linear'
			},

			colors: {
				// Light Mode BEE3F8
				'sky-light': 'theme(colors.gray.100)',
				primary: '#0e0e0e',
				light: '#e5e7eb',
				'text-light': '#0369A1',
				secondary: '#FFFFFF',
				'text-secondary': '#333333',
				accent: '#F9A8B4',
				'button-bg': '#4D88FF',
				'button-text': '#FFFFFF',
				error: '#FF4D4D',
				success: '#4BB543',

				// Dark Mode
				'sky-dark': '#2C3E50',
				'text-sky-dark': '#BEE3F8',
				'secondary-dark': '#191919',
				'text-secondary-dark': '#FFFFFF',
				'accent-dark': '#FF6B81',
				'button-bg-dark': '#34495E',
				'button-text-dark': '#FFFFFF',
				'error-dark': '#FF4D4D',
				'success-dark': '#4BB543'

				// Add other custom colors as needed...
			}
		}
	},
	plugins: []
};
