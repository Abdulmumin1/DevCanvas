<script context="module">
	export const layout = null; // or false
</script>

<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	export let data;

	let iframe;

	let zoomOut = $page.url.searchParams.get('preview');

	console.log(zoomOut);

	onMount(() => {
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
			styleElement.textContent = `body::-webkit-scrollbar {
				width: 0px;
			}${data.details.css}`;

			iframeDoc.head.appendChild(styleElement);
			let meta = iframeDoc.createElement('meta');
			meta.name = 'viewport';
			meta.content = 'width=device-width, initial-scale=0.2';

			iframeDoc.head.appendChild(meta);

			if (zoomOut) {
				const contentHeight = Math.max(
					iframeDoc.body.scrollHeight,
					iframeDoc.documentElement.scrollHeight
				);
				const iframeHeight = iframe.clientHeight;
				const desiredPositionY = (contentHeight - iframeHeight) / 2;

				iframeDoc.documentElement.scrollTop = desiredPositionY;
			}

			// Step 3: Create and append JavaScript code
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
