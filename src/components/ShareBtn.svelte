<script>
	import { faArrowUpFromBracket, faLink } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { slide } from 'svelte/transition';
	import { browser } from '$app/environment';
	import { showToast } from '$lib/index.js';
	import { page } from '$app/stores';
	let isClicked = false;

	let showPreview = $page.url.pathname.endsWith('/edit');
	function shareCode(event) {
		let fullUrl = `${$page.url.origin}${$page.url.pathname.replace('/edit', '')}`;
		event.target.disabled = true;
		isClicked = true;

		copyToClipboard(fullUrl);
		setTimeout(() => {
			isClicked = false;
		}, 3000);
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
	class="flex cursor-pointer items-center justify-center gap-2 rounded bg-sky-300 p-1 px-3 py-2 text-primary transition-transform duration-300 active:scale-75"
	on:click={shareCode}
	aria-busy={isClicked}
>
	<!-- {#if isClicked} -->
	<div transition:slide class:scale-110={isClicked} class="transition-all duration-300">
		<Fa icon={faLink} class="transition-all duration-300" />
	</div>
	<!-- {/if} -->
	<span class="hidden md:flex">Share</span>
</button>

<style>
</style>
