<script>
	import Msdropdown from './msdropdown.svelte';
	import Save from './save.svelte';
	import { previewMode, user, goto } from '$lib/index.js';

	import ShareBtn from './ShareBtn.svelte';
	import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
</script>

<nav class=" w-full">
	<ul class="w-full flex justify-between items-center p-4 shadow">
		<li class="text-2xl text-sky-400 font-bold"><a href="/">Snippets</a></li>
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
						<button
							class="w-full h-full cursor-pointer flex items-center justify-center gap-2"
							on:click={() => goto('/signin')}
						>
							<Fa icon={faUserGroup} /> Join
						</button>
					</li>
				{/if}
			</li>
		</ul>
	</ul>
</nav>
