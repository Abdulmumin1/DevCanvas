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
import { compileSassString } from '$lib/utils.js';

export async function constructHtml(current_data, preview = false) {
	let jsPlugins = [];
	let cssPlugins = [];
	let userImportedJS = current_data?.config?.userImportedJS ?? [];

	if (current_data?.plugins?.length > 0) {
		jsPlugins = current_data.plugins[0].js;
		cssPlugins = current_data.plugins[0].css;
	}
	let cssPlist = [];
	// console.log(cssPlugins)
	let setf = new Set(Object.keys(cssPlugins));
	// console.log("Plugins", setf)
	setf.forEach((element) => {
		// console.log(element)
		if (element == 'fontawesome' && cssPlugins.fontawesome) {
			cssPlist.push(fontawesomeLINK);
		}
		if (element == 'bootstrap' && cssPlugins.bootstrap) {
			cssPlist.push(bootstrapLINK);
		}
		if (element == 'materialicons' && cssPlugins.materialicons) {
			cssPlist.push(materialiconsLINK);
		}
		if (element == 'tailwind' && cssPlugins.tailwind) {
			cssPlist.push('<script src="https://cdn.tailwindcss.com" defer></script>');
		}
	});

	let css = current_data.css;

	if (current_data?.config?.cssProcessor) {
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

	let previewjs = `
		(()=> {
			if (window.location === window.parent.location){
				const urlParams = new URLSearchParams(window.location.search);
				const p = urlParams.get('p');
				if (p){
				window.location.href = window.location.protocol + '//' + window.location.host + window.location.pathname
				}
			}

})()
	`

	return `
	<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>${current_data.description}</title>
		<style>
            ${css}
        </style>
		<script
			defer
			type="text/javascript"
			src="https://cdn.littlestats.click/embed/cnvkg2la9w6k0yx"
		></script>
		${Object.keys(Object.fromEntries(Object.entries(jsPlugins).filter(([k, v]) => v)))
			.map((plugin) => `<script src=${cdns[plugin]}></script>\n`)
			.join('')}
${userImportedJS.map((src) => `<script src=${src}></script>\n`).join('')}
        ${cssPlist.join('\n')}
	</head>
	<body>
		${current_data.html}
		
        <script>
            ${preview ? previewjs : current_data.js}
        </script>
	</body>
</html>`;
}
/**
 * 
 * 
 */