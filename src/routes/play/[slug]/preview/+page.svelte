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
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import ShareAct from '$components/shareAct.svelte';
	import ShareDropdown from '../../../../components/fePlayground/shareDropdown.svelte';
	export let data;

	let iframe;
	let link;
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
		console.log('done with the plugins');
	}

	function injectUserImportedPlugins(iframeDoc, userImportedJSVar) {
		for (let index = 0; index < userImportedJSVar.length; index++) {
			const scriptsrc = userImportedJSVar[index];
			let scptag = iframeDoc.createElement('script');
			scptag.src = scriptsrc;
			iframeDoc.body.appendChild(scptag);
		}
	}

	let zoomOut = $page.url.searchParams.get('preview');

	onMount(async () => {
		// Initialize the iframe with the default HTML code
		if (iframe) {
			let iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

			const bodyContent = data.details.html;
			if (zoomOut) {
				iframeDoc.body.style.scale = 0.4;
			}
			iframeDoc.body.innerHTML = bodyContent;

			// Step 2: Create and append the CSS style
			const styleElement = iframeDoc.createElement('style');

			let css = data.details.css;

			if (data.details.config?.cssProcessor) {
				css = await compileSassString(css);
			}
			// console.log(css);
			if (zoomOut) {
				css = css.replaceAll('animation', 'notsupported');
				css = css.replaceAll('transition', 'notsupported');
				styleElement.textContent = `
				body{
					overflow:hidden;
					background-color:white;
					width:100%;
					height:100%;
				}
				* {
					font-size:11px;
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
				injectJSPlugins(iframeDoc, data.details.plugins[0].js);
				// Step 3: Create and append JavaScript code
				injectCSSPlugins(iframeDoc, data.details.plugins[0].css);
				injectUserImportedPlugins(iframeDoc, data.details.config?.userImportedJS ?? []);
			}
		}

		link = window.location.href;
	});
	afterNavigate(() => {
		// console.log('which is fist');
		if (!zoomOut) {
			setTimeout(() => {
				let es = document.createElement('div');
				let iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
				iframeDoc.body.appendChild(es);
				// console.log('me');
				let js = data.details.js;
				const scriptElement = iframeDoc.createElement('script');
				scriptElement.textContent = `${js}`;
				iframeDoc.body.appendChild(scriptElement);
			}, 500);
		}
	});
</script>

<svelte:head>
	<title>{data.details.description}</title>
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
	<div class="absolute bottom-0 right-0 m-2 flex items-center justify-center gap-2">
		<a href="./" class=" flex items-center gap-2 rounded-xl bg-secondary-dark p-2">
			<span
				><img
					height="16px"
					width="16px"
					alt=""
					style="filter: grayscale(100);"
					src="/logo.svg"
				/></span
			> <span class="hidden text-gray-100 md:block">Editor View</span>
		</a>

		<div class="rounded-full bg-secondary-dark p-3 text-gray-100">
			<ShareAct {link} title={data.details.description} />
		</div>

		<!-- <ShareDropdown /> -->
	</div>
{/if}
