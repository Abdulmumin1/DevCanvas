<script>
	import { Splitpanes, Pane } from 'svelte-splitpanes';
	import Fa from 'svelte-fa';
	import { faCss3, faHtml5, faJs } from '@fortawesome/free-brands-svg-icons';
	import { getContext, onDestroy, onMount } from 'svelte';
	import { layoutView, tabsView } from '$lib/feEditor/store.js';
	import { current_data } from '$lib/index.js';
	import { hide_css, hide_js } from '$lib/editor/settings.js';
	import EditorTitle from './editorTitle.svelte';
	import EditorSettings from './editorSettings.svelte';
	import CodeMirrorEditor from '../editors/codeMirrorEditor.svelte';
	
	import { showjsConsole, sassActive, babelActive, typescriptActive } from '$lib/feEditor/store.js';
	
	// Initialize editor content
	export let initialHTML = $current_data.html;
	export let initialCSS = $current_data.css;
	export let initialJs = $current_data.js;
	let lockEditor = getContext('generating');

	// State for tab visibility
	let showHtml = true;
	let showCSS = false;
	let showJs = false;

	// State for splitpane orientation
	let isVertical = false;

	// Update splitpane orientation based on window width
	const updateOrientation = () => {
		isVertical = window.innerWidth <= 768; // Adjust breakpoint as needed
	};


	// Set initial orientation and listen for window resize
	onMount(async () => {
		updateOrientation();
		window.addEventListener('resize', updateOrientation);
		window.addEventListener('keydown', handleKeyDown);

		// let content = await response.json();
		// console.log(content);
		// let html = content.ai;
		// // console.log(html)
		// setTimeout(() => {
		// 	current_data.update((cur) => {
		// 		// console.log(cur);
		// 		return { ...cur, html: html };
		// 	});
		// }, 400);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	});

	// Function to switch between tabs
	const showTab = (tab) => {
		showHtml = tab === 'html';
		showCSS = tab === 'css';
		showJs = tab === 'js';
	};

	// Function to cycle through tabs
	const cycleTab = () => {
		if (showHtml) {
			showHtml = false;
			showCSS = !$hide_css;
			showJs = $hide_css;
		} else if (showCSS) {
			showCSS = false;
			showJs = !$hide_js;
			showHtml = $hide_js;
		} else if (showJs) {
			showJs = false;
			showHtml = true;
		} else {
			showHtml = true;
			showCSS = false;
			showJs = false;
		}
	};

	// Handle keyboard shortcuts
	const handleKeyDown = (event) => {
		// console.log(event.ctrlKey, event.key);
		if (event.ctrlKey && event.key == 'm') {
			event.preventDefault(); // Prevent default browser behavior
			cycleTab(); // Cycle through tabs
		}
	};

	// $: console.log($layoutView);
</script>

<div class="h-full w-full overflow-clip">
	{#if isVertical || $tabsView}
		<!-- Vertical layout for smaller screens -->
		<div class="flex items-center justify-between text-[13px]">
			<div class="flex gap-2 text-white">
				<button
					class="flex items-center justify-center gap-1 p-2"
					on:click={() => showTab('html')}
					class:bg-secondary-dark={showHtml}
				>
					<span class="text-rose-500"><Fa icon={faHtml5} /></span>HTML
				</button>
				{#if !$hide_css}
					<button
						class="flex items-center justify-center gap-1 p-2"
						on:click={() => showTab('css')}
						class:bg-secondary-dark={showCSS}
					>
						<span class="text-blue-500"><Fa icon={faCss3} /></span>{$sassActive ? 'SCSS' : 'CSS'}
					</button>
				{/if}
				{#if !$hide_js}
					<button
						class="flex items-center justify-center gap-1 p-2"
						on:click={() => showTab('js')}
						class:bg-secondary-dark={showJs}
					>
						<span class="text-yellow-500"><Fa icon={faJs} /></span>JS
					</button>
				{/if}
			</div>
			<div class="flex gap-2 p-2 text-white">
				<EditorSettings />
			</div>
		</div>

		<!-- Tab content -->
		<div class="h-full w-full">
			<div class:hidden={!showHtml} class="h-full w-full">
				<CodeMirrorEditor lang="html" bind:code={initialHTML} />
			</div>
			{#if !$hide_css}
				<div class:hidden={!showCSS} class="h-full w-full">
					<CodeMirrorEditor lang="css" bind:code={initialCSS} />
				</div>
			{/if}
			{#if !$hide_js}
				<div class:hidden={!showJs} class="h-full w-full">
					<CodeMirrorEditor lang="javascript" bind:code={initialJs} />
				</div>
			{/if}
		</div>
	{:else if $layoutView === 'top'}
		<!-- Horizontal split layout for top view -->
		<Splitpanes horizontal={false} theme="my-theme">
			<Pane snapSize={20} minSize={1}>
				<div class="h-full w-full overflow-clip">
					<EditorTitle lang="html" />
					<CodeMirrorEditor lang="html" code={initialHTML} />
				</div>
			</Pane>
			{#if !$hide_css}
				<Pane snapSize={10} minSize={1}>
					<div class="h-full w-full overflow-clip">
						<EditorTitle lang="css" />
						<CodeMirrorEditor lang="css" code={initialCSS} />
					</div>
				</Pane>
			{/if}
			{#if !$hide_js}
				<Pane snapSize={10} minSize={1}>
					<div class="h-full w-full overflow-clip">
						<EditorTitle lang="js" />
						<CodeMirrorEditor lang="javascript" code={initialJs} />
					</div>
				</Pane>
			{/if}
		</Splitpanes>
	{:else}
		<!-- Default vertical split layout -->
		<Splitpanes horizontal theme="my-theme">
			<Pane snapSize={20} minSize={6}>
				<div class="h-full w-full overflow-clip">
					<EditorTitle lang="html" />
					<CodeMirrorEditor lang="html" code={initialHTML} />
				</div>
			</Pane>
			{#if !$hide_css}
				<Pane snapSize={10} minSize={6}>
					<div class="h-full w-full overflow-clip">
						<EditorTitle lang="css" />
						<CodeMirrorEditor lang="css" code={initialCSS} />
					</div>
				</Pane>
			{/if}
			{#if !$hide_js}
				<Pane snapSize={10} minSize={6}>
					<div class="h-full w-full overflow-clip">
						<EditorTitle lang="js" />
						<CodeMirrorEditor lang="javascript" code={initialJs} />
					</div>
				</Pane>
			{/if}
		</Splitpanes>
	{/if}
</div>
