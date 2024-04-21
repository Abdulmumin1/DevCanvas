import { cdns, fontawesomeLINK, materialiconsLINK, bootstrapLINK } from '$lib/plugins/store.js';

export function constructHtmlForZip(current_data) {
	let jsPlugins,
		cssPlugins = [];
	let userImportedJS = current_data.config?.userImportedJS ?? [];

	console.log(userImportedJS);
	if (current_data.plugins.length > 0) {
		jsPlugins = current_data.plugins[0].js;
		cssPlugins = current_data.plugins[0].css;
	}

	let cssPlist = [];
	Object.keys(cssPlugins).forEach((element) => {
		// console.log(element);
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

	return `
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>${current_data.description}</title>
		<link rel="stylesheet" href="style.css">
        ${cssPlist.join('\n')}
	</head>
	<body>
		${current_data.html}
        ${Object.keys(Object.fromEntries(Object.entries(jsPlugins).filter(([k, v]) => v)))
					.map((plugin) => `<script src=${cdns[plugin]}></script>`)
					.join('')}
            ${userImportedJS.map((src) => `<script src=${src}></script>`).join('')}
        <script src="script.js"></script>
	</body>
</html>`;
}
