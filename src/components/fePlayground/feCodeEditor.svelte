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
</script>

{#if isVertical}
	<Splitpanes horizontal={false} theme="my-theme">
		<Pane snapSize={20} bind:size>
			<p class="bg-gray-50 dark:bg-black px-3 py-1 flex gap-1 items-center">
				<span class="text-rose-500"><Fa icon={faShekel} /></span>HTML
			</p>
			<FeHtml {initialHTML} />
		</Pane>
		<Pane snapSize={10}>
			<p class="bg-gray-50 dark:bg-black px-3 py-1 flex gap-1 items-center">
				<span class="text-blue-500"><Fa icon={faCss3} /></span>CSS
			</p>
			<FeCss {initialCSS} />
		</Pane>
		<Pane snapSize={10}>
			<p class="bg-gray-50 dark:bg-black px-3 py-1 flex gap-1 items-center">
				<span class="text-blue-500"><Fa icon={faJs} /></span>js
			</p>
			<FeJs />
		</Pane>
	</Splitpanes>
{:else if $layoutView == 'top'}
	<Splitpanes horizontal={false} theme="my-theme">
		<Pane snapSize={20}>
			<p class="bg-gray-50 dark:bg-black px-3 py-1 flex gap-1 items-center">
				<span class="text-rose-500"><Fa icon={faShekel} /></span>HTML
			</p>
			<FeHtml {initialHTML} />
		</Pane>
		<Pane snapSize={10}>
			<p class="bg-gray-50 dark:bg-black px-3 py-1 flex gap-1 items-center">
				<span class="text-blue-500"><Fa icon={faCss3} /></span>CSS
			</p>
			<FeCss {initialCSS} />
		</Pane>
		<Pane snapSize={10}>
			<p class="bg-gray-50 dark:bg-black px-3 py-1 flex gap-1 items-center">
				<span class="text-blue-500"><Fa icon={faJs} /></span>js
			</p>
			<FeJs />
		</Pane>
	</Splitpanes>
{:else}
	<Splitpanes horizontal theme="my-theme">
		<Pane snapSize={20}>
			<p class="bg-gray-50 dark:bg-black px-3 py-1 flex gap-1 items-center">
				<span class="text-rose-500"><Fa icon={faShekel} /></span>HTML
			</p>
			<FeHtml {initialHTML} />
		</Pane>
		<Pane snapSize={10}>
			<p class="bg-gray-50 dark:bg-black px-3 py-1 flex gap-1 items-center">
				<span class="text-blue-500"><Fa icon={faCss3} /></span>CSS
			</p>
			<FeCss {initialCSS} />
		</Pane>
		<Pane snapSize={10}>
			<p class="bg-gray-50 dark:bg-black px-3 py-1 flex gap-1 items-center">
				<span class="text-blue-500"><Fa icon={faJs} /></span>js
			</p>
			<FeJs />
		</Pane>
	</Splitpanes>
{/if}
