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
		faFileZipper
	} from '@fortawesome/free-solid-svg-icons';

	let dropdownOpen = false;

	function toggleDropdown() {
		dropdownOpen = !dropdownOpen;
	}

	function closeDropdown() {
		dropdownOpen = false;
	}

	import JSZip from 'jszip';

	async function downloadZip() {
		try {
			const zip = new JSZip();

			// textsToZip.forEach((text, index) => {
			zip.file(`index.html`, constructHtmlForZip($current_data.html));
			zip.file(`style.css`, $current_data.css);
			zip.file(`script.js`, $current_data.js);

			// });

			const content = await zip.generateAsync({ type: 'blob' });

			const downloadLink = document.createElement('a');
			downloadLink.href = window.URL.createObjectURL(content);
			downloadLink.download = 'code - (devCanvas.art).zip';
			downloadLink.click();
		} catch (error) {
			console.error('Error creating or downloading zip file:', error);
		}
	}
</script>

<div class="dropdown text-primary dark:text-white relative flex flex-col text-center">
	<button
		class="dropdown-button text-primary flex items-center justify-end gap-2 hover:scale-105 transition-all duration-300 active:scale-95"
		on:click={toggleDropdown}
	>
		<Fa icon={faFileZipper} />
	</button>

	{#if dropdownOpen}
		<ul
			use:clickOutside
			on:click_outside={closeDropdown}
			class={`mt-8 w-[200px] rounded-xl p-2 absolute drop  right-0 top-0 text-sm h-fit  dropdown-menu flex items-start gap-2 justify-start flex-col bg-gray-300 dark:bg-black `}
			transition:scale
		>
			<li class="p-2 text-center">Download Code</li>
			<!-- <form action="?/downloadZip" method="post"> -->
			<button
				on:click={downloadZip}
				class="w-full p-2 rounded-md bg-gray-100 dark:bg-secondary-dark">Download Zip</button
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
