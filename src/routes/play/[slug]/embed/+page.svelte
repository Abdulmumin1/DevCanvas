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
<div class="text-sm h-[100dvh] p-1 bg-[#0b0e14] rounded">
	<div class="h-full rounded-xl p-1">
		<div class="w-full h-full bg-[#0b0e14] mb-4">
			<FeEmbedComponent details={data.details} />
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
