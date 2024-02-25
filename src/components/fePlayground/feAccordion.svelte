<script>
	import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { scale, slide } from 'svelte/transition';

	let open = false;

	function toggleAccordion() {
		open = !open;
	}

	export let title;
</script>

<li class="flex flex-col gap-2 bg-gray-100 dark:bg-primary p-1 rounded-xl mb-2">
	<button
		on:click={toggleAccordion}
		class="flex gap-2 items-center text-black dark:text-white text-sm"
	>
		<!-- <div></div> -->
		<span class="p-1 px-2">{title}</span>
		<Fa icon={faAngleDown} />
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
