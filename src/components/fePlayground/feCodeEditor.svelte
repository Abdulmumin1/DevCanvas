<script>
	import { Splitpanes, Pane } from 'svelte-splitpanes';
	// import FeCss from './feCSS.svelte';
	// import FeHtml from './feHTML.svelte';
	import Fa from 'svelte-fa';
	import { faCss3, faHtml5, faJs } from '@fortawesome/free-brands-svg-icons';
	import { onMount } from 'svelte';
	import { layoutView, consoleOutput } from '$lib/feEditor/store.js';
	import { current_data } from '$lib/index.js';
	import { hide_css, hide_js } from '$lib/editor/settings.js';

	// import FeJs from './feJS.svelte';
	import EditorTitle from './editorTitle.svelte';
	import Femodal from './femodal.svelte';
	import EditorSettings from './editorSettings.svelte';
	import CodeMirrorEditor from '../editors/codeMirrorEditor.svelte';

	let initialHTML = $current_data.html;
	let initialCSS = $current_data.css;
	let initialJs = $current_data.js;

	let isVertical = false;
	// if (browser) {
	// 	 // Change the breakpoint as needed
	// }
	$: splitpaneOptions = {
		horizontal: !isVertical
		// Other options for your Splitpanes component
	};

	// Function to update isVertical based on window width
	const updateOrientation = () => {
		isVertical = window.innerWidth <= 768; // Change the breakpoint as needed
		splitpaneOptions = {
			horizontal: !isVertical
		};
	};
	onMount(() => {
		// Listen for window resize events and update orientation accordingly
		isVertical = window.innerWidth <= 768;
		window.addEventListener('resize', updateOrientation);
	});

	// // Clean up the event listener when the component is destroyed
	// onDestroy(() => {
	// 	window.removeEventListener('resize', updateOrientation);
	// });

	let size = '100%';
	let showCSS,
		showJs,
		showHtml = false;

	showHtml = true;

	function showTab(which) {
		if (which == 'html') {
			showHtml = true;
			showCSS = false;
			showJs = false;
		} else if (which == 'css') {
			showCSS = true;
			showHtml = false;
			showJs = false;
		} else {
			showJs = true;
			showCSS = false;
			showHtml = false;
		}

		// console.log(which);
	}
</script>

<div class="h-full w-full overflow-clip">
	{#if isVertical}
		<div class="flex items-center justify-between">
			<div class="flex gap-2 text-white">
				<button
					class="flex items-center justify-center gap-1 p-2"
					on:click={() => {
						showTab('html');
					}}
					class:bg-secondary-dark={showHtml}
					><span class="text-rose-500"><Fa icon={faHtml5} /></span>HTML</button
				>
				{#if !$hide_css}
					<button
						class="flex items-center justify-center gap-1 p-2"
						on:click={() => {
							showTab('css');
						}}
						class:bg-secondary-dark={showCSS}
					>
						<span class="text-blue-500"><Fa icon={faCss3} /></span>CSS
					</button>
				{/if}
				{#if !$hide_js}
					<button
						class="flex items-center justify-center gap-1 p-2"
						on:click={() => {
							showTab('js');
						}}
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
		<div class="h-full w-full">
			<div class:hidden={!showHtml} class="hidden h-full w-full">
				<!-- <FeHtml {initialHTML} /> -->
				<CodeMirrorEditor lang={'html'} code={initialHTML} />
			</div>
			{#if !$hide_css}
				<div class:hidden={!showCSS} class="hidden h-full w-full">
					<CodeMirrorEditor lang={'css'} code={initialCSS} />
				</div>
			{/if}
			{#if !$hide_js}
				<div class:hidden={!showJs} class="hidden h-full w-full">
					<!-- <FeJs {initialJs} /> -->
					<CodeMirrorEditor lang={'javascript'} code={initialJs} />
				</div>
			{/if}
		</div>
	{:else if $layoutView == 'top'}
		<Splitpanes horizontal={false} theme="my-theme">
			<Pane snapSize={20} minSize={1}>
				<div class="h-full w-full overflow-clip">
					<EditorTitle lang="html" />

					<!-- <FeHtml {initialHTML} /> -->
					<CodeMirrorEditor lang={'html'} code={initialHTML} />
				</div>
			</Pane>
			{#if !$hide_css}
				<Pane snapSize={10} minSize={1}>
					<div class="h-full w-full overflow-clip">
						<EditorTitle lang="css" />

						<!-- <FeCss {initialCSS} /> -->
						<CodeMirrorEditor lang={'css'} code={initialCSS} />
					</div>
				</Pane>
			{/if}
			{#if !$hide_js}
				<Pane snapSize={10} minSize={1}>
					<div class="h-full w-full overflow-clip">
						<EditorTitle lang="js" />
						<!-- <FeJs {initialJs} /> -->
						<CodeMirrorEditor lang={'javascript'} code={initialJs} />
					</div>
				</Pane>
			{/if}
		</Splitpanes>
	{:else}
		<Splitpanes horizontal theme="my-theme">
			<Pane snapSize={20} minSize={6}>
				<div class="h-full w-full overflow-clip">
					<EditorTitle lang="html" />

					<!-- <FeHtml {initialHTML} /> -->
					<CodeMirrorEditor lang={'html'} code={initialHTML} />
				</div>
			</Pane>

			{#if !$hide_css}
				<Pane snapSize={10} minSize={6}>
					<div class="h-full w-full overflow-clip">
						<EditorTitle lang="css" />

						<!-- <FeCss {initialCSS} /> -->
						<CodeMirrorEditor lang={'css'} code={initialCSS} />
					</div>
				</Pane>
			{/if}
			{#if !$hide_js}
				<Pane snapSize={10} minSize={6}>
					<div class="h-full w-full overflow-clip">
						<EditorTitle lang="js" />

						<!-- <FeJs {initialJs} /> -->
						<CodeMirrorEditor lang={'javascript'} code={initialJs} />
					</div>
				</Pane>
			{/if}
		</Splitpanes>
	{/if}
</div>
