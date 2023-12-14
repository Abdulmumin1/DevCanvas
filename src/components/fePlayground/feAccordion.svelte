<script>
	import { scale, slide } from 'svelte/transition';

	let open = false;

	function toggleAccordion() {
		open = !open;
	}

	export let title;
</script>

<li class="  flex flex-col gap-2 bg-sky-100 dark:bg-primary p-1 rounded-xl mb-2">
	<button on:click={toggleAccordion} class="flex gap-2 items-center">
		<span class="p-1 px-2 dark:text-black">{title}</span>
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
		<div transition:slide class="p-1">
			<slot />
		</div>
	{/if}
</li>

<style>
	/* Define Tailwind CSS classes and custom styles here */
</style>
