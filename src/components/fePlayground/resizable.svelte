<script>
	import { onMount } from 'svelte';
	import { Pane, Splitpanes } from 'svelte-splitpanes';
	import { browser } from '$app/environment';
	import { layoutView } from '$lib/feEditor/store.js';
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
</script>

{#if isVertical}
	<Splitpanes horizontal={true} theme="my-theme">
		<Pane snapSize={20}>
			<slot name="left" />
		</Pane>
		<Pane snapSize={20}>
			<slot name="right" />
		</Pane>
	</Splitpanes>
{:else if $layoutView == 'left'}
	<Splitpanes horizontal={false} theme="my-theme">
		<Pane snapSize={20}>
			<slot name="left" />
		</Pane>
		<Pane snapSize={20}>
			<slot name="right" />
		</Pane>
	</Splitpanes>
{:else if $layoutView == 'top'}
	<Splitpanes horizontal={true} theme="my-theme">
		<Pane snapSize={20}>
			<slot name="left" />
		</Pane>
		<Pane snapSize={20}>
			<slot name="right" />
		</Pane>
	</Splitpanes>
{:else if $layoutView == 'right'}
	<Splitpanes horizontal={false} theme="my-theme">
		<Pane snapSize={20}>
			<slot name="right" />
		</Pane>
		<Pane snapSize={20}>
			<slot name="left" />
		</Pane>
	</Splitpanes>
{/if}
