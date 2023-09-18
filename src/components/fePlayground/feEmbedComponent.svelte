<script>
	import github from 'svelte-highlight/styles/github';
	import { Splitpanes, Pane } from 'svelte-splitpanes';
	import { HighlightAuto, Highlight, LineNumbers } from 'svelte-highlight';
	import { css } from 'svelte-highlight/languages';
	export let details;

	let showOther = false;
	function toogle() {
		showOther = !showOther;
	}
</script>

<div class="h-full max-w-full">
	<div class="w-full bg-secondary-dark p-2 flex gap-2 text-white">
		<button on:click={toogle} class:border-b={!showOther}>HTML</button>
		<button on:click={toogle} class:border-b={showOther}>CSS</button>
	</div>
	<div class:hidden={showOther} class="hidden h-full">
		<div class="w-full overflow-scroll h-full text-sm">
			<HighlightAuto code={details.html} let:highlighted>
				<LineNumbers {highlighted} hideBorder />
			</HighlightAuto>
		</div>
	</div>
	<div class:hidden={!showOther} class="h-full overflow-scroll text-sm">
		<div class="w-full overflow-scroll h-full">
			<Highlight language={css} code={details.css} let:highlighted>
				<LineNumbers {highlighted} hideBorder />
			</Highlight>
		</div>
	</div>
</div>

<style>
	/* Hide the vertical scrollbar */
	::-webkit-scrollbar {
		width: 0;
	}

	/* Hide the horizontal scrollbar */
	::-webkit-scrollbar {
		height: 0;
	}
</style>
