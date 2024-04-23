<script>
	import { scale, slide } from 'svelte/transition';

	let open = false;

	function toggleAccordion() {
		open = !open;
	}

	export let title, content;
</script>

<li class=" flex flex-col items-center justify-center gap-2 text-xl md:text-2xl">
	<button on:click={toggleAccordion} class=" flex items-center justify-center gap-2">
		<span class="">{title}</span>
		<svg
			class="h-5 w-5 rotate-0 transform transition-transform"
			class:rotate-180={open}
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
		</svg>
	</button>
	{#if open}
		<div transition:slide>
			<div class="max-w-lg bg-white p-2 text-center text-base dark:bg-primary md:text-lg">
				{content}
			</div>
		</div>
	{/if}
</li>

<style>
	/* Define Tailwind CSS classes and custom styles here */
</style>
