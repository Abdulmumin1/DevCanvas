<script lang="ts">
	import { fade, fly, scale, slide } from 'svelte/transition';

	let { url, children } = $props();
</script>

<!-- {#key url} -->
<!-- <div in:fly={{ duration: 1000 }}> -->
{@render children?.()}

<!-- </div> -->
<!-- {/key} -->

<style>
</style>
