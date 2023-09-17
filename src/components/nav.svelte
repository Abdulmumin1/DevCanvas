<script>
	import Msdropdown from './msdropdown.svelte';
	import Save from './save.svelte';
	import { previewMode, user } from '$lib/index.js';
	import { page } from '$app/stores';
	import { handleRedirectURL } from '$lib/utils.js';
	import ShareBtn from './ShareBtn.svelte';
	import { faPen, faPenSquare, faUserGroup } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import Darkmode from './darkmode.svelte';
	import { getContext } from 'svelte';

	let signinURL = handleRedirectURL($page.url);

	let showPreview = $page.url.pathname.endsWith('/edit');
	let back = `/${$page.url.pathname.split('/')[1]}`;
	let showEdit = getContext('isOwner');
	console.log(back);
</script>

<nav class=" w-full border-b dark:border-secondary-dark">
	<ul class="w-full rounded-lg flex justify-between items-center p-4 text-black">
		<li class="text-xl md:text-3xl text-sky-400 px-3 py-1">
			<a href="/"><span class="text-secondary-dark dark:text-white">Snippets</span>Land</a>
		</li>
		<ul class="flex gap-2 items-center justify-center">
			{#if showEdit && !showPreview}
				<li class="dark:text-white p-3 rounded">
					<a href={`${back}/edit`}><Fa icon={faPen} /></a>
				</li>
			{/if}
			{#if showPreview}
				<li class="dark:text-white">
					<a href={back}>Preview</a>
				</li>
			{/if}
			<li>
				<ShareBtn />
			</li>
			<li>
				{#if !$previewMode}
					<Save />
				{/if}
			</li>
			<li>
				<Darkmode />
			</li>
			<li>
				{#if $user}
					<Msdropdown />
				{:else}
					<li
						class="bg-sky-400 px-3 shadow-sm shadow-sky-800 py-2 rounded-lg hover:scale-105 transition-transform duration-300"
					>
						<a
							href={signinURL}
							class="w-full h-full cursor-pointer flex items-center justify-center gap-2"
						>
							<Fa icon={faUserGroup} /> Join
						</a>
					</li>
				{/if}
			</li>
		</ul>
	</ul>
</nav>
