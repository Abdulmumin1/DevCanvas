<script>
	import Msdropdown from './msdropdown.svelte';
	import Save from './save.svelte';
	import { previewMode, user, current_data } from '$lib/index.js';
	import Fa from 'svelte-fa';
	import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';

	function shareCode(event) {
		console.log(event.target);
	}
</script>

<nav class=" w-full">
	<ul class="w-full flex justify-between items-center p-4 shadow">
		<li class="text-2xl text-sky-400 font-bold"><a href="/signin">Snippets</a></li>
		<ul class="flex gap-3 items-center justify-center">
			<li class="bg-sky-300 px-3 shadow-sm py-2 rounded-lg cursor-pointer group">
				<button
					class="w-full h-full flex items-center justify-center gap-2 share-btn"
					on:click={shareCode}
					><Fa icon={faArrowUpFromBracket} class="group-hover:animate-bounce" />Share</button
				>
			</li>
			<li>
				{#if !$previewMode}
					<Save />
				{/if}
			</li>

			<li>
				<Msdropdown />
			</li>
		</ul>
	</ul>
</nav>
