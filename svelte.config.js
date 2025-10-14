import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
// import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

import { mdsvex } from 'mdsvex';
import { codeToHtml } from 'shiki';

/** @type {import('@sveltejs/kit').Config} */

const mdsvexConf = {
	extensions: ['.md'],
	highlight: {
		highlighter: async (code, lang = 'text') => {
			// const highlighter = await shiki.getHighlighter({
			// 	theme: 'github-dark'
			// });
			const html = await codeToHtml(code, {
				lang,
				themes: { dark: 'andromeeda', light: 'catppuccin-latte' }
			});
			return `{@html \`${html}\`}`;
		}
	}
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		alias: {
			$components: 'src/components'
		}
	},

	extensions: ['.svelte', '.md'],
	preprocess: [vitePreprocess(), mdsvex(mdsvexConf)]
};

export default config;
