<script>
	import { current_data } from '$lib/index.js';
	import { cssPlugins, jsPlugins, sassActive, userImportedJS } from '$lib/feEditor/store.js';
	import { setup_js_plugin, loadScriptFromURL, injectHeadContent } from '$lib/plugins/store.js';
	import { injectJavascript } from '$lib/feEditor/previewUtils.js';
	import { onMount } from 'svelte';
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

		const styleElement = iframeDoc.createElement('style');

		if (currentCSS !== cssCode && ($sassActive || useSassEmbed)) {
			styleElement.textContent = compiledSassCSS;
			iframeDoc.head.appendChild(styleElement);
			compileSassCode(iframeDoc);
		} else if (currentCSS !== cssCode && !($sassActive || useSassEmbed)) {
			styleElement.textContent = cssCode;
			iframeDoc.head.appendChild(styleElement);
		}

		injectJavascript(iframeDoc, jsCode);
	};

	const compileSassCode = (iframeDoc) => {
		clearTimeout(sassCompilationTimer);
		sassCompilationTimer = setTimeout(async () => {
			compiledSassCSS = await compileSassString(cssCode);
			const styleElement = iframeDoc.createElement('style');
			styleElement.textContent = compiledSassCSS;
			iframeDoc.head.appendChild(styleElement);
			currentCSS = cssCode;
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

		const cssPluginsActive = Object.values($cssPlugins).some(Boolean);
		const jsPluginsActive = Object.values($jsPlugins).some(Boolean);
		const userLibrariesImported = $userImportedJS ? $userImportedJS.length > 0 : false;

		if (cssPluginsActive || jsPluginsActive || userLibrariesImported) {
			setTimeout(() => {
				current_data.update((cur) => ({ ...cur, html: `${cur.html}  ` }));
			}, 2000);
		}
	};

	const triggerJSUpdate = () => {
		setTimeout(() => {
			current_data.update((cur) => ({ ...cur, js: `${cur.js}   ` }));
		}, 1000);
	};

	$: {
		htmlCode = $current_data?.html ?? '';
		cssCode = $current_data?.css ?? '';
		jsCode = $current_data?.js ?? '';
		updatePreview();
	}

	$: currentJS !== jsCode && handleIframeReload();

	const handleIframeReload = () => {
		clearTimeout(sassCompilationTimer);
		currentJS = jsCode;
		if (previewIframe) {
			previewIframe.contentWindow.location.reload(true);
			previewIframe.onload = handleIframeLoad;
			// previewIframe.onload = () => {};
		}
	};

	onMount(() => {
		currentCSS = null;
		currentJS = null;
	});
</script>

<div class="m-0 h-full w-full border-0 bg-white p-0">
	<iframe
		bind:this={previewIframe}
		title="preview"
		id="preview-frame"
		class="m-0 h-full w-full p-0"
		onload={triggerJSUpdate()}
	/>
</div>
