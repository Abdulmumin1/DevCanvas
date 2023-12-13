<script>
	import { onMount } from 'svelte';
	import { Pane, Splitpanes } from 'svelte-splitpanes';
	import { layoutView } from '$lib/feEditor/store.js';
	let isVertical = true;
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
		console.log('mounted editor window');
	});

	// console.log('isvertialcs');
</script>

<div class="h-full">
	{#if isVertical}
		<Splitpanes horizontal={true} theme="my-theme">
			<Pane snapSize={20}>
				<slot name="left" size={30} />
			</Pane>
			<Pane snapSize={20}>
				<slot name="right" />
			</Pane>
		</Splitpanes>
	{:else if $layoutView == 'left'}
		<Splitpanes horizontal={false} theme="my-theme">
			<Pane snapSize={20} size="30">
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
			<Pane snapSize={20} size="40">
				<slot name="left" />
			</Pane>
		</Splitpanes>
	{/if}
</div>
