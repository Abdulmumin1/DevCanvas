<script>
	import Msdropdown from './msdropdown.svelte';
	import Save from './save.svelte';
	import { previewMode, user } from '$lib/index.js';
	import { page } from '$app/stores';

	import ShareBtn from './ShareBtn.svelte';
	import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import Darkmode from './darkmode.svelte';

	let signinURL = handleRedirectURL($page.url);
</script>

<nav class=" w-full p-2">
	<ul
		class="w-full rounded-lg bg-white dark:bg-[#191919] flex justify-between items-center p-3 shadow text-black"
	>
		<li class="text-xl text-sky-400 font-bold px-3 py-1">
			<a href="/"><span class="text-secondary-dark dark:text-white">Snippets</span>Land</a>
		</li>
		<ul class="flex gap-2 items-center justify-center">
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
