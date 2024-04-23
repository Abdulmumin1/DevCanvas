<script>
	import Footer from '$components/footer.svelte';
	import InnerNav from '$components/innerNav.svelte';
</script>

<div
	class="before:he bg-skyblue-500 relative flex min-h-screen w-screen flex-col items-center justify-center"
>
	<div class="relative z-10 w-full">
		<InnerNav />
	</div>

	<div class="article tos flex max-w-2xl flex-col gap-4 px-4 py-10">
		<slot />
	</div>
</div>
<Footer />
