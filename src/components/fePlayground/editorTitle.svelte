<script>
	import { faCss3, faHtml5, faJs } from '@fortawesome/free-brands-svg-icons';
	import { faTerminal } from '@fortawesome/free-solid-svg-icons';
	import { showjsConsole, sassActive, babelActive, typescriptActive } from '$lib/feEditor/store.js';
	import Fa from 'svelte-fa';
	import EditorSettings from './editorSettings.svelte';
	export let lang;
</script>

<!-- <div class=""> -->
{#if lang == 'html'}
	<div class="flex min-h-10 w-full items-center justify-between bg-black text-white">
		<p class="flex items-center gap-1 bg-black px-3 py-1">
			<span class="text-rose-500"><Fa icon={faHtml5} /></span>HTML
		</p>
		<div class="relative flex gap-3 px-4">
			<EditorSettings />
		</div>
	</div>
{:else if lang == 'css'}
	<div
		class="flex min-h-10 w-full items-center justify-between border-t border-gray-900 bg-black text-white"
	>
		<p class="flex items-center gap-1 bg-black px-3 py-1">
			<span class="text-blue-500"><Fa icon={faCss3} /></span>{$sassActive ? 'SCSS' : 'CSS'}
		</p>
	</div>
{:else if lang == 'js'}
	<div
		class="flex min-h-10 w-full items-center justify-between border-t border-gray-900 bg-black text-white"
	>
		<p class="flex items-center gap-1 bg-black px-3 py-1">
			<span class="text-yellow-500"><Fa icon={faJs} /></span>{$babelActive
				? `JS (babel)`
				: $typescriptActive
					? 'JS (Typescript)'
					: 'JS'}
		</p>
		<!-- {@html games} -->

		<div class=" flex items-center justify-between">
			<button
				on:click={() => {
					showjsConsole.set(true);
				}}
				class="z-10 flex items-center gap-2 hover:opacity-80"
			>
				console <Fa icon={faTerminal} />
			</button>
		</div>
	</div>
{/if}
<!-- </div> -->
