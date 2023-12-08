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

<div class="flex divide-x-2 divide-primary">
	<button
		class="active:scale-95 rounded-l bg-gray-300 transition-transform duration-300 cursor-pointer flex items-center justify-center gap-2 text-primary pl-2 py-2 pr-1"
		on:click={showEmbedDialog}
		aria-busy={$showEmbedModal}
	>
		<!-- {#if isClicked} -->
		<div transition:slide class="transition-all duration-300">
			<Fa icon={faCode} class="transition-all duration-300" />
		</div>
		<!-- {/if} -->
		<span class="hidden md:flex">Embed</span>
	</button>
	<div class="px-2 rounded-r py-2 bg-gray-300 flex items-center justify-center">
		<DownloadCodeDropDown />
	</div>
</div>

<style>
</style>
