<script>
	import { onMount } from 'svelte';
	import { cssPlugins } from '$lib/feEditor/store.js';

	let state = $cssPlugins;

	$: {
		cssPlugins.set(state);
	}
	function updateState(checkbox, value) {
		state[checkbox] = value;
	}

	onMount(() => {
		// Update the state of the first checkbox to be true
		updateState('materialicons', true);
	});
</script>

<div class="grid grid-cols-3 gap-2">
	<div class="bg-sky-100 text-black p-1 rounded flex justify-between">
		<label for="tailwind">TailwindCSS</label>
		<input type="checkbox" id="tailwind" bind:checked={state.tailwind} />
	</div>

	<div class="bg-sky-100 text-black p-1 rounded flex justify-between">
		<label for="bootstrap">BootStrap</label>
		<input type="checkbox" id="bootstrap" bind:checked={state.bootstrap} />
	</div>
	<div class="bg-sky-100 text-black p-1 rounded flex justify-between">
		<label for="fontawesome">FontAwesome</label>
		<input type="checkbox" id="fontawesome" bind:checked={state.fontawesome} />
	</div>

	<div class="bg-sky-100 text-black p-1 rounded flex justify-between">
		<label for="materialicons">Material Icons</label>
		<input type="checkbox" id="materialicons" bind:checked={state.materialicons} />
	</div>

	<div class="bg-sky-100 text-black p-1 rounded flex justify-between">
		<label for="googlefonts">Google Fonts</label>
		<input type="checkbox" id="googlefonts" bind:checked={state.googlefonts} />
	</div>

	<div class="bg-sky-100 text-black p-1 rounded flex justify-between">
		<label for="bulma">Bulma</label>
		<input type="checkbox" id="bulma" bind:checked={state.bulma} />
	</div>
</div>
