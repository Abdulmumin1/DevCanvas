<script>
	import { fade } from 'svelte/transition';
	import FeDummyCard from './feDummyCard.svelte';
</script>

<div transition:fade class="customGrid w-full gap-6 rounded-lg">
	{#each [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6] as a}
		<FeDummyCard />
	{/each}
</div>

<style>
	.customGrid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
	}
</style>
