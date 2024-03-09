import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()]
	// server: {
	// 	fs: {
	// 		// Allow serving files from the monaco-editor package
	// 		allow: ['..']
	// 	}
	// }

	// optimizeDeps: {
	// 	exclude: [
	// 		'codemirror',
	// 		'@codemirror/language-javascript',
	// 		'@codemirror/language-css',
	// 		'@codemirror/language-html'
	// 	]
	// }
});
