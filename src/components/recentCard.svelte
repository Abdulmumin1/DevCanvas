<script>
	import { faEvernote } from '@fortawesome/free-brands-svg-icons';
	import {
		faArrowCircleRight,
		faArrowLeftLong,
		faArrowRightLong,
		faArrowUpFromBracket,
		faEdit,
		faEye,
		faTrash,
		faTrashAlt,
		faTrashArrowUp,
		faTrashCan,
		faTrashRestore
	} from '@fortawesome/free-solid-svg-icons';
	import { user_info } from '$lib/index.js';
	import Fa from 'svelte-fa';
	import { scale, slide } from 'svelte/transition';
	import { page } from '$app/stores';
	import { getProfile } from '$lib/utils.js';
	import { profile, prolog, protobuf } from 'svelte-highlight/languages';
	export let card;
	export let editIcons;
	let session = $page.data.session;

	// let profile = getProfile(card.user_id, supabase);
	// console.log(profile);
	// console.log('jfdljafdjlkafdoamda coan');

	// let goto = editIcons ? `/${$user_info?.username}/${card.project_key}` : `/${card.project_key}`;
	// let goto = `/${card.project_key}`;
</script>

<div
	in:slide
	class="w-full p-4 border-y dark:border-primary flex text-sm md:text-base items-center justify-between"
>
	<div class="flex h-fit gap-4 w-full">
		<!-- <div class="min-w-[100px]">
			<h2 class="text-sm mb-2 rounded-xl text-secondary-dark bg-light w-fit px-3 p-1 h-fit">
				{card.lang}
			</h2>
		</div> -->

		{#if card?.profile}
			<div>
				<p class="text-lg md:text-xl font-semibold hover:opacity-80 w-full">
					<a href={`/${card.profile}/${card.project_key}`}>{card.description}</a>
				</p>
				<a class="hover:opacity-80" href={`/${card.profile}`}>@{card.profile}</a>
			</div>
		{:else}
			<div>
				<p class="text-lg md:text-xl font-semibold hover:opacity-80 w-full">
					<a href={`/anonymous/${card.project_key}`}>{card.description}</a>
				</p>
				{#if card.user_id == session?.user?.id}
					<a href="/profile">Configure you profile</a>
				{:else}
					<a class="hover:opacity-80" href="#">....</a>
				{/if}
			</div>
		{/if}
	</div>
	<!-- <p class="bg-gray-100 p-2 rounded-lg overflow-hidden">
	{card.code.slice(0, 100)}...
</p> -->

	<div>
		<div class="w-full flex gap-4 text-secondary-dark dark:text-white items-center">
			<span class="flex gap-2 items-center"><Fa icon={faEye} />...</span>
			<button class="hover:scale-105 transition-all duration-200"
				><Fa icon={faArrowUpFromBracket} class="transition-all duration-300" /></button
			>
			{#if editIcons}
				<a href="/{card.project_key}/edit" class="hover:scale-105 transition-all duration-200">
					<Fa icon={faEdit} />
				</a>

				<a href="/{card.project_key}/edit" class="hover:scale-105 transition-all duration-200">
					<Fa icon={faTrash} />
				</a>
			{/if}
		</div>
	</div>
</div>
