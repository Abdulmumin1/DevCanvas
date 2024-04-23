<!-- Carousel.svelte -->
<script>
	import { onMount, setContext } from 'svelte';
	import CarouselComp2 from './carouselComp2.svelte';
	import CarouselComp3 from './carouselComp3.svelte';

	import DummyComponent from './modelLanding.svelte';
	import { scale, slide } from 'svelte/transition';
	import { dummyTitle } from '$lib/feEditor/store.js';

	let currentIndex = 0;
	const components = [CarouselComp2, DummyComponent, CarouselComp3];

	function next() {
		currentIndex = (currentIndex + 1) % components.length;
		if (currentIndex == 0) {
			dummyTitle.set('Hover Animation');
		} else if (currentIndex == 1) {
			dummyTitle.set('Neobrutalist pricing card');
		} else if (currentIndex == 2) {
			dummyTitle.set('Glowing border card');
		}
	}

	function prev() {
		currentIndex = (currentIndex - 1 + components.length) % components.length;
	}

	onMount(() => {
		setInterval(() => {
			next();
		}, 3000);
	});
</script>

<div class="carousel flex flex-col gap-2 text-black">
	<!-- <button on:click={prev}>Previous</button> -->
	{#key currentIndex}
		<div in:slide>
			{#each components as Component, i}
				{#if i === currentIndex}
					<Component />
				{/if}
			{/each}
		</div>
	{/key}
	<div class="mt-2 flex items-center justify-center gap-2">
		{#each components as balls, i}
			<div class="h-[10px] w-[10px] rounded-full bg-black" class:bg-sky-300={i == currentIndex} />
		{/each}
	</div>
	<!-- <button on:click={next}>Next</button> -->
</div>

<style>
	/* Add styling for your carousel here */
</style>
