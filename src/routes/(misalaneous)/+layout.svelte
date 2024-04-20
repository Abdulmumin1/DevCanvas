<script>
	import Footer from '$components/footer.svelte';
	import InnerNav from '$components/innerNav.svelte';
</script>

<div
	class="before:he bg-skyblue-500 min-h-screen w-screen flex flex-col items-center justify-center relative"
>
	<div class="w-full relative z-10">
		<InnerNav />
	</div>

    <div class='article tos  max-w-2xl px-4 py-10 gap-4 flex flex-col'>

        <slot />
    </div>
</div>
<Footer />
