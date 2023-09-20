<script>
	import { getProfile } from '$lib/utils.js';

	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import html2canvas from 'html2canvas';
	import { onMount } from 'svelte';

	let session = $page.data.session;
	export let details;
</script>

<div
	class="bg-sky-100 hover:scale-105 duration-300 transition-all rounded-xl p-1 dark:bg-secondary-dark"
>
	<!-- <div class=" rounded-xl bg-white w-full" bind:this={letsee}>
		<img src={capturedImageUrl} alt="" srcset="" />
	</div> -->
	<iframe
		src="{$page.url.origin}/html-playground/{details.project_key}/preview"
		title="fs"
		height="200"
		frameborder="0"
		class="w-full overflow-hidden"
	/>
	<!-- {#if !capturedImageUrl}
	{/if} -->
	<div>{details.description}</div>

	{#if details.user_id == session?.user?.id}
		<p
			in:fade
			class="text-sky-400 dark:text-sky-300 outline-none focus:outline-sky-300 focus:dark:outline-sky-400 rounded-lg text-sm"
			spellcheck="false"
		>
			<a href="/html-playground">You</a>
		</p>
	{:else if details?.profile}
		<p
			in:fade
			class="text-sky-400 dark:text-sky-300 outline-none focus:outline-sky-300 focus:dark:outline-sky-400 rounded-lg text-sm"
			spellcheck="false"
		>
			<a href={`/${details.profile}`}>@{details.profile}</a>
		</p>
	{:else}
		<p
			in:fade
			class="text-sky-400 dark:text-sky-300 outline-none focus:outline-sky-300 focus:dark:outline-sky-400 rounded-lg text-sm"
			spellcheck="false"
		>
			<a href={`/anon`}>Anonymous user</a>
		</p>
	{/if}

	<a href="/html-playground/{details.project_key}">Goto </a>
</div>
