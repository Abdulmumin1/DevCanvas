<script>
	import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { slide } from 'svelte/transition';
	import { browser } from '$app/environment';
	import { showToast } from '$lib/index.js';

	let isClicked = false;
	function shareCode(event) {
		event.target.disabled = true;
		isClicked = true;
		let fullUrl;
		if (browser) {
			fullUrl = window.location.href;
		}
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
	class="bg-sky-300 px-3 shadow-sm py-2 rounded-lg cursor-pointer group flex items-center justify-center gap-2 share-btn"
	on:click={shareCode}
	class:scale-90={isClicked}
>
	<!-- {#if isClicked} -->
	<div transition:slide class:animate-bounce-fast={isClicked} class="transition-all duration-300">
		<Fa icon={faArrowUpFromBracket} class="transition-all duration-300" />
	</div>
	<!-- {/if} -->

	Share</button
>

<style>
</style>
