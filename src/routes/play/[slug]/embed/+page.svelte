<script>
	import FeEmbedComponent from '../../../../components/features/playground/feEmbedComponent.svelte';
	import { current_data } from '$lib/stores/index.js';
	export let data;

	current_data.set(data.details);
	// console.log($current_data.html);
</script>

<div class="bd h-[100dvh] overflow-clip rounded bg-black text-sm">
	<div class="h-full rounded-xl">
		<div class="mb-4 h-full w-full">
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
