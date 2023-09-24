<script>
	import { HighlightAuto, LineNumbers } from 'svelte-highlight';
	import { copyTextToClipboard } from '$lib/index.js';
	import logo from '$lib/logo.png';

	import { faCheck, faCopy, faExpand } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	let copied = false;
	$: iconCopy = copied ? faCheck : faCopy;
	export let details;
	function CopyAction() {
		copied = true;
		copyTextToClipboard(code);
		setTimeout(() => {
			copied = false;
		}, 2000);
	}
	const code = details.code;
</script>

<div class="flex flex-col h-[100dvh] bg-secondary-dark rounded">
	<div class="fixed w-full bg-secondary-dark flex items-center justify-between p-2 z-50">
		<div class="flex flex-col text-light">
			<a href="https://snippet-bice.vercel.app" class="flex items-center gap-1" target="_blank">
				<img src={logo} class="h-6 w-6" alt="snippetsLand" />

				<p class="text-xl text-white">{details.description}</p>
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
				><Fa icon={iconCopy} /></button
			>
		</div>
	</div>
	<div class="mt-14 py-4 text-sm">
		<HighlightAuto {code} let:highlighted>
			<LineNumbers {highlighted} hideBorder />
		</HighlightAuto>
	</div>
</div>
