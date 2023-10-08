<script>
	import { onMount } from 'svelte';
	import { cssPlugins, savePlugins, jsPlugins } from '$lib/feEditor/store.js';

	import { current_data } from '$lib/index.js';
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
	// 	// Update the state of the first checkbox to be true
	// 	updateState('materialicons', true);
	// });
</script>

<div class="grid grid-cols-3 gap-2">
	<label class="bg-sky-100 text-black p-1 rounded flex justify-between" for="tailwind"
		>TailwindCSS

		<input type="checkbox" id="tailwind" bind:checked={state.tailwind} />
	</label>

	<label class="bg-sky-100 text-black p-1 rounded flex justify-between" for="bootstrap"
		>BootStrap

		<input type="checkbox" id="bootstrap" bind:checked={state.bootstrap} />
	</label>
	<label class="bg-sky-100 text-black p-1 rounded flex justify-between" for="fontawesome">
		FontAwesome

		<input type="checkbox" id="fontawesome" bind:checked={state.fontawesome} />
	</label>

	<label class="bg-sky-100 text-black p-1 rounded flex justify-between" for="materialicons"
		>Material Icons

		<input type="checkbox" id="materialicons" bind:checked={state.materialicons} />
	</label>

	<label class="bg-sky-100 text-black p-1 rounded flex justify-between" for="googlefonts"
		>Google Fonts

		<input type="checkbox" id="googlefonts" bind:checked={state.googlefonts} />
	</label>

	<label class="bg-sky-100 text-black p-1 rounded flex justify-between" for="bulma"
		>Bulma

		<input type="checkbox" id="bulma" bind:checked={state.bulma} />
	</label>
</div>
