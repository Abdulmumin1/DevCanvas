<script>
	import { fade, scale, slide } from 'svelte/transition';
	import InnerNav from '$components/innerNav.svelte';
</script>

<div class="z-50 relative">
	<InnerNav />
</div>
<div class="w-full flex justify-center py-12">
	<div class="lg:max-w-[1000px] md:max-w-[800px] w-full lg:text-xl px-4 lg:px-0">
		<slot />
	</div>
</div>
