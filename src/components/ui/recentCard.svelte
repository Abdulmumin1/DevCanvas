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

	let { card, editIcons } = $props();

	let session = $page.data.session;
	let isOwner = $derived(card.user_id === session?.user?.id);
	let profileUrl = $derived(card.profiles.username ? `/${card.profiles.username}` : '/profile');
	let projectUrl = $derived(card.profiles.username
		? `/${card.profiles.username}/${card.project_key}`
		: `/anonymous/${card.project_key}`);
</script>

<div
	in:slide
	class="w-full overflow-hidden rounded-lg bg-neutral-100 outline-2 outline-sky-300 hover:outline dark:bg-secondary-dark"
>
	<div class="p-6">
		<div class="mb-4 flex items-start justify-between">
			<div>
				<h2
					class="text-xl font-semibold text-neutral-800 transition-colors duration-200 hover:text-sky-600 dark:text-white dark:hover:text-sky-400"
				>
					<a href={projectUrl}>{card.description}</a>
				</h2>
				<a href={profileUrl} class="text-sm text-sky-500 hover:underline dark:text-neutral-300">
					{#if card.profiles.username}
						@{card.profiles.username}
					{:else if isOwner}
						Configure your profile
					{:else}
						....
					{/if}
				</a>
			</div>
			<div class="flex items-center space-x-2 text-neutral-500 dark:text-neutral-400">
				<span class=" w-fit rounded-full bg-sky-300 px-3 py-1 text-sm text-black">
					{card.lang}
				</span>
				<button
					class="rounded-full p-1 transition-colors duration-200 hover:bg-neutral-100 dark:hover:bg-neutral-700"
				>
					<Fa icon={faShareSquare} />
				</button>
				{#if editIcons}
					<a
						href={`${projectUrl}/edit`}
						class="rounded-full p-1 transition-colors duration-200 hover:bg-neutral-100 dark:hover:bg-neutral-700"
					>
						<Fa icon={faEdit} />
					</a>
					<button
						class="rounded-full p-1 transition-colors duration-200 hover:bg-neutral-100 dark:hover:bg-neutral-700"
					>
						<Fa icon={faTrash} />
					</button>
				{/if}
			</div>
		</div>
		<div class="mt-4">
			<div
				class="rounded-md bg-neutral-50 p-3 text-sm text-neutral-600 dark:bg-primary dark:text-neutral-300"
			>
				<code>{card.code?.slice(0, 100)}..</code>
			</div>
		</div>
	</div>
	<div class="bg-neutral-50 px-6 py-3 dark:bg-secondary-dark">
		<a
			href={projectUrl}
			class="flex items-center text-sm text-sky-600 hover:underline dark:text-sky-400"
		>
			View full smippet
			<Fa icon={faExternalLinkAlt} class="ml-1" />
		</a>
	</div>
</div>
