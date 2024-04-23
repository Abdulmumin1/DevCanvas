<script>
	import { fly } from 'svelte/transition';
	import Fa from 'svelte-fa';
	import { faClose } from '@fortawesome/free-solid-svg-icons';

	import { showModal, externalStuff } from '$lib/feEditor/store.js';
	import { clickOutside } from '$lib/index.js';
	import Csslist from './externalCSS/csslist.svelte';
	import Jsplugins from './externalJs/jsplugins.svelte';
	import { onMount, tick } from 'svelte';
	import SaasProcessor from './saasProcessor.svelte';
	import AddTags from './pluginModal/addTags.svelte';
	import BabelProcessor from './babelProcessor.svelte';
	import TypescriptProcessor from './typescriptProcessor.svelte';
	import OtherjsPlugins from './externalJs/otherjsPlugins.svelte';

	let modal;
	let js = $externalStuff.js;
	let css = $externalStuff.css;
	let html = $externalStuff.html;

	$: {
		externalStuff.update((cur) => {
			return { html, css, js };
		});
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

	function closeModal() {
		showModal.set(false);
		// modal.close();
	}

	onMount(() => {
		modal.showModal();
	});

	let tabPlugin = true;

	function showPlugin() {
		tabPlugin = true;
	}

	function showEditor() {
		tabPlugin = false;
	}
</script>

<dialog
	id="pluginModal"
	in:fly={{ y: 100 }}
	out:fly={{ y: 80, duration: 150 }}
	bind:this={modal}
	class="h-[80%] w-[90%] rounded-lg px-2 pb-2 text-sm dark:bg-black dark:text-white md:h-[900px] md:w-[500px]"
>
	<div use:clickOutside on:click_outside={closeModal} class=" flex flex-col gap-4">
		<!-- class="modal z-50 backdrop-blur-lg absolute  inset-y-0 inset-x-0 mx-auto m-2 shadow-md border-t-4 bg-white dark:bg-black border-sky-500 p-3 rounded flex flex-col overflow-scroll gap-2" -->
		<div
			class="sticky top-0 flex items-end justify-between border-b-2 border-sky-300 bg-white pb-2 pt-4 text-black dark:bg-black dark:text-white"
		>
			<div class="flex gap-2 px-2">
				<button on:click={showPlugin} class:border-b-2={tabPlugin}>Plugins</button>
				<button on:click={showEditor} class:border-b-2={!tabPlugin}>Editor</button>
			</div>

			<button class="px-2" on:click={closeModal}>
				<Fa icon={faClose} />
			</button>
		</div>

		<div id="tabPlugins" class:hidden={!tabPlugin} class="flex flex-col gap-2">
			<div class="w-full">
				<p>Head</p>
				<textarea
					name=""
					id=""
					cols="30"
					rows="3"
					placeholder="Content for the head"
					class="w-full rounded bg-gray-100 font-thin outline-none dark:bg-primary"
					spellcheck="false"
					bind:value={html}
				/>
			</div>

			<div class="flex w-full flex-col gap-2">
				<p>CSS Plugin</p>
				<Csslist />
			</div>

			<div class="flex w-full flex-col gap-2 transition-transform duration-300">
				Plugins
				<Jsplugins />
				<OtherjsPlugins />
			</div>
		</div>

		<div id="tabEditor" class:hidden={tabPlugin} class="flex flex-col gap-2">
			<div>CSS PreProcessor</div>
			<SaasProcessor />
			<div>Javascript Processors</div>
			<div class="flex flex-col gap-2 rounded-lg bg-gray-300 p-2 dark:bg-primary">
				<BabelProcessor />
				<TypescriptProcessor />
			</div>
			<!-- <AddTags /> -->
		</div>
	</div>
</dialog>

<style>
	#pluginModal {
		max-height: 600px;
	}
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
