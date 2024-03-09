<script>
	import FeEmbedComponent from '../../../../components/fePlayground/feEmbedComponent.svelte';
	import { current_data } from '$lib/index.js';
	export let data;

	current_data.set(data.details);
	// console.log($current_data.html);
</script>

<div class="text-sm h-[100dvh] bg-black rounded bd overflow-clip">
	<div class="h-full rounded-xl">
		<div class="w-full h-full mb-4">
			<FeEmbedComponent details={data.details} />
		</div>
	</div>
</div>

<style>
	*::-webkit-scrollbar {
		width: 0;
		height: 0;
	}

	.bd {
		border: 1px solid #444;
	}
</style>
