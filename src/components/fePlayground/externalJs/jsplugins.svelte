<script>
	import { onMount } from 'svelte';
	import { jsPlugins, cssPlugins } from '$lib/feEditor/store.js';
	import { savePlugins } from '$lib/feEditor/store.js';
	import { current_data } from '$lib/index.js';
	let state = $jsPlugins;

	let selectMore;
	let delay = 1000;

	$: {
		jsPlugins.set(state);

		clearTimeout(selectMore);

		selectMore = setTimeout(() => {
			try {
				savePlugins({ css: $cssPlugins, js: $jsPlugins }, $current_data.id);
			} catch (err) {
				console.error(err);
			}
		}, delay);
	}

	function updateState(event, key) {
		let checkbox = key;
		let value = event.target.checked;
		state[checkbox] = value;
		// console.log(value, checkbox);
	}

	// onMount(() => {
	// 	// Update the state of the first checkbox to be true
	// 	updateState('materialicons', true);
	// });
</script>

<div class="grid grid-cols-3 gap-2">
	{#each Object.keys(state) as key (key)}
		<label
			class="flex justify-between rounded bg-sky-100 p-3 cursor-pointer text-black dark:bg-secondary-dark dark:text-white"
			for={key}
		>
			{key}
			<input type="checkbox" class="accent-sky-200" id={key} bind:checked={state[key]} />
		</label>
	{/each}
</div>
