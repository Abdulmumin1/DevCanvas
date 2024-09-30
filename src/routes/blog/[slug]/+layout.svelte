<script>
	import InnerNav from '$components/innerNav.svelte';
</script>

<div class="relative z-50">
	<InnerNav />
</div>
<div class="flex w-full justify-center py-12">
	<div class="w-full px-4 md:max-w-[800px] lg:max-w-[1000px] lg:px-0 lg:text-xl">
		<slot />
	</div>
</div>
