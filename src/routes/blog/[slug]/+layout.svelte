<script>
	import InnerNav from '$components/ui/innerNav.svelte';
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();
</script>

<div class="relative z-50">
	<InnerNav />
</div>
<div class="flex w-full justify-center py-12">
	<div class="w-full px-4 md:max-w-[800px] lg:max-w-[1000px] lg:px-0 lg:text-xl">
		{@render children?.()}
	</div>
</div>
