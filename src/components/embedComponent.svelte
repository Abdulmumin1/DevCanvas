<script>
	import { HighlightAuto, LineNumbers } from 'svelte-highlight';
	import { copyTextToClipboard } from '$lib/index.js';
	import logo from '$lib/logo.svg';

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

<div class="flex h-fit flex-col rounded bg-white">
	<div class="fixed z-50 flex w-full items-center justify-between bg-secondary-dark p-2">
		<div class="flex h-fit flex-col text-light">
			<div class="flex items-center gap-1" target="_blank">
				<img src={logo} class="h-6 w-6" alt="snippetsLand" />

				<p class="text-sm text-white md:text-xl">
					<a href="/xyz/{details.project_key}" target="_blank">
						{details.description}
					</a>
				</p>
			</div>
			<!-- <a class="w-full" href="http://localhost:5173" target="_parent">go to page</a> -->
		</div>

		<div class="flex items-center justify-center gap-2">
			<div class="rounded-xl bg-primary px-3 py-1 text-light">{details.lang}</div>

			<a
				href="https://snippet-bice.vercel.app"
				target="_blank"
				class=" z-50 rounded-lg bg-primary px-3 py-2 text-light"
			>
				<Fa icon={faExpand} />
			</a>

			<button class=" z-50 rounded-lg bg-primary px-3 py-2 text-light" on:click={CopyAction}
				><Fa icon={iconCopy} /></button
			>
		</div>
	</div>
	<div class="mt-12 bg-white py-4 text-sm md:text-base">
		<HighlightAuto {code} let:highlighted>
			<LineNumbers {highlighted} hideBorder />
		</HighlightAuto>
	</div>
</div>
