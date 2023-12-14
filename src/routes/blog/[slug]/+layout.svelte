<script>
	import { fade, scale, slide } from 'svelte/transition';
	import InnerNav from '$components/innerNav.svelte';
</script>

<div class="z-50 relative">
	<InnerNav />
</div>
<div class="w-full flex justify-center py-12 mt-20">
	<div class="max-w-[800px] w-full lg:text-xl px-4">
		<slot />
	</div>
</div>
