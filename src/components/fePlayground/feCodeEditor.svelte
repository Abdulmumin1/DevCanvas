<script>
	import { Splitpanes, Pane } from 'svelte-splitpanes';
	import FeCss from './feCSS.svelte';
	import FeHtml from './feHTML.svelte';
	import Fa from 'svelte-fa';
	import { faCss3, faCss3Alt, faHtml5, faJs } from '@fortawesome/free-brands-svg-icons';
	import { faShekel } from '@fortawesome/free-solid-svg-icons';
	import { onDestroy, onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { layoutView } from '$lib/feEditor/store.js';
	import { current_data } from '$lib/index.js';
	import FeJs from './feJS.svelte';

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

		console.log(isVertical);
	};
	onMount(() => {
		// Listen for window resize events and update orientation accordingly
		isVertical = window.innerWidth <= 768;
		window.addEventListener('resize', updateOrientation);
		console.log(isVertical);
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

		console.log(which);
	}
</script>

<div class="h-full w-full">
	{#if isVertical}
		<div class="flex gap-2">
			<button
				class="flex gap-1 items-center justify-center p-2"
				on:click={() => {
					showTab('html');
				}}
				class:bg-secondary-dark={showHtml}
				><span class="text-rose-500"><Fa icon={faHtml5} /></span>HTML</button
			>
			<button
				class="flex gap-1 items-center justify-center p-2"
				on:click={() => {
					showTab('css');
				}}
				class:bg-secondary-dark={showCSS}
			>
				<span class="text-blue-500"><Fa icon={faCss3} /></span>CSS
			</button>

			<button
				class="flex gap-1 items-center justify-center p-2"
				on:click={() => {
					showTab('js');
				}}
				class:bg-secondary-dark={showJs}
			>
				<span class="text-yellow-500"><Fa icon={faJs} /></span>JS
			</button>
		</div>
		<Splitpanes horizontal={false} theme="my-theme">
			{#if showHtml}
				<Pane snapSize={20} bind:size>
					<FeHtml {initialHTML} />
				</Pane>
			{/if}
			{#if showCSS}
				<Pane snapSize={10}>
					<FeCss {initialCSS} />
				</Pane>
			{/if}

			{#if showJs}
				<Pane snapSize={10}>
					<FeJs />
				</Pane>
			{/if}
		</Splitpanes>
	{:else if $layoutView == 'top'}
		<Splitpanes horizontal={false} theme="my-theme">
			<Pane snapSize={20}>
				<div class="w-full h-full">
					<p class="bg-gray-50 dark:bg-black px-3 py-1 flex gap-1 items-center">
						<span class="text-rose-500"><Fa icon={faHtml5} /></span>HTML
					</p>
					<FeHtml {initialHTML} />
				</div>
			</Pane>
			<Pane snapSize={10}>
				<div class="h-full w-full">
					<p class="bg-gray-50 dark:bg-black px-3 py-1 flex gap-1 items-center">
						<span class="text-blue-500"><Fa icon={faCss3} /></span>CSS
					</p>
					<FeCss {initialCSS} />
				</div>
			</Pane>
			<Pane snapSize={10}>
				<div class="h-full w-full">
					<p class="bg-gray-50 dark:bg-black px-3 py-1 flex gap-2 items-center">
						<span class="text-yellow-500"><Fa icon={faJs} /></span>JS
					</p>
					<FeJs />
				</div>
			</Pane>
		</Splitpanes>
	{:else}
		<Splitpanes horizontal theme="my-theme">
			<Pane snapSize={20}>
				<div class="h-full w-full">
					<p class="bg-gray-50 dark:bg-black px-3 py-1 flex gap-1 items-center">
						<span class="text-rose-500"><Fa icon={faHtml5} /></span>HTML
					</p>
					<FeHtml {initialHTML} />
				</div>
			</Pane>
			<Pane snapSize={10}>
				<div class="h-full w-full">
					<p class="bg-gray-50 dark:bg-black px-3 py-1 flex gap-1 items-center">
						<span class="text-blue-500"><Fa icon={faCss3} /></span>CSS
					</p>
					<FeCss {initialCSS} />
				</div>
			</Pane>
			<Pane snapSize={10}>
				<div class="h-full w-full">
					<p class="bg-gray-50 dark:bg-black px-3 py-1 flex gap-2 items-center">
						<span class="text-yellow-500"><Fa icon={faJs} /></span>JS
					</p>
					<FeJs {initialJs} />
				</div>
			</Pane>
		</Splitpanes>
	{/if}
</div>
