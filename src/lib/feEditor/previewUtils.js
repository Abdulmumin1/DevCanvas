export function injectJavascript(iframeDoc, js) {
	const scriptElement = iframeDoc.createElement('script');
	scriptElement.id = 'mainScript12343REFDS!';
	scriptElement.textContent = `

console.log = function(message) {
// Send the console message to the parent page
window.parent.postMessage({ type: 'console', message: message }, '*');
};

try {

${js}

} catch(err){
console.log(err); 

}`;
	iframeDoc.body.appendChild(scriptElement);
}

import { cdns, fontawesomeLINK, materialiconsLINK, bootstrapLINK } from '$lib/plugins/store.js';

export function constructHtml(current_data) {
	let jsPlugins,
		cssPlugins = [];
	let userImportedJS = current_data.config?.userImportedJS ?? [];

	if (current_data.plugins.length > 0) {
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

	return `
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>${current_data.description}</title>
		<style>
            ${current_data.css}
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
            ${current_data.js}
        </script>
	</body>
</html>`;
}
