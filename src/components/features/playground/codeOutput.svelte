<script>
	import { current_data } from '$lib/stores/index.js';
	import { constructHtml } from '$lib/playground/previewUtils.js';
	import { getContext, onDestroy, onMount } from 'svelte';
	import { page } from '$app/state';
	import { crossfade, fade } from 'svelte/transition';
	import { canvasConfig, jsPlugins, cssPlugins } from '$lib/stores/playground.js';
	import { faUsersRays } from '@fortawesome/free-solid-svg-icons';

	import Worker from '$lib/playground/worker_script.js?worker';
	import ReloadEditor from './reloadEditor.svelte';

	let previewIframe = $state();
	let unsubscribe;
	let useSrc = $state(true); // Initially load from src
	let initialSrc = `${page.url.origin}/output/compile/${page.params.slug}`;
	let attempts = 0;
	let isVisible = true;
	let lockEditor = getContext('generating');

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

	function InlineWorker(source) {
		let blob = new Blob([source], { type: 'text/javascript' });
		let url = URL.createObjectURL(blob);

		let worker = new Worker(url);

		URL.revokeObjectURL(url);

		return worker;
	}

	let worker_service;

	// if (typeof window !== 'undefined') {

	// }

	function UpdatePreview(params) {
		const htmlContent = InlineWorker(String((async () => await constructHtml(data))()));
		// console.log(htmlContent)
		const blob = new Blob([htmlContent], { type: 'text/html' });
		const blobURL = URL.createObjectURL(blob);

		// Set the iframe src to the Blob URL
		previewIframe.src = blobURL;

		// Cleanup the Blob URL when it's no longer needed
		previewIframe.onload = () => {
			URL.revokeObjectURL(blobURL);
		};
	}

	function updateIframeContent(data) {
		if (previewIframe && worker_service) {
			worker_service.postMessage(data);
			// console.log(data)
		}
	}

	// Throttle the update function to limit updates to once every 1000ms
	const throttledUpdateIframeContent = throttle(updateIframeContent, 200);
	let tryDC = page.url.pathname == '/play/try';

	// Subscribe to the current_data store
	onMount(async () => {
		// Only initialize the worker in the browser
		worker_service = new Worker();
		// console.log(worker_service)
		worker_service.onmessage = (event) => {
			const { htmlContent, blobURL } = event.data;
			// const htmlContent = InlineWorker(String( (async()=>await constructHtml(data))()));
			// console.log(htmlContent)
			// const blob = new Blob([htmlContent], { type: 'text/html' });
			// const blobURL = URL.createObjectURL(blob);

			// Set the iframe src to the Blob URL

			if (previewIframe) {
				previewIframe.src = blobURL;

				// Cleanup the Blob URL when it's no longer needed
				previewIframe.onload = () => {
					URL.revokeObjectURL(blobURL);
					// isVisible = !isVisible
				};
			}
		};

		// const htm = await fetch(initialSrc);
		unsubscribe = current_data.subscribe((data) => {
			if (useSrc && !tryDC) {
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
	let container = $state();
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
		if (worker_service) {
			worker_service.terminate();
		}
	});
	const [send, receive] = crossfade({ duration: 1500 });
</script>

<div
	bind:this={container}
	class="preview-container m-0 h-full w-full border-0 bg-white p-0 {$lockEditor &&
		'cursor-progress'}"
>
	{#if useSrc && !tryDC}
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
		{#key isVisible}
			<!-- out:receive -->
			<iframe
				bind:this={previewIframe}
				id="preview-frame"
				in:fade
				class="preview-frame m-0 h-full w-full p-0"
				title="Live Preview"
			></iframe>
		{/key}
		<!-- <div class="absolute top-0 bg-yellow-400 text-4xl text-black">Using Iframe Updates</div> -->
	{/if}

	<div
		class="flex items-center gap-2"
		style="position: fixed; bottom: 20px; right: 20px;  display: flex; align-items: center;"
	>
		<div
			class="flex size-8 items-center justify-center rounded-full bg-gray-50 transition-transform duration-200 hover:-rotate-45"
		>
			<ReloadEditor />
		</div>
		<div class="zoom-control rounded border bg-gray-100 p-1 text-sm text-black">
			<button
				id="zoom-out"
				class="zoom-btn px-2 font-bold"
				aria-label="Zoom out"
				onclick={() => adjustZoom(-0.1)}
			>
				-
			</button>
			<button id="zoom-value" class="mx-4 text-xs" onclick={() => adjustZoom(1)}>100%</button>
			<button
				id="zoom-in"
				class="zoom-btn px-2 font-bold"
				aria-label="Zoom in"
				onclick={() => adjustZoom(0.1)}
			>
				+
			</button>
		</div>
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
