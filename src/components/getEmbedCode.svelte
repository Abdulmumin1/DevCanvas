<script>
	import {
		faAngleDown,
		faAngleRight,
		faExclamationCircle
	} from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { scale, slide } from 'svelte/transition';
	import { page } from '$app/stores';
	import { copyTextToClipboard } from '$lib/index.js';

	$: expanded = false;
	$: s_icon = expanded ? faAngleDown : faAngleRight;

	function expand() {
		expanded = !expanded;
	}

	let embed_url = `${$page.url}/embed`;

	function copyEmbedUrl(event) {
		event.target.innerText = 'copied';
		copyTextToClipboard(embed_url);
		setTimeout(() => {
			event.target.innerText = 'copy';
		}, 2000);
	}
</script>

<div class="flex flex-col gap-2 mb-3">
	<button on:click={expand} class="flex items-center justify-center w-fit gap-2 text-lg"
		>Embed link <Fa icon={s_icon} class="transition-all duration-300" /></button
	>
	{#if expanded}
		<div transition:slide class="flex flex-col gap-2">
			<a
				href={embed_url}
				target="_blank"
				class="p-2 rounded-md bg-gray-100 dark:bg-sky-200 dark:text-primary"
			>
				{embed_url}
			</a>
			<button
				class="w-fit bg-gray-100 dark:bg-sky-200 px-3 py-1 rounded-lg text-primary"
				on:click={(e) => copyEmbedUrl(e)}>Copy</button
			>
		</div>
	{/if}
</div>
