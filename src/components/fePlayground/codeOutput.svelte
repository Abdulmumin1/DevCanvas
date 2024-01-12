<script>
	import { current_data } from '$lib/index.js';
	import {
		jsChanged,
		cssPlugins,
		jsPlugins,
		sassActive,
		userImportedJS
	} from '$lib/feEditor/store.js';
	import {
		fontawesomeLINK,
		materialiconsLINK,
		bootstrapLINK,
		setup_js_plugin,
		injectHeadContent
	} from '$lib/plugins/store.js';
	import { injectJavascript } from '$lib/feEditor/previewUtils.js';

	import { onDestroy, onMount, tick } from 'svelte';
	import { compileSassString } from '$lib/utils.js';
	import { delayPreview } from '$lib/index.js';

	import { beforeNavigate, afterNavigate } from '$app/navigation';

	export let code;
	export let css;
	export let js;

	var currentJS;
	var currentCSS;

	let iframe;
	let typingTimer; // Timer to track typing
	let cssPluginsVar = $cssPlugins;
	let jsPluginsVar = $jsPlugins;
	let userImportedJSVar = $userImportedJS;
	let loading = true;
	let typingTimerCSS;
	var INJ_CSS;
	let delayPRTimer;

	function injectHtmlCSS(iframeDoc, code, css) {
		const bodyContent = code;
		iframeDoc.body.innerHTML = bodyContent;

		// Step 1: Remove any existing <style> elements
		const existingStyles = iframeDoc.getElementsByTagName('style');
		for (const style of existingStyles) {
			style.remove();
		}

		// Step 2: Create and append the new CSS style
		const styleElement = iframeDoc.createElement('style');

		if (currentCSS != css && $sassActive) {
			// console.log('logic confirmed');
			// console.log(INJ_CSS);
			styleElement.textContent = `${INJ_CSS}`;
			iframeDoc.head.appendChild(styleElement);
			ProcessCSs(iframeDoc);
		} else if (currentCSS == css && $sassActive) {
			styleElement.textContent = `${INJ_CSS}`;
			iframeDoc.head.appendChild(styleElement);
		} else if (currentCSS != css && !$sassActive) {
			styleElement.textContent = `${css}`;
			iframeDoc.head.appendChild(styleElement);
			// console.log('plain');
		}
		// console.log(INJ_CSS);

		// Function to handle text input
		// console.log(currentJS, js);

		injectJavascript(iframeDoc, js);
	}

	function ProcessCSs(iframeDoc) {
		const delay = 1000;
		clearTimeout(typingTimerCSS);

		const styleElement = iframeDoc.createElement('style');
		typingTimerCSS = setTimeout(async () => {
			INJ_CSS = await compileSassString(css);
			console.log(INJ_CSS);
			styleElement.textContent = `${INJ_CSS}`;
			console.log('game');
			iframeDoc.head.appendChild(styleElement);
		}, delay);
		currentCSS = css;
	}
	function injectHtmlCSSOnReload(iframeDoc, code, css) {
		const bodyContent = code;
		iframeDoc.body.innerHTML = bodyContent;

		// Step 1: Remove any existing <style> elements
		const existingStyles = iframeDoc.getElementsByTagName('style');
		for (const style of existingStyles) {
			style.remove();
		}

		// Step 2: Create and append the new CSS style
		const styleElement = iframeDoc.createElement('style');

		if (currentCSS != css && $sassActive) {
			console.log('logic confirmed');
			// console.log(INJ_CSS);
			styleElement.textContent = `${INJ_CSS}`;
			iframeDoc.head.appendChild(styleElement);
			ProcessCSs(iframeDoc);
		} else if (currentCSS == css && $sassActive) {
			styleElement.textContent = `${INJ_CSS}`;
			iframeDoc.head.appendChild(styleElement);
		} else if (currentCSS != css && !$sassActive) {
			styleElement.textContent = `${css}`;
			iframeDoc.head.appendChild(styleElement);
			// console.log('plain');
		}
	}

	function injectUserImportedPlugins(iframeDoc, userImportedJSVar) {
		for (let index = 0; index < userImportedJSVar.length; index++) {
			const scriptsrc = userImportedJSVar[index];
			let scptag = iframeDoc.createElement('script');
			scptag.src = scriptsrc;
			iframeDoc.body.appendChild(scptag);
		}
	}

	function injectJSPlugins(iframeDoc, jsPluginsVar) {
		jsPluginsVar = $jsPlugins;

		let array = Object.keys(jsPluginsVar);
		console.log(array);
		// console.log(array);
		for (let index = 0; index < array.length; index++) {
			setup_js_plugin(array[index], jsPluginsVar, iframeDoc);
		}
	}

	// $: {
	// 	code = $current_data.html;
	// 	css = $current_data.css;
	// 	js = $current_data.js;
	// 	cssPluginsVar = $cssPlugins;
	// 	jsPluginsVar = $jsPlugins;
	// 	userImportedJSVar = $userImportedJS ?? [];
	// 	jsPluginsVar = $jsPlugins;

	// 	console.log('go shit');
	// 	if (iframe) {
	// 		console.log(iframe.contentDocument.body.innerHTML);
	// 		iframe.contentWindow.location.reload(true);
	// 		addLoadEvent();
	// 	}
	// }
	$: {
		// await tick();
		cssPluginsVar = $cssPlugins;
		if (iframe) {
			let iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
			injectHeadContent(cssPluginsVar, iframeDoc);
		}
	}

	$: {
		// await tick();
		code = $current_data.html;
		css = $current_data.css;
		js = $current_data.js;

		// js = $current_data.js;
		if (iframe) {
			// Get the iframe's document
			let iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
			// Step 3: Remove any existing <script> elements
			// const existingScripts = iframeDoc.getElementsByTagName('script');
			// for (const script of existingScripts) {
			// 	script.remove();
			// }

			injectHtmlCSS(iframeDoc, code, css);
		}

		// console.log('changesing');
	}

	$: {
		// await tick();
		jsPluginsVar = $jsPlugins;
		if (iframe) {
			let iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

			injectJSPlugins(iframeDoc, jsPluginsVar);
		}
	}

	$: {
		// await tick();
		userImportedJSVar = $userImportedJS ?? [];
		if (iframe) {
			let iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

			injectUserImportedPlugins(iframeDoc, userImportedJSVar);
		}
	}

	$: {
		// await tick();
		// console.log(curren)
		if (currentJS != js) {
			const delay = 1000; // Adjust the delay as needed (in milliseconds)
			clearTimeout(typingTimer); // Clear the previous timer

			typingTimer = setTimeout(function () {
				// This function will run after the delay (user has stopped typing)

				currentJS = js;
				if (iframe) {
					iframe.contentWindow.location.reload(true);
					addLoadEvent();
				}
			}, delay);
		}
	}

	var c = 0;
	function addLoadEvent() {
		console.log('reloaded ', c);
		iframe.onload = function () {
			c += 1;
			// currentCSS = null;
			// currentJS = null;
			let iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
			injectHeadContent(cssPluginsVar, iframeDoc);
			injectHtmlCSSOnReload(iframeDoc, code, css);
			injectUserImportedPlugins(iframeDoc, userImportedJSVar);
			injectJSPlugins(iframeDoc, jsPluginsVar);
			injectJavascript(iframeDoc, js);
			loading = false;
			// console.log(currentJS, js);

			setTimeout(() => {
				current_data.update((cur) => {
					return { ...cur, html: `${cur.html}  ` };
				});
				// console.log('injjected html');
			}, 500);
			// console.log('boom');
			return false;
		};
	}

	onMount(() => {
		setTimeout(() => {
			current_data.update((cur) => {
				return { ...cur, js: `${cur.js}   ` };
			});
			// console.log()
		}, 1000);
		currentCSS = null;
		currentJS = null;
	});

	// afterNavigate(()=>)
</script>

<div
	class="bg-white m-0 p-0 border-t md:border-l dark:border-primary border-gray-300 w-full h-full text-black dark:text-white"
>
	<iframe bind:this={iframe} title="preview" id="preview-frame" class="w-full h-full" />
</div>
