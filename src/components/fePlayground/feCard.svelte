<script>
	import { getProfile } from '$lib/utils.js';

	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import Fa from 'svelte-fa';
	import { faEye } from '@fortawesome/free-solid-svg-icons';
	import ShareAct from '../shareAct.svelte';
	import DeleteCanvas from './deleteCanvas.svelte';
	import { onMount } from 'svelte';

	let session = $page.data.session;
	let supabase = $page.data.supabase;
	export let details;

	let profile = false;

	onMount(async () => {
		const user_name = await getProfile(details.user_id, supabase);
		// Assuming getProfile returns an object with a 'user_name' property
		if (new Object(user_name).length > 0) {
			profile = user_name[0].username;
			console.log(profile);
		}
	});
</script>

<div
	class="bg-sky-100 card duration-300 transition-all rounded-xl p-1 dark:bg-secondary-dark h-full shadow-sm flex flex-col"
>
	<!-- <div class=" rounded-xl bg-white w-full" bind:this={letsee}>
		<img src={capturedImageUrl} alt="" srcset="" />
	</div> -->
	<iframe
		src="{$page.url.origin}/play/{details.project_key}/preview?preview=preview"
		title="fs"
		height="200"
		frameborder="0"
		scrolling="no"
		class="w-full h-[250px] overflow-hidden rounded-xl"
		style="aspect-ratio: 1/1;"
	/>
	<!-- {#if !capturedImageUrl}
	{/if} -->

	<div class="flex flex-col p-2 items-start text-base">
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
					<a href="/{profile}">You</a>
				</p>
			{:else if profile}
				<div in:fade>
					<p>
						<span>by</span>
						<a class="text-sky-400 dark:text-sky-300 text-sm" href={`/${profile}`}>@{profile}</a>
					</p>
				</div>
			{:else}
				<div in:fade class="flex gap-2 items-center justify-center">
					<span>by</span>
					<!-- <a class="text-sky-400 dark:text-sky-300 text-sm" href={`/anon`}>Anonymous user</a> -->
					<div class="w-12 h-4 rounded-2xl animate-pulse bg-sky-100 dark:bg-gray-400" />
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
				{#if details.user_id == session?.user?.id && $page.url.pathname == '/dashboard'}
					<DeleteCanvas canvas_id={details.project_key} title={details.description} />
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	.card:hover {
		transform: translateY(-10px);
		/* box-shadow: 10px 10px 0px rgba(0, 0, 0, 0.4); */
	}
	.card {
		max-width: 350px;
	}
</style>
