<script>
	import {
		faArrowUpFromBracket,
		faCode,
		faCodeMerge,
		faLink
	} from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { slide } from 'svelte/transition';

	import { page } from '$app/stores';
	import TooltipB from '../tooltip-b.svelte';
	import { showEmbedModal } from '$lib/feEditor/store.js';
	import DownloadCodeDropDown from './downloadCodeDropDown.svelte';

	let showPreview = $page.url.pathname.endsWith('/edit');
	function showEmbedDialog(event) {
		// event.target.disabled = true;
		showEmbedModal.set(true);
	}
</script>

<div class="flex flex-col gap-2 md:flex-row md:gap-0 md:divide-x-2 md:divide-primary">
	<button
		class="flex cursor-pointer items-center justify-center gap-2 rounded md:rounded-r-none bg-gray-300 py-2 pl-2 pr-1 text-primary transition-transform duration-300 active:scale-95"
		on:click={showEmbedDialog}
		aria-busy={$showEmbedModal}
	>
		<div transition:slide class="transition-all duration-300">
			<Fa icon={faCode} class="transition-all duration-300" />
		</div>
		<span>Embed</span>
	</button>
	<div class="flex items-center justify-center rounded md:rounded-l-none bg-gray-300 px-2 py-2">
		<DownloadCodeDropDown />
	</div>
</div>

<style>
</style>
