<script>
	import { fly } from 'svelte/transition';
	import Fa from 'svelte-fa';
	import { faClose, faGear } from '@fortawesome/free-solid-svg-icons';

	import { externalStuff } from '$lib/feEditor/store.js';
	import { clickOutside } from '$lib/index.js';
	import Csslist from './externalCSS/csslist.svelte';
	import Jsplugins from './externalJs/jsplugins.svelte';
	import SaasProcessor from './saasProcessor.svelte';
	import BabelProcessor from './babelProcessor.svelte';
	import TypescriptProcessor from './typescriptProcessor.svelte';
	import OtherjsPlugins from './externalJs/otherjsPlugins.svelte';
	import SideComponent from '$components/fePlayground/editorSets/sideComponent.svelte';
	import Shortcuts from '$components/fePlayground/shortcuts.svelte';
	import { onMount, onDestroy } from 'svelte';

	let modal = false;

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
		modal = false;
	}

	let tabPlugin = false;
	let activeTab = 'editor';

	function setTab(tab) {
		activeTab = tab;
		tabPlugin = !tabPlugin;
	}

	function handleShortcut(event) {
		if ((event.ctrlKey || event.metaKey) && event.key === '.') {
			event.preventDefault();
			// Your action here
			modal = !modal;
		}
	}

	onMount(() => {
		window.addEventListener('keydown', handleShortcut);

		return () => {
			window.removeEventListener('keydown', handleShortcut);
		};
	});

	// onDestroy(()=>{
	// })
</script>

<button
	on:click={() => {
		modal = !modal;
		// showEditor()
	}}
	class="cursor-pointer hover:scale-105 hover:opacity-80"
	><Fa icon={faGear} />
</button>

{#if modal}
	<div
		id="pluginModal"
		in:fly={{ y: 100 }}
		out:fly={{ y: 80, duration: 150 }}
		use:clickOutside
		on:click_outside={closeModal}
		class="bottom-0 z-50 flex flex-col items-center rounded-b-none rounded-t-lg bg-white px-2 pb-2 text-sm text-black dark:bg-black dark:text-white md:bottom-[5px] md:h-[900px] md:w-[500px] md:rounded-lg md:shadow-xl"
	>
		<div
			class="sticky top-0 z-50 mb-6 flex w-full items-center justify-center border-b border-sky-300 bg-white pb-2 pt-4 text-black dark:bg-black dark:text-white"
		>
			<!-- <div
				class="flex w-full max-w-6xl items-center justify-center gap-4 px-2 text-base md:text-lg"
			>
				<button on:click={showEditor} class:font-bold={!tabPlugin}>Editor</button>
				<div class="text-lg font-bold">·</div>
				<button on:click={showPlugin} class:font-bold={tabPlugin}>Plugins</button>
			</div> -->

			<div class="w-full max-w-6xl px-2 text-base md:text-lg">
				<div class="relative flex items-center gap-4">
					<button
						on:click={() => setTab('editor')}
						class="py-2 transition-colors duration-200 {activeTab === 'editor'
							? 'text-primary'
							: 'text-gray-600 hover:text-sky-300'}"
					>
						Editor
					</button>
					<button
						on:click={() => setTab('plugins')}
						class="py-2 transition-colors duration-200 {activeTab === 'plugins'
							? 'text-primary'
							: 'text-gray-600 hover:text-sky-300'}"
					>
						Plugins
					</button>
					<div
						class="absolute top-0 h-full rounded-lg bg-sky-400 px-2 transition-all duration-300"
						style="left: {activeTab === 'editor' ? '-7px' : '63px'}; width: {activeTab === 'editor'
							? '60px'
							: '68px'}; z-index:-1; "
					/>
				</div>
			</div>

			<button
				class="absolute right-0 top-[50%] h-[75%] translate-y-[-50%] rounded-lg bg-red-600 px-5 hover:bg-red-700"
				on:click={closeModal}
			>
				<Fa icon={faClose} />
			</button>
		</div>
		<div class="flex w-full max-w-6xl flex-col gap-4 px-1">
			<!-- class="modal z-50 backdrop-blur-lg absolute  inset-y-0 inset-x-0 mx-auto m-2 shadow-md border-t-4 bg-white dark:bg-black border-sky-500 p-3 rounded flex flex-col overflow-scroll gap-2" -->

			<div id="tabPlugins" class:hidden={!tabPlugin} class="flex flex-col gap-2">
				<div class="w-full">
					<p class="text-base font-semibold">Head</p>
					<textarea
						name=""
						id=""
						cols="30"
						rows="3"
						placeholder="Content for the head"
						class="w-full rounded-xl bg-gray-100 p-2 font-thin outline-none dark:bg-primary"
						spellcheck="false"
						bind:value={html}
					/>
				</div>

				<div class="flex w-full flex-col gap-2">
					<p class="font-semibold">CSS Plugins</p>
					<Csslist />
				</div>

				<div class="flex w-full flex-col gap-2 transition-transform duration-300">
					<div class="font-semibold">Js Plugins</div>
					<Jsplugins />
					<OtherjsPlugins />
				</div>
			</div>

			<div id="tabEditor" class:hidden={tabPlugin} class="flex flex-col gap-2">
				<SideComponent />

				<div class="px- mt-2 flex flex-col gap-2 font-semibold">
					CSS PreProcessor

					<SaasProcessor />
				</div>
				<!-- <div  class="font-semibold px-2">Javascript Processors</div>
			<div class="flex flex-col gap-2 rounded-lg bg-gray-300 p-2 dark:bg-primary">
				<BabelProcessor />
				<TypescriptProcessor />
			</div> -->
				<!-- <AddTags /> -->
			</div>

			<Shortcuts />
		</div>
	</div>
{/if}

<style>
	#pluginModal {
		/* max-height: 600px; */
		position: fixed;
		right: 0;
		left: 0;
		height: 80%;
		width: 100%;
		max-width: 800px;
		margin-inline: auto;
		overflow: auto;
		z-index: 99999px;
	}
	#pluginModal::-webkit-scrollbar {
		width: 0px;
		height: 0px;
	}
</style>
