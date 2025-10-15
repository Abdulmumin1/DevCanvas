<!-- Add your features or benefits here -->

<script>
	/**
	 * @typedef {Object} Props
	 * @property {boolean} [reverse]
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { reverse = false, children } = $props();
</script>

<div class="flex h-fit items-center justify-center p-4 md:h-[500px]">
	{#if reverse}
		<div class="flex h-full flex-col items-center gap-3 text-left md:flex-row md:gap-6">
			{@render children?.()}
		</div>
	{:else}
		<div class="flex h-full flex-col-reverse items-center gap-3 text-right md:flex-row md:gap-6">
			{@render children?.()}
		</div>
	{/if}
</div>
