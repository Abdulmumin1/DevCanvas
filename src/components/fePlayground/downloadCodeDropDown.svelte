<script>
	import { onMount } from 'svelte';
	import {
		clickOutside,
		wordWrapSetting,
		smallerFontSize,
		formatOnPasteSetting,
		current_data,
		constructHtmlForZip
	} from '$lib/index.js';
	// import feather from 'feather-icons';
	import { scale } from 'svelte/transition';
	import Fa from 'svelte-fa';
	import {
		faArrowDown,
		faArrowDownShortWide,
		faArrowDownUpAcrossLine,
		faCloudDownload,
		faCloudDownloadAlt,
		faDownload,
		faFileDownload,
		faFileZipper,
		faSpinner
	} from '@fortawesome/free-solid-svg-icons';

	let dropdownOpen = false;

	function toggleDropdown() {
		dropdownOpen = !dropdownOpen;
	}

	function closeDropdown() {
		dropdownOpen = false;
	}

	import JSZip from 'jszip';
	import Loader from '../loader.svelte';
	import Loadermini from '../loadermini.svelte';
	let loading;

	async function downloadZip() {
		try {
			loading = true;
			const zip = new JSZip();

			// textsToZip.forEach((text, index) => {
			zip.file(`index.html`, constructHtmlForZip($current_data.html));
			zip.file(`style.css`, $current_data.css);
			zip.file(`script.js`, $current_data.js);

			// });
			const content = await zip.generateAsync({ type: 'blob' });
			setTimeout(() => {
				const downloadLink = document.createElement('a');
				downloadLink.href = window.URL.createObjectURL(content);
				downloadLink.download = 'code - (devCanvas.art).zip';
				downloadLink.click();
				loading = false;
			}, 1000);
		} catch (error) {
			console.error('Error creating or downloading zip file:', error);
		}
	}
</script>

<div class="dropdown text-primary dark:text-white relative flex flex-col text-center">
	<button
		class="dropdown-button text-primary flex items-center justify-end gap-2"
		on:click={toggleDropdown}
	>
		<Fa icon={faFileZipper} />
	</button>

	{#if dropdownOpen}
		<ul
			use:clickOutside
			on:click_outside={closeDropdown}
			class={`mt-8 w-[200px] rounded-md p-1 absolute drop  right-0 top-0 text-sm h-fit  dropdown-menu flex items-start  justify-start flex-col bg-gray-300 dark:bg-black `}
			transition:scale
		>
			<li class="p-2 text-center">Download Code</li>
			<!-- <form action="?/downloadZip" method="post"> -->
			<button
				on:click={downloadZip}
				class="w-full p-2 rounded-md flex items-center justify-center gap-2 bg-gray-100 dark:bg-secondary-dark"
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
