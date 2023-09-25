<script>
	import { getProfile } from '$lib/utils.js';

	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import html2canvas from 'html2canvas';
	import { onMount } from 'svelte';
	import Fa from 'svelte-fa';
	import { faEye } from '@fortawesome/free-solid-svg-icons';
	import ShareAct from '../shareAct.svelte';

	let session = $page.data.session;
	export let details;
</script>

<div
	class="bg-sky-100 hover:scale-105 duration-300 transition-all rounded-xl p-1 dark:bg-secondary-dark h-full shadow-sm"
>
	<!-- <div class=" rounded-xl bg-white w-full" bind:this={letsee}>
		<img src={capturedImageUrl} alt="" srcset="" />
	</div> -->
	<iframe
		src="{$page.url.origin}/play/{details.project_key}/preview?preview=preview"
		title="fs"
		height="200"
		frameborder="0"
		class="w-full overflow-hidden rounded-xl"
	/>
	<!-- {#if !capturedImageUrl}
	{/if} -->

	<div class="flex flex-col p-2 items-start">
		<a href="/play/{details.project_key}" class="text-xl font-semibold hover:opacity-80"
			>{details.description}
		</a>

		<div class="flex justify-between items-center w-full">
			{#if details.user_id == session?.user?.id}
				<p
					in:fade
					class="text-sky-400 dark:text-sky-300 outline-none focus:outline-sky-300 focus:dark:outline-sky-400 rounded-lg text-sm"
					spellcheck="false"
				>
					<a href="/{details.profile}">You</a>
				</p>
			{:else if details?.profile}
				<div in:fade>
					<p>
						<span>by</span>
						<a class="text-sky-400 dark:text-sky-300 text-sm" href={`/${details.profile}`}
							>@{details.profile}</a
						>
					</p>
				</div>
			{:else}
				<div in:fade>
					<span>by</span>
					<a class="text-sky-400 dark:text-sky-300 text-sm" href={`/anon`}>Anonymous user</a>
				</div>
			{/if}
			<div class="flex gap-2 items-center justify-center w-fit">
				<span class="flex items-center justify-center gap-2 w-fit"
					><Fa icon={faEye} />{new Object(details.view).length > 0
						? details.view[0].views
						: '....'}</span
				>
				<!-- {JSON.stringify(details.view)} -->
				<ShareAct link="{$page.url.origin}/play/{details.project_key}" />
			</div>
		</div>
	</div>
</div>
