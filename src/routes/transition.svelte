<script lang="ts">
	import { fade, scale, slide } from 'svelte/transition';

	export let url;
</script>

{#key url}
	<div in:fade={{ duration: 200 }}>
		<slot />
	</div>
{/key}

<style>
</style>
