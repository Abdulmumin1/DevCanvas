<script>
	import {
		faAngleDown,
		faAngleRight,
		faExclamationCircle
	} from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { scale, slide } from 'svelte/transition';
	import { page } from '$app/stores';
	import { copyTextToClipboard, current_data } from '$lib/index.js';

	$: expanded = false;
	$: s_icon = expanded ? faAngleDown : faAngleRight;

	function expand() {
		expanded = !expanded;
	}

	let embed_url = `${$page.url.origin}${$page.url.pathname.replace('/edit', '')}/embed`;

	function copyEmbedUrl(event) {
		event.target.innerText = 'copied';
		copyTextToClipboard(embed_url);
		setTimeout(() => {
			event.target.innerText = 'copy';
		}, 2000);
	}
</script>

<div class="mb-3 flex flex-col gap-2">
	<button on:click={expand} class="flex w-fit items-center justify-center gap-2"
		>Embed link <Fa icon={s_icon} class="transition-all duration-300" /></button
	>
	{#if expanded}
		<div transition:slide class="flex flex-col gap-2">
			<a
				href={embed_url}
				target="_blank"
				class="rounded-md bg-gray-100 p-2 text-sm dark:bg-sky-200 dark:text-primary"
			>
				{embed_url}
			</a>
			<button
				class="w-fit rounded-lg bg-gray-100 px-3 py-1 text-sm text-primary dark:bg-sky-200"
				on:click={(e) => copyEmbedUrl(e)}>Copy</button
			>
		</div>
	{/if}
</div>
