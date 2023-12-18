<script>
	import { fade, scale, slide } from 'svelte/transition';
	import InnerNav from '$components/innerNav.svelte';
</script>

<div class="z-50 relative bg-white border-b border-b-primary">
	<InnerNav />
</div>
<div class="w-full flex justify-center py-12 bg-white">
	<div class="max-w-[1000px] w-full lg:text-xl px-4">
		<slot />
	</div>
</div>
