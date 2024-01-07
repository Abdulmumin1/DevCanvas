<script>
	import { current_data } from '$lib/index.js';
	import {
		externalStuff,
		jsChanged,
		cssPlugins,
		jsPlugins,
		sassActive,
		canvasConfig
	} from '$lib/feEditor/store.js';
	import {
		fontawesomeLINK,
		materialiconsLINK,
		bootstrapLINK,
		setup_js_plugin
	} from '$lib/plugins/store.js';
	import { onDestroy, onMount } from 'svelte';
	import { compileSassString } from '$lib/utils.js';
	import { delayPreview } from '$lib/index.js';

	// import { beforeNavigate, afterNavigate } from '$app/navigation';

	export let code;
	export let css;
	export let js;

	var currentJS = $current_data.js;
	var currentCSS = $current_data.css;

	let iframe;
	let typingTimer; // Timer to track typing
	let cssPluginsVar = $cssPlugins;
	let jsPluginsVar = $jsPlugins;
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

		try {
			// Create a temporary HTML element
			const tempElement = document.createElement('div');

			// Set the HTML code as text
			tempElement.innerHTML = $externalStuff.html;

			// Extract the first child element (the <link> element) from the temporary element
			const headStuff = tempElement.children;

			// Append the <link> element to the <head> of the document
			for (let i = 0; i < headStuff.length; i++) {
				const child = headStuff[i];
				// Log the content of each child element
				iframeDoc.head.appendChild(child);
			}
		} catch (err) {}

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
		if (currentJS != js) {
			const delay = 1000; // Adjust the delay as needed (in milliseconds)
			clearTimeout(typingTimer); // Clear the previous timer

			typingTimer = setTimeout(function () {
				// This function will run after the delay (user has stopped typing)
				jsChanged.set(true);
			}, delay);
			currentJS = js;
		}
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

		try {
			// Create a temporary HTML element
			const tempElement = document.createElement('div');

			// Set the HTML code as text
			tempElement.innerHTML = $externalStuff.html;

			// Extract the first child element (the <link> element) from the temporary element
			const headStuff = tempElement.children;

			// Append the <link> element to the <head> of the document
			for (let i = 0; i < headStuff.length; i++) {
				const child = headStuff[i];
				// Log the content of each child element
				iframeDoc.head.appendChild(child);
			}
		} catch (err) {}

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
	}

	$: {
		let delay = $delayPreview ? 500 : 0;
		clearTimeout(delayPRTimer);
		delayPRTimer = setTimeout(() => {
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
		}, delay);

		// console.log('changesing');
	}

	// css plugins\
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

	$: {
		cssPluginsVar = $cssPlugins;
		if (iframe) {
			let iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
			injectCSSPlugins(iframeDoc, cssPluginsVar);
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

		try {
			if ($externalStuff.js != undefined) {
				const externalScript = iframeDoc.createElement('script');
				externalScript.src = $externalStuff.js;

				iframeDoc.body.appendChild(externalScript);
			}
		} catch (err) {}
	}
	$: {
		jsPluginsVar = $jsPlugins;
		if (iframe) {
			let iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

			injectCSSPlugins(iframeDoc, jsPluginsVar);
		}

		console.log('js plugins injected');
	}

	function injectJavascript(iframeDoc, js) {
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
	$: {
		if ($jsChanged) {
			jsChanged.set(false);
			// Step 4: Create and append the new JavaScript code
			// console.log('js changed', js);
			// showBundling.set(true);
			if (iframe) {
				iframe.contentWindow.location.reload(true);
				addLoadEvent();
			}
			// showBundling.set(false);
		}
	}

	function addLoadEvent() {
		iframe.onload = function () {
			let iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
			injectHtmlCSSOnReload(iframeDoc, code, css);
			injectJavascript(iframeDoc, js);
			console.log('why man!');
			injectCSSPlugins(iframeDoc, cssPluginsVar);
			injectJSPlugins(iframeDoc, jsPluginsVar);
			setTimeout(() => {
				current_data.update((cur) => {
					return { ...cur, css: `${css}  ` };
				});
				loading = false;
			}, 500);
			return false;
		};
	}

	onMount(() => {
		// if (iframe) {
		// 	let iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

		// 	const bodyContent = code;
		// 	iframeDoc.body.innerHTML = bodyContent;

		// 	// Step 2: Create and append the CSS style
		// 	const styleElement = iframeDoc.createElement('style');
		// 	styleElement.textContent = `body::-webkit-scrollbar {
		// 		width: 0px;
		// 		height:0px;
		// 	}${css}`;

		// 	iframeDoc.head.appendChild(styleElement);
		// 	try {
		// 		iframeDoc.head.appendChild($externalStuff.html);
		// 	} catch (err) {
		// 		console.log('err');
		// 	}
		// 	// Step 3: Create and append JavaScript code
		// 	const scriptElement = iframeDoc.createElement('script');
		// 	scriptElement.id = 'mainScript12343REFDS!';
		// 	scriptElement.textContent = `try{
		// 		${js}
		// 	}catch(err){console.log(err)}`;
		// 	iframeDoc.body.appendChild(scriptElement);
		// }

		// setTimeout(() => {
		try {
			if ($current_data.plugins?.length > 0) {
				jsPlugins.set($current_data.plugins[0].js);
				cssPlugins.set($current_data.plugins[0].css);
				// console.log($canvasConfig?.cssProcessor ? true : false);
			}
		} catch (er) {
			console.log(er);
		}
		current_data.update((cur) => {
			return { ...cur, js: `${cur.js}   ` };
		});

		// }, 1000);
	});
</script>

<div
	class="bg-white m-0 p-0 border-t md:border-l dark:border-primary border-gray-300 w-full h-full text-black dark:text-white"
>
	<iframe bind:this={iframe} title="preview" id="preview-frame" class="w-full h-full" />
</div>
