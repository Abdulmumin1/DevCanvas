<script>
	import { current_data } from '$lib/index.js';
	import { externalStuff, jsChanged, cssPlugins, jsPlugins } from '$lib/feEditor/store.js';
	import {
		fontawesomeLINK,
		materialiconsLINK,
		bootstrapLINK,
		setup_js_plugin
	} from '$lib/plugins/store.js';
	import { onMount } from 'svelte';

	export let code;
	export let css;
	export let js;

	let iframe;
	let typingTimer; // Timer to track typing

	$: {
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
			styleElement.textContent = `body::-webkit-scrollbar {
			width: 0px;
			height: 0px;
			}${css}`;
			iframeDoc.head.appendChild(styleElement);

			// Function to handle text input

			const delay = 2000; // Adjust the delay as needed (in milliseconds)
			clearTimeout(typingTimer); // Clear the previous timer

			typingTimer = setTimeout(function () {
				// This function will run after the delay (user has stopped typing)
				jsChanged.set(true);
			}, delay);
		}

		// console.log(code);
	}

	// css plugins
	$: {
		if (iframe) {
			let iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

			const tailwindScriptHTML = iframeDoc.getElementById('tailwincssDSFE4o431!!');
			const fontawesomeHTML = iframeDoc.getElementById('fontawesomeDSFE4o431!!');
			const materialiconsHTML = iframeDoc.getElementById('materialiconsDSFE4o431!!');
			const bootstrapHTML = iframeDoc.getElementById('bootstrapDSFE4o431!!');

			if ($cssPlugins.fontawesome) {
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

			if ($cssPlugins.bootstrap) {
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

			if ($cssPlugins.materialicons) {
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

			if ($cssPlugins.tailwind) {
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
		}
	}

	$: {
		if (iframe) {
			let iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

			let array = Object.keys($jsPlugins);
			for (let index = 0; index < array.length; index++) {
				setup_js_plugin(array[index], $jsPlugins, iframeDoc);
			}
			// const animejsScriptHTML = iframeDoc.getElementById('animejsDSFE4o431!!');
			// if ($jsPlugins.animejs) {
			// 	const animejsScript = iframeDoc.createElement('script');
			// 	animejsScript.src = animejsCDN;
			// 	animejsScript.id = 'animejsDSFE4o431!!';

			// 	if (!animejsScriptHTML) {
			// 		iframeDoc.body.appendChild(animejsScript);
			// 	}
			// } else {
			// 	if (animejsScriptHTML) {
			// 		animejsScriptHTML.remove();
			// 	}
			// }

			try {
				if ($externalStuff.js != undefined) {
					const externalScript = iframeDoc.createElement('script');
					externalScript.src = $externalStuff.js;

					iframeDoc.body.appendChild(externalScript);
				}
			} catch (err) {}
		}
	}

	$: {
		if ($jsChanged) {
			jsChanged.set(false);
			// Step 4: Create and append the new JavaScript code
			// console.log('js changed', js);
			// showBundling.set(true);
			if (iframe) {
				let iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

				const mainScriptHTML = iframeDoc.getElementById('mainScript12343REFDS!');
				if (mainScriptHTML) {
					mainScriptHTML.textContent = '';
				}

				const scriptElement = iframeDoc.createElement('script');
				scriptElement.id = 'mainScript12343REFDS!';
				scriptElement.textContent = `

// Inside the iframe

console.log = function(message) {
	// Send the console message to the parent page
	window.parent.postMessage({ type: 'console', message: message }, '*');
};

try{

${js}

}catch(err){
	console.log(err); 
	
}`;
				iframeDoc.body.appendChild(scriptElement);
			}
			// showBundling.set(false);
		}
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

		setTimeout(() => {
			try {
				if ($current_data.plugins?.length > 0) {
					console.log($current_data.plugins[0].js);
					jsPlugins.set($current_data.plugins[0].js);
					cssPlugins.set($current_data.plugins[0].css);
				}
			} catch (er) {
				console.log(er);
			}
			current_data.update((cur) => {
				return { ...cur, html: `${code} ` };
			});
		}, 2000);
	});
</script>

<div
	class="bg-white border-t md:border-l dark:border-primary border-gray-300 w-full h-full text-black dark:text-white"
>
	<iframe bind:this={iframe} title="preview" id="preview-frame" class="w-full h-full" />
</div>
