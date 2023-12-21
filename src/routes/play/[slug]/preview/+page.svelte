<script context="module">
	export const layout = null; // or false
</script>

<script>
	import { onMount } from 'svelte';
	import { compileSassString } from '$lib/utils.js';

	import { page } from '$app/stores';
	export let data;

	let iframe;

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
	class="h-[100dvh] w-full dark:bg-primary"
	src=""
	title="preview"
	frameborder="0"
	bind:this={iframe}
/>
