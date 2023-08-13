<script>
	import Msdropdown from './msdropdown.svelte';
	import Save from './save.svelte';
	import { previewMode } from '$lib/index.js';

	import ShareBtn from './ShareBtn.svelte';
</script>

<nav class=" w-full">
	<ul class="w-full flex justify-between items-center p-4 shadow">
		<li class="text-2xl text-sky-400 font-bold"><a href="/signin">Snippets</a></li>
		<ul class="flex gap-3 items-center justify-center">
			<li>
				<ShareBtn />
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
