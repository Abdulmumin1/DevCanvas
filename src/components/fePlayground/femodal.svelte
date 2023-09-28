<script>
	import { scale, slide } from 'svelte/transition';
	import Fa from 'svelte-fa';
	import { faClose } from '@fortawesome/free-solid-svg-icons';

	import { showModal, externalStuff } from '$lib/feEditor/store.js';
	import { clickOutside } from '$lib/index.js';

	let js = $externalStuff.js;
	let css = $externalStuff.css;
	let html = $externalStuff.html;

	$: {
		externalStuff.update((cur) => {
			return { html, css, js };
		});
	}

	function closeModal() {
		showModal.set(false);
		console.log('clolse');
	}
</script>

<div
	transition:slide={{ axis: 'x' }}
	use:clickOutside
	on:click_outside={closeModal}
	class="absolute z-50 w-[400px] inset-y-0 backdrop-blur-lg h-full m-2 shadow-md border-l-2 bg-white dark:bg-primary border-sky-500 p-3 rounded flex flex-col overflow-scroll gap-2"
>
	<div class="absolute top-0 right-0 m-2">
		<button on:click={closeModal}>
			<Fa icon={faClose} />
		</button>
	</div>
	<div class="w-full">
		<p>Head</p>
		<textarea
			name=""
			id=""
			cols="30"
			rows="5"
			placeholder="Content for the head"
			class="bg-gray-100 dark:bg-secondary-dark w-full outline-none font-thin"
			spellcheck="false"
			bind:value={html}
		/>
	</div>

	<div class="w-full hidden">
		<p>CSS</p>
		<textarea
			name=""
			id=""
			cols="30"
			rows="5"
			placeholder="External CSS links"
			class="bg-gray-100 dark:bg-secondary-dark w-full outline-none font-thin"
			spellcheck="false"
			bind:value={css}
		/>
	</div>

	<div class="w-full">
		<p>JS</p>
		<input
			name=""
			placeholder="External Script Link"
			class="bg-gray-100 dark:bg-secondary-dark w-full outline-none font-thin p-2"
			spellcheck="false"
			bind:value={js}
		/>
	</div>
</div>

<style>
	textarea {
		@apply font-thin;
	}
</style>
