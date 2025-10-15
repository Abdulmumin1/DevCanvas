<script>
	import { faArrowUpFromBracket, faLink } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { slide } from 'svelte/transition';
	import { showToast } from '$lib/stores/index.js';
	import { faFacebook, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
	let isClicked = false;

	export let link;
	export let title;

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

	let showOptions = false;

	function toggleShareOptions() {
		showOptions = !showOptions;
	}

	function closeShareOptions() {
		showOptions = false;
	}

	const urlEncode = (text) => encodeURIComponent(text);
</script>

<div class="share-dropdown" role="button" tabindex="" on:mouseleave={closeShareOptions}>
	<button
		class="flex cursor-pointer items-center justify-center gap-2"
		on:click={toggleShareOptions}
		class:scale-90={isClicked}
	>
		<!-- {#if isClicked} -->
		<div transition:slide class:scale-110={isClicked} class="transition-all duration-300">
			<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-share2-icon lucide-share-2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>
		</div>
		<!-- {/if} -->
	</button>

	<div class="share-options absolute bottom-0 right-0" class:hidden={!showOptions}>
		<a
			href="https://www.facebook.com/sharer/sharer.php?u={link}&t={urlEncode(title)}"
			target="_blank"
			class="share-option flex w-full items-center gap-4"
		>
			<Fa icon={faFacebook} /> Facebook</a
		>
		<a
			href="https://twitter.com/intent/tweet?url={link}&text={urlEncode(title)}"
			target="_blank"
			class="share-option flex w-full items-center gap-4"><span class="text-xl">𝕏</span> X</a
		>
		<a
			href="https://www.linkedin.com/shareArticle?url={link}&title={urlEncode(title)}"
			target="_blank"
			class="share-option flex w-full items-center gap-4"><Fa icon={faLinkedin} /> LinkedIn</a
		>
		<button class="share-option flex w-full items-center gap-4" on:click={shareCode}
			><Fa icon={faLink} /> Copy link</button
		>
		<!-- Add more social media options as needed -->
	</div>
</div>

<style>
	.share-dropdown {
		position: relative;
	}

	.share-button {
		background-color: #4caf50;
		color: white;
		padding: 10px;
		border: none;
		cursor: pointer;
		border-radius: 5px;
	}

	.share-options {
		position: absolute;
		background-color: #f9f9f9;
		min-width: 160px;
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
		z-index: 1;
		border-radius: 5px;
	}

	.share-option {
		padding: 12px 16px;
		text-decoration: none;
		/* display: block; */
		color: #333;
		transition: background-color 0.3s;
	}

	.share-option:hover {
		background-color: #ddd;
	}
</style>
