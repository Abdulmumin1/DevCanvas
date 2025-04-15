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

<div class="flex flex-col gap-2 text-white">
	<button
	class="flex items-center gap-2  bg-secondary-dark p-1 text-sm"
	on:click={showEmbedDialog}
		aria-busy={$showEmbedModal}
	>
		<div class="flex items-center  gap-2">
			<span>Embed</span>
			<div transition:slide class="transition-all duration-300">
				<Fa icon={faCode} class="transition-all duration-300" />
			</div>
		</div>
	</button>
	<div 
	class="flex items-center gap-2  bg-secondary-dark p-1 text-sm"
	
	>
		<DownloadCodeDropDown />
	</div>
</div>

<style>
</style>
