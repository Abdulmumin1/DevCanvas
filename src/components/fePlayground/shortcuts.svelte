<script>
	// Object containing shortcuts and their descriptions
	const shortcuts = {
		'Ctrl + .': 'Toggle settings menu',
		'Ctrl + Shift + F': 'Fomart Editor',
		'Ctrl + S': 'Save current document',
		'Ctrl + K': 'Toggle Navigation'
	};

	// Function to format the key combination
	function formatKey(key) {
		return key.replace('Ctrl', 'Cmd') + ' or ' + key;
	}

	import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { scale, slide } from 'svelte/transition';

	let open = false;

	function toggleAccordion() {
		open = !open;
	}
</script>

<li class="mb-2 flex flex-col gap-2 rounded-xl bg-gray-100 p-1 dark:bg-primary">
	<button
		on:click={toggleAccordion}
		class="flex items-center gap-2 px-2 py-2 text-sm text-[#777] dark:text-gray-200"
	>
		<!-- <div></div> -->
		<h2 class=" text-sm font-bold">Available Shortcuts</h2>

		<Fa icon={faAngleDown} />
	</button>
	{#if open}
		<div transition:slide class="p-1">
			<ul class="space-y-3 text-sm">
				{#each Object.entries(shortcuts) as [key, description]}
					<li class="flex items-center justify-between">
						<span class="rounded px-2 py-1 font-mono text-[#444] dark:text-gray-200"
							>{formatKey(key)}</span
						>
						<span class="text-gray-600">{description}</span>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</li>

<style>
	/* Define Tailwind CSS classes and custom styles here */
</style>
