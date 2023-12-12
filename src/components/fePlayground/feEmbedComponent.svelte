<script>
	import { onMount } from 'svelte';
	import github from 'svelte-highlight/styles/github';
	import { Splitpanes, Pane } from 'svelte-splitpanes';
	import { HighlightAuto, Highlight, LineNumbers } from 'svelte-highlight';
	import { css } from 'svelte-highlight/languages';
	import CodeOutput from './codeOutput.svelte';
	import ReadOnlyEditor from './readOnlyEditor.svelte';
	import Fa from 'svelte-fa';
	import { faCss3, faHtml5 } from '@fortawesome/free-brands-svg-icons';
	import {
		faArrowRightToBracket,
		faArrowUpRightFromSquare,
		faEdit,
		faGears
	} from '@fortawesome/free-solid-svg-icons';
	import Loader from '../loader.svelte';
	import { fade } from 'svelte/transition';
	export let details;

	let showHtml, showCSS, showResult;
	function toogle(which) {
		if (which == 'html') {
			showHtml = true;
			showCSS = false;
			showResult = isVertical ? false : true;
		} else if (which == 'css') {
			showCSS = true;
			showHtml = false;
			showResult = isVertical ? false : true;
		} else if (which == 'output') {
			showCSS = isVertical ? false : !showHtml;
			showHtml = isVertical ? false : !showCSS;
			showResult = true;
		}

		console.log(showResult);
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

<div class="h-full max-h-full flex flex-col">
	<div class="flex justify-between p-2">
		<div class="w-full bg-secondary-dark p-2 flex gap-2 text-white text-sm">
			<button
				on:click={() => toogle('html')}
				class:text-sky-300={showHtml}
				class="flex items-center justify-center gap-2"
				><span class="text-error"><Fa icon={faHtml5} /></span> HTML</button
			>
			<button
				class="flex items-center justify-center gap-2"
				on:click={() => toogle('css')}
				class:text-sky-300={showCSS}
			>
				<span class="text-blue-500"><Fa icon={faCss3} /></span> CSS</button
			>
			<button on:click={() => toogle('output')} class:text-sky-300={showResult}> Output</button>
		</div>

		<p class="text-black rounded-r p-1 flex gap-2 w-[100px] items-center justify-center bg-sky-300">
			<Fa icon={faArrowUpRightFromSquare} /> <span>GOTO Canvas</span>
		</p>
	</div>

	{#if !loading}
		<!-- <p class="bg-[#0b0e14] py-1 px-2 text-white">
			created by <a href="/{details.profile}" class="text-sky-400" target="_blank"
				>@{details.profile}</a
			>
		</p> -->

		{#if isVertical}
			<div class:hidden={!showHtml} class="hidden h-full">
				<ReadOnlyEditor lang="html" code={details.html} />
			</div>
			<div class:hidden={!showCSS} class="hidden h-full overflow-scroll">
				<ReadOnlyEditor lang="css" code={details.css} />
			</div>

			<div class="h-full w-full" class:hidden={!showResult}>
				<CodeOutput code={details.html} css={details.css} js={details.js} />
			</div>
		{:else}
			<Splitpanes theme="embed-theme">
				<Pane>
					<div class:hidden={!showHtml} class="hidden h-full">
						<ReadOnlyEditor lang="html" code={details.html} />
					</div>
					<div class:hidden={!showCSS} class="hidden h-full overflow-scroll text-sm">
						<ReadOnlyEditor lang="css" code={details.css} />
					</div>
				</Pane>
				<Pane>
					<div class="h-full w-full overflow-scroll" class:hidden={!showResult}>
						<CodeOutput code={details.html} css={details.css} js={details.js} />
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
</style>
