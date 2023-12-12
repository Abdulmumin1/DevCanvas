<script>
	import FeEmbedComponent from '../../../../components/fePlayground/feEmbedComponent.svelte';
	import { current_data } from '$lib/index.js';
	export let data;

	current_data.set(data.details);
	// console.log($current_data.html);
</script>

<div class="text-sm bg-transparent h-[100dvh] p-1 bg-secondary-dark rounded">
	<div class="h-full rounded-xl p-1">
		<div class="w-full h-full bg-[#0b0e14] mb-4">
			<FeEmbedComponent details={data.details} />
		</div>
	</div>
</div>
<!-- 
<style>
	/* Hide the vertical scrollbar */
	::-webkit-scrollbar {
		width: 0;
	}

	/* Hide the horizontal scrollbar */
	::-webkit-scrollbar {
		height: 0;
	}
</style> -->
