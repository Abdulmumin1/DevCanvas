<script>
	import { githubDark } from 'svelte-highlight/styles';
	import EmbedComponent from '../../../../components/embedComponent.svelte';
	import { Splitpanes, Pane } from 'svelte-splitpanes';
	import FeEmbedComponent from '../../../../components/fePlayground/feEmbedComponent.svelte';
	import CodeOutput from '../../../../components/fePlayground/codeOutput.svelte';
	import { current_data } from '$lib/index.js';
	import Resizable from '../../../../components/fePlayground/resizable.svelte';
	export let data;

	current_data.set(data.details);
	// console.log($current_data.html);
</script>

<svelte:head>
	{@html githubDark}
</svelte:head>
<div class="text-sm h-[100dvh] p-1 bg-secondary-dark rounded">
	<div class="h-full rounded-xl p-1">
		<Resizable>
			<div slot="left" class="w-full h-full bg-[#0d1117] mb-4">
				<FeEmbedComponent details={data.details} />
			</div>
			<div slot="right" class="w-full h-full">
				<CodeOutput code={data.details.html} css={data.details.css} js={data.details.js} />
			</div>
		</Resizable>
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
