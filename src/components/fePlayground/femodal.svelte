<script>
	import { fade, fly, scale, slide } from 'svelte/transition';
	import Fa from 'svelte-fa';
	import { faClose, faGear, faGreaterThan } from '@fortawesome/free-solid-svg-icons';

	import { showModal, externalStuff } from '$lib/feEditor/store.js';
	import { clickOutside } from '$lib/index.js';
	import { tweened } from 'svelte/motion';
	import Csslist from './externalCSS/csslist.svelte';
	import Jsplugins from './externalJs/jsplugins.svelte';

	let modal;
	let js = $externalStuff.js;
	let css = $externalStuff.css;
	let html = $externalStuff.html;

	$: {
		externalStuff.update((cur) => {
			return { html, css, js };
		});
	}

	function openModal() {
		modal.showModal();
		console.log('gs');
	}

	function closeModal() {
		modal.close();
	}

	let inputField;
	function addMoreJs() {
		const div = document.createElement('div');
		div.classList.add('flex', 'gap-1');
		const newInputField = document.createElement('input');
		newInputField.classList.add(
			'bg-gray-100',
			'dark:bg-primary',
			'w-full',
			'outline-none',
			'font-thin',
			'p-2',
			'rounded'
		);
		newInputField.spellcheck = false;
		newInputField.placeholder = 'External Script Link';

		const removeBtn = document.createElement('button');
		removeBtn.innerText = 'remove';
		removeBtn.classList.add('p-2', 'bg-error', 'rounded', 'text-black');
		removeBtn.onclick = () => {
			div.remove();
		};

		div.appendChild(newInputField);
		div.appendChild(removeBtn);
		inputField.parentNode.insertBefore(div, inputField.nextSibling);
	}
</script>

<button on:click={openModal} class="z-50 hover:scale-105 hover:opacity-80 cursor-pointer"
	><Fa icon={faGear} /></button
>

<dialog
	id="pluginModal"
	transition:fly
	bind:this={modal}
	use:clickOutside
	on:click_outside={closeModal}
	class="p-3 w-[90%] md:w-[500px] h-[80%] md:h-[80%] border-t-4 border-sky-300 dark:bg-black dark:text-white rounded-lg"
>
	<!-- class="modal z-50 backdrop-blur-lg absolute  inset-y-0 inset-x-0 mx-auto m-2 shadow-md border-t-4 bg-white dark:bg-black border-sky-500 p-3 rounded flex flex-col overflow-scroll gap-2" -->
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
			rows="3"
			placeholder="Content for the head"
			class="bg-gray-100 dark:bg-primary w-full outline-none font-thin rounded"
			spellcheck="false"
			bind:value={html}
		/>
	</div>

	<div class="w-full flex flex-col gap-2">
		<p>CSS</p>
		<input
			name=""
			placeholder="External Script Link"
			class="bg-gray-100 dark:bg-primary w-full outline-none font-thin p-2 rounded"
			spellcheck="false"
		/>
		<Csslist />
	</div>

	<div class="w-full flex gap-2 flex-col transition-transform duration-300">
		<p>JS</p>
		<div bind:this={inputField} class="flex gap-2">
			<input
				name=""
				placeholder="External Script Link"
				class="bg-gray-100 dark:bg-primary w-full outline-none font-thin p-2 rounded"
				spellcheck="false"
				bind:value={js}
			/>
			<button class="bg-sky-500 text-primary rounded p-1 px-3" on:click={addMoreJs}> Add</button>
		</div>

		Plugins
		<Jsplugins />
	</div>
</dialog>

<style>
	#pluginModal::-webkit-scrollbar {
		width: 0px;
		height: 0px;
	}

	#pluginModal[open] {
		transform: translateY(0);
	}

	#pluginModal::backdrop {
		backdrop-filter: blur(1px);
	}

	/* Optional styles for backdrop */
	#pluginModal::backdrop {
		background-color: rgba(0, 0, 0, 0.5);
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}

		to {
			opacity: 1;
		}
	}

	@keyframes fadeOut {
		from {
			opacity: 1;
		}

		to {
			opacity: 0;
		}
	}
</style>
