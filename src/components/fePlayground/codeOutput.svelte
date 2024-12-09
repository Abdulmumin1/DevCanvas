<script>
	import { current_data } from '$lib/index.js';
	import {
		cssPlugins,
		jsPlugins,
		showLoginToSave,
		sassActive,
		userImportedJS
	} from '$lib/feEditor/store.js';
	import { hide_css, hide_js } from '$lib/editor/settings.js';

	import { setup_js_plugin, loadScriptFromURL, injectHeadContent } from '$lib/plugins/store.js';
	import { injectJavascript } from '$lib/feEditor/previewUtils.js';
	import { onDestroy, onMount } from 'svelte';
	import { compileSassString } from '$lib/utils.js';

	export let htmlCode;
	export let cssCode;
	export let jsCode;
	export let useSassEmbed = false;

	let previewIframe;
	let currentCSS = null;
	let currentJS = null;
	let isLoading = true;
	let sassCompilationTimer;
	let compiledSassCSS = '';

	const injectHtmlAndCSS = (iframeDoc) => {
		const bodyContent = htmlCode;
		iframeDoc.querySelector('body').innerHTML = '';

		iframeDoc.body.innerHTML = bodyContent;
		iframeDoc.querySelectorAll('style').forEach((element) => (element.textContent = ''));

		iframeDoc.querySelectorAll('style').forEach((element) => element.remove());

		if (!$hide_css) {
			if (!wait) {
				// console.log('no wait');
				const styleElement = iframeDoc.createElement('style');

				if (currentCSS !== cssCode && ($sassActive || useSassEmbed)) {
					styleElement.textContent = compiledSassCSS;
					iframeDoc.head.appendChild(styleElement);
					compileSassCode(iframeDoc);
				} else if (currentCSS !== cssCode && !($sassActive || useSassEmbed)) {
					styleElement.textContent = cssCode;
					iframeDoc.head.appendChild(styleElement);
				}
			} else {
				const styleElement = iframeDoc.createElement('style');
				styleElement.textContent = `
				*{
					display:none !important;
				}
				`;

				iframeDoc.head.appendChild(styleElement);
			}
		}

		if (!$hide_js) {
			injectJavascript(iframeDoc, jsCode);
		}
	};

	const compileSassCode = (iframeDoc) => {
		clearTimeout(sassCompilationTimer);
		sassCompilationTimer = setTimeout(async () => {
			compiledSassCSS = await compileSassString(cssCode);
			const styleElement = iframeDoc.createElement('style');
			styleElement.textContent = compiledSassCSS;
			iframeDoc.head.appendChild(styleElement);
			if (!wait) {
				currentCSS = cssCode;
			}
		}, 1000);
	};

	const injectPlugins = (iframeDoc) => {
		injectHeadContent($cssPlugins, iframeDoc);
		injectJSPlugins(iframeDoc, $jsPlugins);
		injectUserImportedPlugins(iframeDoc, $userImportedJS ?? []);
	};

	const injectUserImportedPlugins = (iframeDoc, importedJS) => {
		// importedJS;
		importedJS.forEach((scriptSource) => {
			const hashFunction = (str) => {
				let hash = 0;
				for (let i = 0; i < str.length; i++) {
					hash = (hash << 5) - hash + str.charCodeAt(i);
					hash |= 0;
				}
				return hash;
			};

			const id = hashFunction(scriptSource);
			const scriptExists = iframeDoc.getElementById(id);

			if (!scriptExists) {
				loadScriptFromURL(scriptSource, iframeDoc, id)
					.then(() => console.log('Script loaded successfully'))
					.catch((error) => console.error('Failed to load script:', error));
			}
		});
	};

	const injectJSPlugins = (iframeDoc, jsPlugins) => {
		Object.keys(jsPlugins).forEach((pluginName) => {
			setup_js_plugin(pluginName, jsPlugins, iframeDoc);
		});
	};

	const updatePreview = () => {
		if (previewIframe) {
			const iframeDoc = previewIframe.contentDocument || previewIframe.contentWindow.document;
			injectHtmlAndCSS(iframeDoc);
			injectPlugins(iframeDoc);
			isLoading = false;
		}
	};

	const handleIframeLoad = () => {
		updatePreview();

		// const cssPluginsActive = Object.values($cssPlugins).some(Boolean);
		// const jsPluginsActive = Object.values($jsPlugins).some(Boolean);
		// const userLibrariesImported = $userImportedJS ? $userImportedJS.length > 0 : false;

		// if (!wait) {
		setTimeout(() => {
			current_data.update((cur) => ({ ...cur, html: `${cur.html}  ` }));
			showLoginToSave.set(false);
		}, 1000);
		// }
	};

	const triggerJSUpdate = () => {
		setTimeout(() => {
			current_data.update((cur) => ({ ...cur, js: `${cur.js}   ` }));
			showLoginToSave.set(false);
		}, 1000);
	};

	let wait = true;

	function specialUpdate() {
		if (!wait) {
			updatePreview();
		}
	}
	$: {
		htmlCode = $current_data?.html ?? '';
		cssCode = $current_data?.css ?? '';
		jsCode = $current_data?.js ?? '';
		specialUpdate();
	}

	$: currentJS !== jsCode && handleIframeReload();


	const handleIframeReload = () => {
		clearTimeout(sassCompilationTimer);
		if (!wait) {
			currentJS = jsCode;
		}
		if (previewIframe) {
			previewIframe.contentWindow.location.reload(true);
			previewIframe.onload = handleIframeLoad;
			// previewIframe.onload = () => {};
		}
	};

	let waitTimeout;
	onMount(() => {
		clearTimeout(waitTimeout);

		waitTimeout = setTimeout(() => {
			wait = false;
		}, 1100);
		// currentCSS = null;
		// currentJS = null;
	});

	onDestroy(() => {
		clearTimeout(waitTimeout);
	});

	let zoomLevel = 1;
	let container;
	function adjustZoom(change) {
		// More precise zoom control
		zoomLevel = Math.round((zoomLevel + change) * 10) / 10;

		// Expanded zoom range
		zoomLevel = Math.min(Math.max(zoomLevel, 0.1), 1);

		if (previewIframe) {
			// More comprehensive zoom styling
			previewIframe.style.transform = `scale(${zoomLevel})`;
			previewIframe.style.transformOrigin = 'top left';

			// Adjust container to prevent scrollbars
			const container = previewIframe.parentElement;
			if (container) {
				container.style.overflow = 'hidden';
				container.style.width = `${100 / zoomLevel}%`;
				container.style.height = `${100 / zoomLevel}%`;
			}

			// Update zoom display
			const zoomDisplay = document.getElementById('zoom-value');
			if (zoomDisplay) {
				zoomDisplay.innerText = `${Math.round(zoomLevel * 100)}%`;
			}
		}
	}
</script>

<div bind:this={container} class="m-0 h-full w-full border-0 bg-white p-0">
	<iframe
		bind:this={previewIframe}
		title="preview"
		id="preview-frame"
		class="m-0 h-full w-full p-0"
		onload={triggerJSUpdate()}
	/>
</div>
<div
	class="zoom-control rounded border bg-gray-300/25 p-1 text-sm text-black"
	style="position: fixed; bottom: 20px; right: 20px;  display: flex; align-items: center;"
>
	<button
		id="zoom-out"
		class="zoom-btn px-2 font-bold"
		aria-label="Zoom out"
		on:click={() => adjustZoom(-0.1)}
	>
		-
	</button>
	<span id="zoom-value" class="mx-4 text-xs">100%</span>
	<button
		id="zoom-in"
		class="zoom-btn px-2 font-bold"
		aria-label="Zoom in"
		on:click={() => adjustZoom(0.1)}
	>
		+
	</button>
</div>
