<script>
	import { current_data } from '$lib/index.js';
	import { externalStuff } from '$lib/feEditor/store.js';
	import { onMount } from 'svelte';

	export let code;
	export let css;
	export let js;

	let iframe;

	$: {
		code = $current_data.html;
		css = $current_data.css;
		js = $current_data.js;
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

			// Step 2: Create and append the new CSS style
			const styleElement = iframeDoc.createElement('style');
			styleElement.textContent = `body::-webkit-scrollbar {
			width: 0px;
			height: 0px;
			}${css}`;
			iframeDoc.head.appendChild(styleElement);
			try {
				iframeDoc.head.appendChild($externalStuff.html);
				console.log($externalStuff.html);

				// Create a temporary HTML element
				const tempElement = document.createElement('div');

				// Set the HTML code as text
				tempElement.innerHTML = $externalStuff.html;

				// Extract the first child element (the <link> element) from the temporary element
				const linkElement = tempElement.firstElementChild;

				// Append the <link> element to the <head> of the document
				document.head.appendChild(linkElement);
			} catch (err) {
				console.log('err');
				console.log('big faile', $externalStuff.html);
			}

			// Step 3: Remove any existing <script> elements
			const existingScripts = iframeDoc.getElementsByTagName('script');
			for (const script of existingScripts) {
				script.remove();
			}

			// Step 4: Create and append the new JavaScript code
			const scriptElement = iframeDoc.createElement('script');
			scriptElement.textContent = `try{${js}}catch(err){console.log(err)}`;
			iframeDoc.body.appendChild(scriptElement);

			const externalScript = iframeDoc.createElement('script');
			externalScript.src = $externalStuff.js;
			iframeDoc.body.appendChild(externalScript);
		}

		// console.log(code);
	}

	onMount(() => {
		console.log(code, css, js);
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
			scriptElement.textContent = `try{${js}}catch(err){console.log(err)}`;
			iframeDoc.body.appendChild(scriptElement);

			const externalScript = iframeDoc.createElement('script');
			externalScript.src = $externalStuff.js;
			iframeDoc.body.appendChild(externalScript);
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
