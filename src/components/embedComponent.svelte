<script>
	import { HighlightAuto, LineNumbers } from 'svelte-highlight';
	import { copyTextToClipboard } from '$lib/index.js';

	import { faCopy, faExpand } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	export let details;
	function CopyAction() {
		copyTextToClipboard(code);
	}
	const code = details.code;
</script>

<div class="flex flex-col">
	<div class="fixed w-full bg-secondary-dark flex items-center justify-between p-2 z-50">
		<div class="flex flex-col text-light">
			<a href="https://snippet-bice.vercel.app" target="_blank">
				<p class="text-2xl text-white">Snippets<span class="text-sky-300">Land</span></p>
			</a>
			<!-- <a class="w-full" href="http://localhost:5173" target="_parent">go to page</a> -->
		</div>

		<div class="flex items-center justify-center gap-2">
			<div class="px-3 py-1 rounded-xl bg-primary text-light">{details.lang}</div>

			<a
				href="https://snippet-bice.vercel.app"
				target="_blank"
				class=" bg-primary text-light z-50 px-3 py-2 rounded-lg"
			>
				<Fa icon={faExpand} />
			</a>

			<button class=" bg-primary text-light z-50 px-3 py-2 rounded-lg" on:click={CopyAction}
				><Fa icon={faCopy} /></button
			>
		</div>
	</div>
	<div class="mt-12 text-sm md:text-base">
		<HighlightAuto {code} let:highlighted>
			<LineNumbers {highlighted} hideBorder />
		</HighlightAuto>
	</div>
</div>
