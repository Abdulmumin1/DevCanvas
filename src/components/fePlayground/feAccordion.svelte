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

<li class="mb-2 flex flex-col gap-2 rounded-xl bg-gray-100 p-1 dark:bg-primary">
	<button
		on:click={toggleAccordion}
		class="flex items-center gap-2 text-sm text-black dark:text-white"
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
