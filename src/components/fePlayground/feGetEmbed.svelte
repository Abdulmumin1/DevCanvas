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

	let showPreview = $page.url.pathname.endsWith('/edit');
	function showEmbedDialog(event) {
		// event.target.disabled = true;
		showEmbedModal.set(true);
	}
</script>

<button
	class="active:scale-95 transition-transform duration-300 p-1 rounded cursor-pointer flex items-center justify-center gap-2 text-primary bg-gray-300 px-3 py-2"
	on:click={showEmbedDialog}
	aria-busy={$showEmbedModal}
>
	<!-- {#if isClicked} -->
	<div transition:slide class="transition-all duration-300">
		<Fa icon={faCode} class="transition-all duration-300" />
	</div>
	<!-- {/if} -->
	<span class="hidden md:flex">Embed</span>
	<TooltipB text="coming soon" />
</button>

<style>
</style>
