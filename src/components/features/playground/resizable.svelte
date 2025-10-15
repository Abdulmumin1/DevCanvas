<script>
	import { onMount } from 'svelte';
	import { Pane, Splitpanes } from 'svelte-splitpanes';
	import { layoutView } from '$lib/stores/playground.js';
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [left]
	 * @property {import('svelte').Snippet} [right]
	 */

	/** @type {Props} */
	let { left, right } = $props();

	let innerWidth = $state();

	let isVertical = $derived(innerWidth <= 768);
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

<svelte:window bind:innerWidth />
<div class="h-full">
	{#if isVertical}
		<Splitpanes horizontal={true} theme="my-theme" class="ignore">
			<Pane snapSize={5} size={40} class="bg-white">
				{@render left?.()}
			</Pane>
			<Pane snapSize={5} class="bg-white">
				{@render right?.()}
			</Pane>
		</Splitpanes>
	{:else if $layoutView == 'left'}
		<Splitpanes horizontal={false} theme="my-theme">
			<Pane snapSize={5} size={35} class="bg-white">
				{@render left?.()}
			</Pane>
			<Pane snapSize={5} class="bg-white">
				{@render right?.()}
			</Pane>
		</Splitpanes>
	{:else if $layoutView == 'top'}
		<Splitpanes horizontal={true} theme="my-theme">
			<Pane snapSize={5} class="bg-white">
				{@render left?.()}
			</Pane>
			<Pane snapSize={5} class="bg-white">
				{@render right?.()}
			</Pane>
		</Splitpanes>
	{:else if $layoutView == 'right'}
		<Splitpanes horizontal={false} theme="my-theme">
			<Pane snapSize={5} class="bg-white">
				{@render right?.()}
			</Pane>
			<Pane snapSize={5} size={34} class="bg-white">
				{@render left?.()}
			</Pane>
		</Splitpanes>
	{/if}
</div>
