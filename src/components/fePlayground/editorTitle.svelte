<script>
	import { faCss3, faCss3Alt, faHtml5, faJs, faSafari } from '@fortawesome/free-brands-svg-icons';
	import { faAngleDown, faGear, faTerminal } from '@fortawesome/free-solid-svg-icons';
	import { showModal, showjsConsole } from '$lib/feEditor/store.js';
	import Fa from 'svelte-fa';
	import EditorSettings from './editorSettings.svelte';
	import Femodal from './femodal.svelte';
	export let lang;

	function showMod() {
		showModal.set(true);
	}
</script>

{#if lang == 'html'}
	<div class="w-full flex justify-between items-center h-10">
		<p class="bg-gray-50 dark:bg-black px-3 py-1 flex gap-1 items-center">
			<span class="text-rose-500"><Fa icon={faHtml5} /></span>HTML
		</p>
		<div class="flex px-4 gap-3 relative">
			<Femodal />

			<EditorSettings />
		</div>
	</div>
{:else if lang == 'css'}
	<div class="w-full flex justify-between items-center h-10">
		<p class="bg-gray-50 dark:bg-black px-3 py-1 flex gap-1 items-center">
			<span class="text-blue-500"><Fa icon={faCss3} /></span>CSS
		</p>
	</div>
{:else if lang == 'js'}
	<div class="w-full flex justify-between items-center h-10">
		<p class="bg-gray-50 dark:bg-black px-3 py-1 flex gap-1 items-center">
			<span class="text-yellow-500"><Fa icon={faJs} /></span>JS
		</p>

		<div class=" flex justify-between items-center">
			<button
				on:click={() => {
					showjsConsole.set(true);
				}}
				class="z-50 flex gap-2 items-center hover:opacity-80"
			>
				console <Fa icon={faTerminal} />
			</button>
		</div>
	</div>
{/if}
