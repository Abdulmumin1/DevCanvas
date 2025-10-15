<script>
	import { Loader2 } from 'lucide-svelte';

	export let version = 1;
	export let inProgress = false;
	export let codeBlock;

	function handleClick() {
		const myEvent = new CustomEvent('codeSwap', {
			detail: { code: codeBlock, lang: 'html' }
		});

		window.dispatchEvent(myEvent);
	}
</script>

<span
	on:click={handleClick}
	class="inline-block w-full cursor-pointer rounded-xl border border-sky-200 bg-sky-50 bg-gradient-to-r from-sky-400 to-sky-300 px-2 py-4 transition-all duration-300 hover:rounded-2xl"
>
	Code Artifact {inProgress ? ' (in progress)' : ''}
	<div>
		{''}
	</div>
</span>
