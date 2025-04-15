<script>
	import { faArrowUpFromBracket, faLink } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { slide } from 'svelte/transition';
	import { browser } from '$app/environment';
	import { showToast } from '$lib/index.js';
	import { page } from '$app/stores';
	import FeSettingsDropdown from './fePlayground/feSettingsDropdown.svelte';
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

<div
class="flex h-[35px] cursor-pointer items-center justify-center md:gap-0 md:divide-x-2 md:divide-primary   text-primary "

>
	<button
	class="flex items-center gap-1 h-full  py-1 pl-2 pr-1 transition-transform duration-300 active:scale-75 bg-gradient-to-r from-sky-400 to-sky-300 rounded-l"
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
<div class="flex h items-center h-full justify-center rounded bg-gray-300 px-0 py-1 md:rounded-l-none">
	<FeSettingsDropdown />
</div>

</div>
<style>
</style>
