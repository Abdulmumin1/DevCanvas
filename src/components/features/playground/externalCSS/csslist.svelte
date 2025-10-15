<!-- @migration-task Error while migrating Svelte code: can't migrate `let state = $cssPlugins;` to `$state` because there's a variable named state.
     Rename the variable and try again or migrate by hand. -->
<script>
	import { onMount } from 'svelte';
	import { cssPlugins, savePlugins, jsPlugins } from '$lib/stores/playground.js';

	import { current_data } from '$lib/stores/index.js';
	let state = $cssPlugins;

	let selectMore;
	let delay = 1000;

	$: {
		cssPlugins.set(state);

		// clearTimeout(selectMore);
		// selectMore = setTimeout(() => {
		// 	savePlugins({ css: $cssPlugins, js: $jsPlugins }, $current_data.id);
		// }, delay);
	}

	// onMount(() => {
	// 	// Update the state of the first checkbox tclass="accent-gray-200" o be true
	// 	updateState('materialicons', true);
	// });
</script>

<div class="grid grid-cols-3 gap-2 *:cursor-pointer">
	<label
		class="flex justify-between rounded bg-gray-100 p-2 text-xs text-black dark:bg-secondary-dark dark:text-white md:p-3 md:text-base"
		for="tailwind"
		>TailwindCSS

		<input type="checkbox" class="accent-gray-200" id="tailwind" bind:checked={state.tailwind} />
	</label>

	<label
		class="flex justify-between rounded bg-gray-100 p-2 text-xs text-black dark:bg-secondary-dark dark:text-white md:p-3 md:text-base"
		for="bootstrap"
		>BootStrap

		<input type="checkbox" class="accent-gray-200" id="bootstrap" bind:checked={state.bootstrap} />
	</label>
	<label
		class="flex justify-between rounded bg-gray-100 p-2 text-xs text-black dark:bg-secondary-dark dark:text-white md:p-3 md:text-base"
		for="fontawesome"
	>
		FontAwesome

		<input
			type="checkbox"
			class="accent-gray-200"
			id="fontawesome"
			bind:checked={state.fontawesome}
		/>
	</label>

	<label
		class="flex justify-between rounded bg-gray-100 p-2 text-xs text-black dark:bg-secondary-dark dark:text-white md:p-3 md:text-base"
		for="materialicons"
		>Material Icons

		<input
			type="checkbox"
			class="accent-gray-200"
			id="materialicons"
			bind:checked={state.materialicons}
		/>
	</label>

	<label
		class="flex justify-between rounded bg-gray-100 p-2 text-xs text-black dark:bg-secondary-dark dark:text-white md:p-3 md:text-base"
		for="googlefonts"
		>Google Fonts

		<input
			type="checkbox"
			class="accent-gray-200"
			id="googlefonts"
			bind:checked={state.googlefonts}
		/>
	</label>

	<label
		class="flex justify-between rounded bg-gray-100 p-4 text-xs text-black dark:bg-secondary-dark dark:text-white md:text-base"
		for="bulma"
		>Bulma

		<input type="checkbox" class="accent-gray-200" id="bulma" bind:checked={state.bulma} />
	</label>
</div>
