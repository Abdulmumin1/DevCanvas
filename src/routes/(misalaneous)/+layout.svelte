<script>
	import Footer from '$components/ui/footer.svelte';
	import InnerNav from '$components/ui/innerNav.svelte';
	import GoUp from '$components/ui/goUp.svelte';
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();
</script>

<div
	class="before:he bg-skyblue-500 relative flex min-h-screen w-screen flex-col items-center justify-center"
>
	<div class="relative z-10 w-full">
		<InnerNav />
	</div>

	<div class="article tos flex max-w-4xl flex-col space-y-6 px-4 py-10 font-sans text-[1.2rem]">
		{@render children?.()}
	</div>
</div>

<GoUp content=".tos" />

<Footer />
