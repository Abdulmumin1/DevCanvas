<script>
	import { onMount } from 'svelte';
	import github from 'svelte-highlight/styles/github';
	import { Splitpanes, Pane } from 'svelte-splitpanes';
	import { HighlightAuto, Highlight, LineNumbers } from 'svelte-highlight';
	import { css } from 'svelte-highlight/languages';
	import CodeOutput from './codeOutput.svelte';
	import ReadOnlyEditor from './readOnlyEditor.svelte';
	import Fa from 'svelte-fa';
	import { faCss3, faHtml5, faJs } from '@fortawesome/free-brands-svg-icons';
	import {
		faArrowRightToBracket,
		faArrowUpRightFromSquare,
		faEdit,
		faGears
	} from '@fortawesome/free-solid-svg-icons';
	import Loader from '../loader.svelte';
	import { fade } from 'svelte/transition';
	export let details;

	let showHtml;
	let showCSS;
	let showResult;
	let showJs;

	function toogle(which) {
		switch (which) {
			case 'html':
				showHtml = true;
				showCSS = false;
				showJs = false;
				showResult = isVertical ? false : true;
				break;
			case 'css':
				showCSS = true;
				showHtml = false;
				showJs = false;
				showResult = isVertical ? false : true;
				break;
			case 'js':
				showJs = true;
				showHtml = false;
				showCSS = false;
				showResult = isVertical ? false : true;
				break;
			case 'output':
				showCSS = isVertical ? false : !showHtml;
				showHtml = isVertical ? false : !showCSS;
				showJs = isVertical ? false : !showJs;
				showResult = true;
				console.log('showJds');
				break;
			default:
				break;
		}
		// console.log(showResult);
	}

	let isVertical = false;
	$: showHtml = isVertical ? false : true;
	$: showResult = isVertical ? true : true;
	// if (browser) {
	// 	 // Change the breakpoint as needed
	// }
	const updateOrientation = () => {
		isVertical = window.innerWidth <= 768; // Change the breakpoint as needed
	};
	onMount(() => {
		// Listen for window resize events and update orientation accordingly
		isVertical = window.innerWidth <= 768;
		window.addEventListener('resize', updateOrientation);
		loading = false;
	});

	let loading = true;
</script>

<div class="h-full max-h-full flex flex-col tx">
	<div class="flex min-h-[50px] h-[50px] justify-between">
		<div class="w-full bg-secondary-dark flex gap-2 text-white text-sm">
			<button
				on:click={() => toogle('html')}
				class:sl={showHtml}
				class:text-light={showHtml}
				class="flex items-center justify-center gap-2 p-2"
				><span class="text-error"><Fa icon={faHtml5} /></span> HTML</button
			>
			<button
				class="flex items-center justify-center gap-2 p-2"
				on:click={() => toogle('css')}
				class:sl={showCSS}
				class:text-light={showCSS}
			>
				<span class="text-blue-500"><Fa icon={faCss3} /></span> CSS</button
			>
			<button
				class="flex items-center justify-center gap-2 p-2"
				on:click={() => toogle('js')}
				class:sl={showJs}
				class:text-light={showJs}
			>
				<span class="text-blue-500"><Fa icon={faJs} /></span> JS</button
			>
		</div>

		<div class="w-full flex items-center justify-center bg-inherit bg-secondary-dark">
			<button
				on:click={() => toogle('output')}
				class:sl={showResult}
				class="p-2 h-full"
				class:text-light={showResult}
			>
				Output</button
			>
		</div>

		<a
			href="https://devcanvas.art/play/{details.project_key}"
			target="_blank"
			class="w-full text-gray-100 rounded-r p-1 flex gap-2 items-center justify-center sl px-2"
		>
			<span
				><img
					height="16px"
					width="16px"
					alt=""
					style="filter: grayscale(100);"
					src="/logo.svg"
				/></span
			> <span class="hidden md:block">GOTO Canvas</span>
		</a>
	</div>

	{#if !loading}
		<!-- <p class="bg-[#0b0e14] py-1 px-2 text-white">
			created by <a href="/{details.profile}" class="text-sky-400" target="_blank"
				>@{details.profile}</a
			>
		</p> -->

		{#if isVertical}
			<div class:hidden={!showHtml} class="hidden h-full bg-[#060521]">
				<ReadOnlyEditor lang="html" htmlCode={details.html} />
			</div>
			<div class:hidden={!showCSS} class="hidden h-full overflow-scroll bg-[#060521]">
				<ReadOnlyEditor lang="css" htmlCode={details.css} />
			</div>
			<div class:hidden={!showJs} class="hidden h-full overflow-scroll text-sm bg-[#060521]">
				<ReadOnlyEditor lang="javascript" htmlCode={details.js} />
			</div>
			<div class="h-full w-full" class:hidden={!showResult}>
				<CodeOutput
					htmlCode={details.html}
					cssCode={details.css}
					jsCode={details.js}
					useSassEmbed={details.config?.cssProcessor}
				/>
			</div>
		{:else}
			<Splitpanes theme="embed-theme">
				<Pane size={46.8}>
					<div class:hidden={!showHtml} class="hidden h-full overflow-scroll bg-[#060521]">
						<ReadOnlyEditor lang="html" htmlCode={details.html} />
					</div>
					<div class:hidden={!showCSS} class="hidden h-full overflow-scroll text-sm bg-[#060521]">
						<ReadOnlyEditor lang="css" htmlCode={details.css} />
					</div>

					<div class:hidden={!showJs} class="hidden h-full overflow-scroll text-sm bg-[#060521]">
						<ReadOnlyEditor lang="javascript" htmlCode={details.js} />
					</div>
				</Pane>
				<Pane>
					<div class="h-full w-full overflow-scroll m-0 p-0" class:hidden={!showResult}>
						<CodeOutput htmlCode={details.html} cssCode={details.css} jsCode={details.js} />
					</div>
				</Pane>
			</Splitpanes>
		{/if}
	{:else}
		<div
			transition:fade
			class="h-full w-full flex items-center justify-center bg-white dark:bg-primary"
		>
			<Loader />
		</div>
	{/if}
</div>

<style>
	/* Hide the vertical scrollbar */
	::-webkit-scrollbar {
		width: 0;
	}

	/* Hide the horizontal scrollbar */
	::-webkit-scrollbar {
		height: 0;
	}

	.sl {
		background-color: #222;
	}

	.tx {
		--strack: #222000000;
		--scroll-bg: #292524;
	}
</style>
