<script context="module">
	export const layout = null; // or false
</script>

<script>
	import { onMount } from 'svelte';
	import { compileSassString } from '$lib/utils.js';
	import {
		fontawesomeLINK,
		materialiconsLINK,
		bootstrapLINK,
		setup_js_plugin
	} from '$lib/plugins/store.js';
	import { page } from '$app/stores';
	export let data;

	let iframe;
	function injectCSSPlugins(iframeDoc, cssPluginsVar) {
		const tailwindScriptHTML = iframeDoc.getElementById('tailwincssDSFE4o431!!');
		const fontawesomeHTML = iframeDoc.getElementById('fontawesomeDSFE4o431!!');
		const materialiconsHTML = iframeDoc.getElementById('materialiconsDSFE4o431!!');
		const bootstrapHTML = iframeDoc.getElementById('bootstrapDSFE4o431!!');

		if (cssPluginsVar.fontawesome) {
			// Create a temporary HTML element
			const tempElement = document.createElement('div');

			// Set the HTML code as text
			tempElement.innerHTML = fontawesomeLINK;
			// Extract the first child element (the <link> element) from the temporary element
			let fontawesome = tempElement.firstElementChild;

			// check if it exists

			if (!fontawesomeHTML) {
				iframeDoc.head.appendChild(fontawesome);
			}
		} else {
			if (fontawesomeHTML) {
				fontawesomeHTML.remove();
			}
		}

		if (cssPluginsVar.bootstrap) {
			// Create a temporary HTML element
			const tempElement = document.createElement('div');

			// Set the HTML code as text
			tempElement.innerHTML = bootstrapLINK;
			// Extract the first child element (the <link> element) from the temporary element
			let bootstrap = tempElement.firstElementChild;

			// check if it exists

			if (!bootstrapHTML) {
				iframeDoc.head.appendChild(bootstrap);
			}
		} else {
			if (bootstrapHTML) {
				bootstrapHTML.remove();
			}
		}

		if (cssPluginsVar.materialicons) {
			// Create a temporary HTML element
			const tempElement = document.createElement('div');

			// Set the HTML code as text
			tempElement.innerHTML = materialiconsLINK;
			// Extract the first child element (the <link> element) from the temporary element
			let materialicons = tempElement.firstElementChild;
			materialicons.id = 'materialiconsDSFE4o431!!';

			// check if it exists
			if (!materialiconsHTML) {
				iframeDoc.head.appendChild(materialicons);
			}
		} else {
			if (materialiconsHTML) {
				materialiconsHTML.remove();
			}
		}

		if (cssPluginsVar.tailwind) {
			const tailwindScript = iframeDoc.createElement('script');
			tailwindScript.src = 'https://cdn.tailwindcss.com';
			tailwindScript.id = 'tailwincssDSFE4o431!!';

			if (!tailwindScriptHTML) {
				iframeDoc.body.appendChild(tailwindScript);
			}
		} else {
			if (tailwindScriptHTML) {
				tailwindScriptHTML.remove();
			}
		}

		console.log('inject output');
	}
	function injectJSPlugins(iframeDoc, jsPluginsVar) {
		let array = Object.keys(jsPluginsVar);
		console.log(array);
		// console.log(array);
		for (let index = 0; index < array.length; index++) {
			setup_js_plugin(array[index], jsPluginsVar, iframeDoc);
		}
	}

	let zoomOut = $page.url.searchParams.get('preview');

	onMount(async () => {
		// Initialize the iframe with the default HTML code
		if (iframe) {
			let iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

			const bodyContent = data.details.html;
			if (zoomOut) {
				iframeDoc.body.style.scale = 0.3;
			}
			iframeDoc.body.innerHTML = bodyContent;

			// Step 2: Create and append the CSS style
			const styleElement = iframeDoc.createElement('style');

			let css = data.details.css;

			if (data.details.config?.cssProcessor) {
				console.log('ok');
				css = await compileSassString(css);
			}
			// console.log(css);
			if (zoomOut) {
				styleElement.textContent = `
				body{
					overflow:hidden;
					background-color:white;
					width:100%;
					height:100%;
				}
				*::-webkit-scrollbar {
					width: 0px;
					
				}${css}
				`;
			} else {
				styleElement.textContent = css;
			}

			iframeDoc.head.appendChild(styleElement);

			if (!zoomOut) {
				// Step 3: Create and append JavaScript code
				let js = data.details.js;
				injectJSPlugins(iframeDoc, data.details.plugins[0].js);
				injectCSSPlugins(iframeDoc, data.details.plugins[0].css);
				const scriptElement = iframeDoc.createElement('script');
				scriptElement.textContent = `${js}`;
				iframeDoc.body.appendChild(scriptElement);
			}
		}
	});
</script>

<svelte:head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

<iframe
	class="h-[100dvh] w-full bg-white"
	src=""
	title="preview"
	frameborder="0"
	bind:this={iframe}
/>
{#if !zoomOut}
	<a
		href="./"
		class="absolute bottom-0 right-0 m-2 bg-secondary-dark flex gap-2 items-center p-2 rounded-xl"
	>
		<span
			><img
				height="16px"
				width="16px"
				alt=""
				style="filter: grayscale(100);"
				src="/logo.svg"
			/></span
		> <span class="hidden md:block text-gray-100">Editor View</span>
	</a>
{/if}
