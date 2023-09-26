<script context="module">
	export const layout = null; // or false
</script>

<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	export let data;

	let iframe;

	let zoomOut = $page.url.searchParams.get('preview');

	onMount(() => {
		// Initialize the iframe with the default HTML code
		if (iframe) {
			let iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

			const bodyContent = data.details.html;
			if (zoomOut) {
				iframeDoc.body.style.scale = 0.35;
			}
			iframeDoc.body.innerHTML = bodyContent;

			// Step 2: Create and append the CSS style
			const styleElement = iframeDoc.createElement('style');
			styleElement.textContent = `body::-webkit-scrollbar {
				width: 0px;
			}${data.details.css}`;

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
