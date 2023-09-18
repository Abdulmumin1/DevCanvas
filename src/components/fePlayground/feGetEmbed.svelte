<script>
	import { faArrowUpFromBracket, faCodeMerge, faLink } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { slide } from 'svelte/transition';
	import { browser } from '$app/environment';
	import { showToast } from '$lib/index.js';
	import { page } from '$app/stores';
	import TooltipB from '../tooltip-b.svelte';
	let isClicked = false;

	let showPreview = $page.url.pathname.endsWith('/edit');
	function shareCode(event) {
		let fullUrl = showPreview
			? `${$page.url.origin}/${$page.url.pathname.split('/')[1]}`
			: window.location.href;
		event.target.disabled = true;
		isClicked = true;

		copyToClipboard(fullUrl);
		setTimeout(() => {
			isClicked = false;
			event.target.disabled = false;
		}, 200);
	}

	async function copyToClipboard(text) {
		try {
			await navigator.clipboard.writeText(text);
			showToast.set({ message: 'Link copied to clipboard.' });
		} catch (error) {
			console.error('Unable to copy text to clipboard:', error);
		}
	}
</script>

<button
	class="p-1 rounded-md cursor-pointer flex items-center justify-center gap-2 text-primary bg-gray-300 px-3 py-2"
	on:click={shareCode}
	disabled
	class:scale-90={isClicked}
>
	<!-- {#if isClicked} -->
	<div transition:slide class:scale-110={isClicked} class="transition-all duration-300">
		<Fa icon={faCodeMerge} class="transition-all duration-300" />
	</div>
	<!-- {/if} -->
	<span class="hidden md:flex">Embed</span>
	<TooltipB text="coming soon" />
</button>

<style>
</style>
