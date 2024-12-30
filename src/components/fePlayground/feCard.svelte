<script>
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import Fa from 'svelte-fa';
	import { faEye } from '@fortawesome/free-solid-svg-icons';
	import ShareAct from '../shareAct.svelte';
	import DeleteCanvas from './deleteCanvas.svelte';
	let session = $page.data.session;
	export let details;

	let profile = details?.profiles?.username;
</script>

<div
	class="card flex h-full flex-col rounded-xl bg-gray-100 p-1 shadow-sm transition-transform duration-300 dark:bg-secondary-dark md:max-w-[350px]"
>
	<iframe
		src="{$page.url.origin}/output/compile/{details.project_key}?p=1"
		title="Project Preview"
		height="200"
		frameborder="0"
		scrolling="no"
		loading="lazy"
		class="h-[250px] w-full overflow-hidden rounded-xl"
		style="aspect-ratio: 1/1; pointer-events: none;"
	/>
	<!-- <img 
	src="{$page.url.origin}/output/image/{details.project_key}"
	loading="lazy"

	class="h-[250px] w-full overflow-hidden rounded-xl object-cover"
		style="aspect-ratio: 1/1; pointer-events: none;"
	alt=""> -->
	<div class="flex flex-col items-start p-2 text-base">
		<a href="/play/{details.project_key}" class="text-xl font-semibold hover:opacity-80">
			{details.description}
		</a>

		<div class="mt-2 flex w-full items-center justify-between">
			{#if details.user_id === session?.user?.id}
				<div in:fade class="flex items-center gap-2">
					<div class="h-5 w-5 rounded-md bg-secondary-dark dark:bg-gray-300"></div>
					<a href="/{profile}">You</a>
				</div>
			{:else if profile}
				<div in:fade class="flex items-center gap-2">
					<div class="h-5 w-5 rounded-md bg-secondary-dark dark:bg-gray-300"></div>
					<a class="text capitalize" href={`/${profile}`}>{profile}</a>
				</div>
			{:else}
				<div in:fade class="flex items-center gap-2">
					<div class="h-5 w-5 rounded-md bg-secondary-dark dark:bg-gray-300"></div>
					<div class="h-4 w-12 animate-pulse rounded-2xl bg-sky-100 dark:bg-gray-400" />
				</div>
			{/if}

			<div class="flex items-center gap-2">
				<span class="flex items-center gap-1 text-xs">
					<Fa icon={faEye} />
					{details.view?.length > 0 ? details.view[0].views : '....'}
				</span>
				<ShareAct
					link="{$page.url.origin}/play/{details.project_key}"
					title={details.description}
				/>
				{#if details.user_id === session?.user?.id && $page.url.pathname === '/dashboard'}
					<DeleteCanvas canvas_id={details.project_key} title={details.description} />
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	.card {
		transition: transform 0.3s ease;
	}

	.card:hover {
		transform: translateY(-10px);
	}
</style>
