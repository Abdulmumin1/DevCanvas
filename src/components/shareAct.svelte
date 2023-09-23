<script>
	import {
		faArrowUpFromBracket,
		faLink,
		faShareFromSquare
	} from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { slide } from 'svelte/transition';
	import { showToast } from '$lib/index.js';
	let isClicked = false;

	export let link;
	function shareCode(event) {
		event.target.disabled = true;
		isClicked = true;

		copyToClipboard(link);
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
	class="cursor-pointer flex items-center justify-center gap-2"
	on:click={shareCode}
	class:scale-90={isClicked}
>
	<!-- {#if isClicked} -->
	<div transition:slide class:scale-110={isClicked} class="transition-all duration-300">
		<Fa icon={faArrowUpFromBracket} class="transition-all duration-300" />
	</div>
	<!-- {/if} -->
</button>
