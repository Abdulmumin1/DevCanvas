<script>
	import Msdropdown from './msdropdown.svelte';
	import Save from './save.svelte';
	import { previewMode, user } from '$lib/index.js';

	import ShareBtn from './ShareBtn.svelte';
	import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
</script>

<nav class=" w-full">
	<ul class="w-full flex justify-between items-center p-4 shadow">
		<li class="text-xl text-sky-400 font-bold px-3 py-1">
			<a href="/"><span class="text-secondary-dark">Snippets</span>Land</a>
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
				{#if $user}
					<Msdropdown />
				{:else}
					<li
						class="bg-sky-400 px-3 shadow-sm shadow-sky-800 py-2 rounded-lg hover:scale-105 transition-transform duration-300"
					>
						<a
							href="/signin"
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
