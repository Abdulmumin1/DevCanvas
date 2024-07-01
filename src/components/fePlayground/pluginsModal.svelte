<script>
	import { fly } from 'svelte/transition';
	import Fa from 'svelte-fa';
	import { faClose,faGear } from '@fortawesome/free-solid-svg-icons';

	import {  externalStuff } from '$lib/feEditor/store.js';
	import { clickOutside } from '$lib/index.js';
	import Csslist from './externalCSS/csslist.svelte';
	import Jsplugins from './externalJs/jsplugins.svelte';
	import SaasProcessor from './saasProcessor.svelte';
	import BabelProcessor from './babelProcessor.svelte';
	import TypescriptProcessor from './typescriptProcessor.svelte';
	import OtherjsPlugins from './externalJs/otherjsPlugins.svelte';
	import SideComponent from '$components/fePlayground/editorSets/sideComponent.svelte';

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
		modal = false
	}


	let tabPlugin = true;

	function showPlugin() {
		tabPlugin = true;
	}

	function showEditor() {
		tabPlugin = false;
	}
</script>


<button on:click={()=>{
	modal = !modal
}} class="cursor-pointer hover:scale-105 hover:opacity-80"
	><Fa icon={faGear} />
</button>


{#if modal}
	
<div
	id="pluginModal"
	in:fly={{ y: 100 }}
	out:fly={{ y: 80, duration: 150 }}
	use:clickOutside on:click_outside={closeModal}
	class="z-50 rounded-lg px-2 pb-2 text-sm bg-white flex flex-col items-center  dark:bg-black dark:text-white md:h-[900px] md:w-[500px]"
>
<div
	class="sticky top-0 flex w-full items-center justify-center  border-b-4 mb-6  z-50 border-sky-300 bg-white pb-2 pt-4 text-black dark:bg-black dark:text-white"
>
	<div class="flex gap-4 px-2 text-lg md:text-xl  items-center justify-center max-w-6xl  w-full ">
		<button on:click={showPlugin} class:font-bold={tabPlugin}>Plugins</button>
		<div class="font-bold text-lg">·</div>
		<button on:click={showEditor} class:font-bold={!tabPlugin}>Editor</button>
	</div>

	<button class="px-2 absolute right-4 top-4" on:click={closeModal}>
		<Fa icon={faClose} />
	</button>
</div>
	<div  class="w-full max-w-6xl flex flex-col gap-4">
		<!-- class="modal z-50 backdrop-blur-lg absolute  inset-y-0 inset-x-0 mx-auto m-2 shadow-md border-t-4 bg-white dark:bg-black border-sky-500 p-3 rounded flex flex-col overflow-scroll gap-2" -->

		
		<div id="tabPlugins" class:hidden={!tabPlugin} class="flex flex-col gap-2">
			<div class="w-full">
				<p class="font-semibold text-base">Head</p>
				<textarea
					name=""
					id=""
					cols="30"
					rows="3"
					placeholder="Content for the head"
					class="w-full rounded-xl p-2  bg-gray-100 font-thin outline-none dark:bg-primary"
					spellcheck="false"
					bind:value={html}
				/>
			</div>

			<div class="flex w-full flex-col gap-2">
				<p  class="font-semibold ">CSS Plugins</p>
				<Csslist />
			</div>

			<div class="flex  w-full flex-col gap-2 transition-transform duration-300">
				<div  class="font-semibold ">Js Plugins</div>
				<Jsplugins />
				<OtherjsPlugins />
			</div>
		</div>

		<div id="tabEditor" class:hidden={tabPlugin} class="flex flex-col gap-2">
			<SideComponent/>

			<div  class="font-semibold px-2 flex flex-col gap-2">CSS PreProcessor


				<SaasProcessor />
			</div>
			<div  class="font-semibold px-2">Javascript Processors</div>
			<div class="flex flex-col gap-2 rounded-lg bg-gray-300 p-2 dark:bg-primary">
				<BabelProcessor />
				<TypescriptProcessor />
			</div>
			<!-- <AddTags /> -->
		</div>
	</div>
</div>

{/if}

<style>
	#pluginModal {
		/* max-height: 600px; */
		position: fixed;
		bottom: 0;
		right: 0;
		left: 0;
		height: 80%;
		width: 100%;
		overflow: auto;
		z-index: 99999px;

	}
	#pluginModal::-webkit-scrollbar {
		width: 0px;
		height: 0px;
	}

	
</style>
