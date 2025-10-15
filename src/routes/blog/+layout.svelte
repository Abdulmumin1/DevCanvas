<script>
	import Footer from '../../components/ui/footer.svelte';
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();
</script>

<div>
	<!-- <div class="relative">
		<InnerNav />
	</div> -->
	{@render children?.()}
	<Footer />
</div>
