<script>
	import { fade, scale, slide } from 'svelte/transition';
	import Fa from 'svelte-fa';
	import { faClose } from '@fortawesome/free-solid-svg-icons';

	import { showModal, externalStuff } from '$lib/feEditor/store.js';
	import { clickOutside } from '$lib/index.js';
	import { tweened } from 'svelte/motion';

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
	}
</script>

<div class="bc absolute top-0 h-full w-full z-50">
	<div
		transition:scale
		use:clickOutside
		on:click_outside={closeModal}
		class="modal z-50 backdrop-blur-lg absolute w-[60%] h-[60%] inset-y-0 inset-x-0 mx-auto m-2 shadow-md border-t-4 bg-white dark:bg-primary border-sky-500 p-3 rounded flex flex-col overflow-scroll gap-2"
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
</div>

<style>
	.modal::-webkit-scrollbar {
		width: 0px;
		height: 0px;
	}
	.modal {
		z-index: 50;
	}
	.bc {
		background-color: rgba(0, 0, 0, 0.42);
	}
</style>
