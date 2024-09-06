<script>
	import {
		faEye,
		faShareSquare,
		faEdit,
		faTrash,
		faExternalLinkAlt
	} from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { slide } from 'svelte/transition';
	import { page } from '$app/stores';

	export let card;
	export let editIcons;

	let session = $page.data.session;
	$: isOwner = card.user_id === session?.user?.id;
	$: profileUrl = card.profile ? `/${card.profile}` : '/profile';
	$: projectUrl = card.profile
		? `/${card.profile}/${card.project_key}`
		: `/anonymous/${card.project_key}`;
</script>

<div
	in:slide
	class="w-full overflow-hidden rounded-lg bg-white outline-2 outline-sky-300 hover:outline dark:bg-primary"
>
	<div class="p-6">
		<div class="mb-4 flex items-start justify-between">
			<div>
				<h2
					class="text-xl font-semibold text-gray-800 transition-colors duration-200 hover:text-sky-600 dark:text-white dark:hover:text-sky-400"
				>
					<a href={projectUrl}>{card.description}</a>
				</h2>
				<a href={profileUrl} class="text-sm text-sky-500 hover:underline dark:text-gray-300">
					{#if card.profile}
						@{card.profile}
					{:else if isOwner}
						Configure your profile
					{:else}
						....
					{/if}
				</a>
			</div>
			<div class="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
				<span class=" w-fit rounded-full bg-sky-300 px-3 py-1 text-sm text-black">
					{card.lang}
				</span>
				<button
					class="rounded-full p-1 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
				>
					<Fa icon={faShareSquare} />
				</button>
				{#if editIcons}
					<a
						href={`${projectUrl}/edit`}
						class="rounded-full p-1 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
					>
						<Fa icon={faEdit} />
					</a>
					<button
						class="rounded-full p-1 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
					>
						<Fa icon={faTrash} />
					</button>
				{/if}
			</div>
		</div>
		<div class="mt-4">
			<div
				class="rounded-md bg-gray-100 p-3 text-sm text-gray-600 dark:bg-secondary-dark dark:text-gray-300"
			>
				<code>{card.code?.slice(0, 100)}..</code>
			</div>
		</div>
	</div>
	<div class="bg-gray-50 px-6 py-3 dark:bg-secondary-dark">
		<a
			href={projectUrl}
			class="flex items-center text-sm text-sky-600 hover:underline dark:text-sky-400"
		>
			View full smippet
			<Fa icon={faExternalLinkAlt} class="ml-1" />
		</a>
	</div>
</div>
