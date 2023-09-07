<script>
	import { scale, slide } from 'svelte/transition';

	let open = false;

	function toggleAccordion() {
		open = !open;
	}

	export let title, content;
</script>

<li class=" text-xl md:text-2xl flex flex-col gap-2 items-center justify-center">
	<button on:click={toggleAccordion} class="flex gap-2 items-center justify-center">
		<span>{title}</span>
		<svg
			class="w-5 h-5 transition-transform transform rotate-0"
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
			<div class="p-2 text-base md:text-lg bg-white dark:bg-primary border-t">{content}</div>
		</div>
	{/if}
</li>

<style>
	/* Define Tailwind CSS classes and custom styles here */
</style>
