<script>
	import { current_data } from '$lib/index.js';
	import { constructHtml } from '$lib/feEditor/previewUtils.js';
	import { onDestroy, onMount } from 'svelte';
	import { page } from '$app/stores';

	let previewIframe;
	let unsubscribe;
	let useSrc = true; // Initially load from src
	let initialSrc = `${$page.url.origin}/output/compile/${$page.params.slug}`;

	// Function to update the iframe content
	function updateIframeContent() {
		if (previewIframe) {
			const iframeDoc = previewIframe.contentDocument || previewIframe.contentWindow.document;
			iframeDoc.open();

			iframeDoc.write(constructHtml($current_data));
			iframeDoc.close();
		}
	}
	let attempts = 0;
	// Subscribe to the current_data store
	onMount(() => {
		unsubscribe = current_data.subscribe((data) => {
			// Only update dynamically after initial load
			if (!useSrc) {
				updateIframeContent(data);
				// return;
			} else if (attempts < 1) {
				attempts += 1;
			} else {
				useSrc = false; // Switch to dynamic updates
				updateIframeContent(data);
			}
		});
	});

	// Clean up the subscription when the component is destroyed
	onDestroy(() => {
		if (unsubscribe) unsubscribe();
	});
</script>

<div class="preview-container m-0 h-full w-full border-0 bg-white p-0">
	{#if useSrc}
		<!-- Load initial preview via src -->
		<iframe
			bind:this={previewIframe}
			src={initialSrc}
			id="preview-frame"
			class="preview-frame m-0 h-full w-full p-0"
			title="Initial Project Preview"
		></iframe>
	{:else}
		<!-- Switch to dynamic updates -->
		<iframe
			bind:this={previewIframe}
			id="preview-frame"
			class="preview-frame m-0 h-full w-full p-0"
			title="Live Preview"
		></iframe>
	{/if}
</div>

<style>
	.preview-container {
		position: relative;
	}

	.preview-frame {
		border: none;
	}
</style>
