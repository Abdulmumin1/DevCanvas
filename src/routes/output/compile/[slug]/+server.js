import { cdns, fontawesomeLINK, materialiconsLINK, bootstrapLINK } from '$lib/plugins/store.js';
import { compileSassString } from '$lib/utils.js';

async function constructHtmlForZip(current_data, preview) {
	let jsPlugins,
		cssPlugins = [];
	let userImportedJS = current_data.config?.userImportedJS ?? [];

	if (current_data?.plugins?.length > 0) {
		jsPlugins = current_data.plugins[0].js;
		cssPlugins = current_data.plugins[0].css;
	}

	let cssPlist = [];
	Object.keys(cssPlugins).forEach((element) => {
		if (cssPlugins.fontawesome) {
			cssPlist.push(fontawesomeLINK);
		}
		if (cssPlugins.bootstrap) {
			cssPlist.push(bootstrapLINK);
		}
		if (cssPlugins.materialicons) {
			cssPlist.push(materialiconsLINK);
		}
		if (cssPlugins.tailwind) {
			cssPlist.push('<script src="https://cdn.tailwindcss.com" defer></script>');
		}
	});

	let css = current_data.css;

	if (current_data.config?.cssProcessor) {
		css = await compileSassString(css);
	}
	// console.log(css);
	if (preview) {
		css = css.replaceAll('animation', 'notsupported');
		css = css.replaceAll('transition', 'notsupported');
		css = `
				body{
					overflow:hidden;
					background-color:white;
					width:100%;
					height:100%;
					scale: 0.4;
				}
				* {
					font-size:11px;
				}
				*::-webkit-scrollbar {
					width: 0px;
					
				}${css}
				`;
	}

	return `
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>${current_data.description}</title>
		<style>
            ${css}
        </style>
        ${cssPlist.join('\n')}
	</head>
	<body>
		${current_data.html}
        ${Object.keys(Object.fromEntries(Object.entries(jsPlugins).filter(([k, v]) => v)))
					.map((plugin) => `<script src=${cdns[plugin]}></script>`)
					.join('')}
        ${userImportedJS.map((src) => `<script src=${src}></script>`).join('')}
        <script>
            ${preview ? '' : current_data.js}
        </script>
	</body>
</html>`;
}

/** @type {import('./$types').RequestHandler} */
export async function GET({ url, params, locals: { supabase } }) {
	let slug = params['slug'];

	let preview = url.searchParams.get('p') ?? false;
	// Fetch project data
	const { data, error } = await supabase
		.from('htmlPlayground')
		.select('*')
		.eq('project_key', slug)
		.single();

	if (error || !data) {
		return new Response('Project not found', { status: 404 });
	}
	// console.log(data)

	// Generate HTML from the fetched data

	const html = await constructHtmlForZip(data, preview);

	// Return the HTML as a response
	return new Response(html, {
		headers: {
			'Content-Type': 'text/html'
		}
	});
}
