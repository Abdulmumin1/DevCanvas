<script>
	import { current_data } from '$lib/index.js';
	import { externalStuff, jsChanged } from '$lib/feEditor/store.js';
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

			// // Step 3: Remove any existing <script> elements
			// const existingScripts = iframeDoc.getElementsByTagName('script');
			// for (const script of existingScripts) {
			// 	script.remove();
			// }

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

	$: {
		if ($jsChanged) {
			jsChanged.set(false);
			// Step 4: Create and append the new JavaScript code
			// console.log('js changed', js);
			// showBundling.set(true);
			if (iframe) {
				let iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

				const scriptElement = iframeDoc.createElement('script');
				scriptElement.textContent = `try{${js}}catch(err){console.log(err)}`;
				iframeDoc.body.appendChild(scriptElement);
				try {
					if ($externalStuff.js != undefined) {
						const externalScript = iframeDoc.createElement('script');
						externalScript.src = $externalStuff.js;

						iframeDoc.body.appendChild(externalScript);
					}
				} catch (err) {}
			}
			// showBundling.set(false);
		}
	}
	onMount(() => {
		if (iframe) {
			let iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

			const bodyContent = code;
			iframeDoc.body.innerHTML = bodyContent;

			// Step 2: Create and append the CSS style
			const styleElement = iframeDoc.createElement('style');
			styleElement.textContent = `body::-webkit-scrollbar {
				width: 0px;
				height:0px;
			}${css}`;

			iframeDoc.head.appendChild(styleElement);
			try {
				iframeDoc.head.appendChild($externalStuff.html);
			} catch (err) {
				console.log('err');
			}
			// Step 3: Create and append JavaScript code
			const scriptElement = iframeDoc.createElement('script');
			scriptElement.textContent = `try{
				${js}
			}catch(err){console.log(err)}`;
			iframeDoc.body.appendChild(scriptElement);
			try {
				if ($externalStuff.js != undefined) {
					const externalScript = iframeDoc.createElement('script');
					externalScript.src = $externalStuff.js;

					iframeDoc.body.appendChild(externalScript);
				}
			} catch (err) {}
		}
	});
</script>

<div
	class="bg-white border-t md:border-l dark:border-primary border-gray-300 w-full h-full text-black dark:text-white"
>
	<iframe
		sandbox="allow-scripts allow-forms allow-modals allow-same-origin"
		bind:this={iframe}
		title="preview"
		id="preview-frame"
		class="w-full h-full"
	/>
</div>
