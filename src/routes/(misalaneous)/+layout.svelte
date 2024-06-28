<script>
	import Footer from '$components/footer.svelte';
	import InnerNav from '$components/innerNav.svelte';
	import GoUp from '$components/goUp.svelte'

</script>

<div
	class="before:he bg-skyblue-500 relative flex min-h-screen w-screen flex-col items-center justify-center"
>
	<div class="relative z-10 w-full">
		<InnerNav />
	</div>

	<div class="article tos flex max-w-4xl font text-[1.2rem] flex-col font-public-sans gap-2 px-4 py-10">
		<slot />
	</div>
</div>

<GoUp content=".tos"/>

<Footer />
