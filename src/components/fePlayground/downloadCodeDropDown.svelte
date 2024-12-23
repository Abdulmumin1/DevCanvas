<script>
	// import { onMount } from 'svelte';
	import { clickOutside, current_data } from '$lib/index.js';
	import { constructHtmlForZip } from '$lib/downloadCode/index.js';
	// import feather from 'feather-icons';
	import { scale } from 'svelte/transition';
	import Fa from 'svelte-fa';
	import { faFileZipper, faSpinner } from '@fortawesome/free-solid-svg-icons';

	let dropdownOpen = false;

	function toggleDropdown() {
		if (isVertical) {
			downloadZip();
			return;
		}
		dropdownOpen = !dropdownOpen;
	}

	function closeDropdown() {
		dropdownOpen = false;
	}

	import JSZip from 'jszip';

	let loading;

	async function downloadZip() {
		try {
			loading = true;
			const zip = new JSZip();

			// textsToZip.forEach((text, index) => {
			zip.file(`index.html`, constructHtmlForZip($current_data));
			zip.file(`style.css`, $current_data.css);
			zip.file(`script.js`, $current_data.js);

			// });
			const content = await zip.generateAsync({ type: 'blob' });
			setTimeout(() => {
				const downloadLink = document.createElement('a');
				downloadLink.href = window.URL.createObjectURL(content);
				downloadLink.download = `${$current_data.description} - (devCanvas.art).zip`;
				downloadLink.click();
				loading = false;
			}, 1000);
		} catch (error) {
			console.error('Error creating or downloading zip file:', error);
		}
	}

	let innerWidth = 0;

	// $:console.log(innerWidth)

	$: isVertical = innerWidth <= 724;
</script>

<svelte:window bind:innerWidth />

<div class="dropdown relative flex flex-col text-center text-primary dark:text-white">
	<button
		class="dropdown-button flex items-center justify-end gap-2 text-primary"
		on:click={toggleDropdown}
		><span class="md:hidden">Download Zip</span>

		{#if loading && isVertical}
			<Fa icon={faSpinner} class="animate-spin" />
		{:else}
			<Fa icon={faFileZipper} />
		{/if}
	</button>

	{#if dropdownOpen}
		<ul
			use:clickOutside
			on:click_outside={closeDropdown}
			class={`drop dropdown-menu absolute right-0 top-0 mt-8  flex h-fit w-[200px] flex-col  items-start justify-start rounded-md  bg-gray-300 p-1 text-sm dark:bg-black `}
			transition:scale
		>
			<li class="p-2 text-center">Download Code</li>
			<!-- <form action="?/downloadZip" method="post"> -->
			<button
				on:click={downloadZip}
				class="flex w-full items-center justify-center gap-2 rounded-md bg-gray-100 p-2 dark:bg-secondary-dark"
				>Download Zip {#if loading}
					<Fa icon={faSpinner} class="animate-spin" />
				{/if}</button
			>
			<!-- </form> -->
		</ul>
	{/if}
</div>

<style>
	.drop {
		z-index: 9999;
	}
</style>
