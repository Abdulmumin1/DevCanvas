<script>
	import { onMount } from 'svelte';
	import { Pane, Splitpanes } from 'svelte-splitpanes';
	import { layoutView } from '$lib/feEditor/store.js';

	let innerWidth;

	$: isVertical = innerWidth <= 768  ;
	let loaded = false;
	// if (browser) {
	// 	 // Change the breakpoint as needed
	// }
	

	onMount(() => {
		// Listen for window resize events and update orientation accordingly
		loaded = true;
	});

	// console.log('isvertialcs');
</script>

<svelte:window bind:innerWidth={innerWidth}/>
<div class="h-full">
	{#if isVertical}
		<Splitpanes horizontal={true} theme="my-theme" class="ignore">
			<Pane snapSize={5} size={40} class="bg-white">
				<slot name="left"  />
			</Pane>
			<Pane snapSize={5} class="bg-white">
				<slot name="right" />
			</Pane>
		</Splitpanes>
	{:else if $layoutView == 'left'}
		<Splitpanes horizontal={false} theme="my-theme">
			<Pane snapSize={5} size={35} class="bg-white">
				<slot name="left" />
			</Pane>
			<Pane snapSize={5} class="bg-white">
				<slot name="right" />
			</Pane>
		</Splitpanes>
	{:else if $layoutView == 'top'}
		<Splitpanes horizontal={true} theme="my-theme">
			<Pane snapSize={5}  class="bg-white">
				<slot name="left" />
			</Pane>
			<Pane snapSize={5}  class="bg-white">
				<slot name="right" />
			</Pane>
		</Splitpanes>
	{:else if $layoutView == 'right'}
		<Splitpanes horizontal={false} theme="my-theme">
			<Pane snapSize={5} class="bg-white">
				<slot name="right" />
			</Pane>
			<Pane snapSize={5} size={34} class="bg-white">
				<slot name="left" />
			</Pane>
		</Splitpanes>
	{/if}
</div>
