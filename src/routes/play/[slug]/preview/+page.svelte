<script context="module">
	export const layout = null; // or false
</script>

<script>
	import { onMount } from 'svelte';
	export let data;

	let iframe;

	onMount(() => {
		// Initialize the iframe with the default HTML code
		if (iframe) {
			let iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

			const bodyContent = data.details.html;
			iframeDoc.body.innerHTML = bodyContent;

			// Step 2: Create and append the CSS style
			const styleElement = iframeDoc.createElement('style');
			styleElement.textContent = data.details.css;
			iframeDoc.head.appendChild(styleElement);
			let meta = iframeDoc.createElement('meta');
			meta.name = 'viewport';
			meta.content = 'width=device-width, initial-scale=0.2';

			iframeDoc.head.appendChild(meta);

			// Step 3: Create and append JavaScript code
		}
	});
</script>

<svelte:head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

<div class="h-screen w-screen">
	<iframe
		class="h-full w-full dark:bg-primary"
		src=""
		title="preview"
		frameborder="0"
		bind:this={iframe}
	/>
</div>
