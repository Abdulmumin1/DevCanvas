<script>
	import { current_data } from '$lib/index.js';
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

			// Step 3: Create and append JavaScript code
			const scriptElement = iframeDoc.createElement('script');
			scriptElement.textContent = `${js}`;
			iframeDoc.body.appendChild(scriptElement);
		}

		// console.log(code);
	}

	// onMount(() => {
	// 	html = code;
	// });

	// onMount(() => {
	// 	// Initialize the iframe with the default HTML code
	// 	if (iframeDoc) {
	// 		iframeDoc.contentDocument.open();
	// 		iframeDoc.contentDocument.write(documentCode);
	// 		iframeDoc.contentDocument.close();
	// 	}
	// });
</script>

<div
	class="bg-white border-t md:border-l dark:border-primary border-gray-300 w-full h-full text-black dark:text-white"
>
	<iframe bind:this={iframe} title="preview" id="preview-frame" class="w-full h-full" />
</div>

<style>
</style>
