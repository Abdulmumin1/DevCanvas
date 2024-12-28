<script>
	import { current_data } from '$lib/index.js';
	import { constructHtml } from '$lib/feEditor/previewUtils.js';
	import { onDestroy, onMount } from 'svelte';
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import { canvasConfig, jsPlugins, cssPlugins } from '$lib/feEditor/store.js';
	import { faUsersRays } from '@fortawesome/free-solid-svg-icons';

	let previewIframe;
	let unsubscribe;
	let useSrc = true; // Initially load from src
	let initialSrc = `${$page.url.origin}/output/compile/${$page.params.slug}`;
	let attempts = 0;

	// Throttle function to limit execution frequency
	function throttle(func, limit) {
		let inThrottle;
		return function (...args) {
			if (!inThrottle) {
				func.apply(this, args);
				inThrottle = true;
				setTimeout(() => (inThrottle = false), limit);
			}
		};
	}

	function updateIframeContent(data) {
		if (previewIframe) {
			const htmlContent = constructHtml(data);
			const blob = new Blob([htmlContent], { type: 'text/html' });
			const blobURL = URL.createObjectURL(blob);

			// Set the iframe src to the Blob URL
			previewIframe.src = blobURL;

			// Cleanup the Blob URL when it's no longer needed
			previewIframe.onload = () => {
				URL.revokeObjectURL(blobURL);
			};
		}
	}

	// Throttle the update function to limit updates to once every 1000ms
	const throttledUpdateIframeContent = throttle(updateIframeContent, 100);

	// Subscribe to the current_data store
	onMount(async () => {
		const htm = await fetch(initialSrc);
		unsubscribe = current_data.subscribe((data) => {
			if (useSrc) {
				// if (constructHtml(data) != htm) {
				// 	useSrc = false;
				// 	throttledUpdateIframeContent(data);
				// } else
				if (attempts < 1) {
					attempts += 1;
				} else {
					useSrc = false;
					throttledUpdateIframeContent(data);
				}
			} else {
				throttledUpdateIframeContent(data);
			}
		});
	});

	let zoomLevel = 1;
	let container;
	function adjustZoom(change) {
		// More precise zoom control
		zoomLevel = Math.round((zoomLevel + change) * 10) / 10;
		// Expanded zoom range
		zoomLevel = Math.min(Math.max(zoomLevel, 0.1), 1);
		if (previewIframe) {
			// More comprehensive zoom styling
			previewIframe.style.transform = `scale(${zoomLevel})`;
			previewIframe.style.transformOrigin = 'top left';
			// Adjust container to prevent scrollbars
			const container = previewIframe.parentElement;
			if (container) {
				container.style.overflow = 'hidden';
				container.style.width = `${100 / zoomLevel}%`;
				container.style.height = `${100 / zoomLevel}%`;
			}
			// Update zoom display
			const zoomDisplay = document.getElementById('zoom-value');
			if (zoomDisplay) {
				zoomDisplay.innerText = `${Math.round(zoomLevel * 100)}%`;
			}
		}
	}
	// Clean up the subscription when the component is destroyed
	onDestroy(() => {
		if (unsubscribe) unsubscribe();
	});
</script>

<div bind:this={container} class="preview-container m-0 h-full w-full border-0 bg-white p-0">
	{#if useSrc}
		<!-- Load initial preview via src -->
		<iframe
			bind:this={previewIframe}
			src={initialSrc}
			id="preview-frame"
			class="preview-frame m-0 h-full w-full p-0"
			title="Initial Project Preview"
		></iframe>
		<!-- <div class="absolute top-0 bg-green-400 text-4xl text-black">Using SRC directy</div> -->
	{:else}
		<!-- Switch to dynamic updates -->
		<iframe
			bind:this={previewIframe}
			id="preview-frame"
			class="preview-frame m-0 h-full w-full p-0"
			title="Live Preview"
		></iframe>
		<!-- <div class="absolute top-0 bg-yellow-400 text-4xl text-black">Using Iframe Updates</div> -->
	{/if}

	<div
		class="zoom-control rounded border bg-gray-100 p-1 text-sm text-black"
		style="position: fixed; bottom: 20px; right: 20px;  display: flex; align-items: center;"
	>
		<button
			id="zoom-out"
			class="zoom-btn px-2 font-bold"
			aria-label="Zoom out"
			on:click={() => adjustZoom(-0.1)}
		>
			-
		</button>
		<button id="zoom-value" class="mx-4 text-xs" on:click={() => adjustZoom(1)}>100%</button>
		<button
			id="zoom-in"
			class="zoom-btn px-2 font-bold"
			aria-label="Zoom in"
			on:click={() => adjustZoom(0.1)}
		>
			+
		</button>
	</div>
</div>

<style>
	.preview-container {
		position: relative;
	}

	.preview-frame {
		border: none;
	}
</style>
