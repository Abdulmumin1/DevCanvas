<script>
	import Msdropdown from './msdropdown.svelte';
	import Save from './save.svelte';
	import { previewMode, user } from '$lib/index.js';
	import { page } from '$app/stores';
	import ShareBtn from './ShareBtn.svelte';
	import { faPen } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import Darkmode from './darkmode.svelte';
	import { getContext } from 'svelte';
	import FeGetEmbed from './fePlayground/feGetEmbed.svelte';

	// import logo from '$lib/logo.png';
	import Login from './auth/login.svelte';

	let showPreview = $page.url.pathname.endsWith('/edit');
	let back = `${$page.url.pathname}`;
	let showEdit = getContext('isOwner');
</script>

<nav class=" w-full border-b dark:border-secondary-dark">
	<ul class="flex w-full items-center justify-between rounded-lg p-4 text-black">
		<li class="flex items-center gap-1 px-1 py-1 text-lg text-sky-300 md:text-2xl">
			<img src="/logo.svg" class="h-6 w-6" alt="devcanvas" />

			<a href="/snippets"><span class="text-secondary-dark dark:text-white">Dev</span>canvas</a>
		</li>
		<ul class="flex items-center justify-center gap-2">
			{#if showEdit && !showPreview}
				<li class="rounded p-3 dark:text-white">
					<a href={`${back}/edit`}><Fa icon={faPen} /></a>
				</li>
			{/if}
			{#if showPreview}
				<li class="dark:text-white">
					<a href={back.replace('/edit', '')}>Preview</a>
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
			<li class="dark:text-white">
				<Darkmode />
			</li>
			<li>
				<Login />
			</li>
		</ul>
	</ul>
</nav>
