<script lang="ts">
	import { fade, fly, scale, slide } from 'svelte/transition';

	export let url;
</script>

{#key url}
	<div in:fly={{ duration: 1000 }}>
		<slot />
	</div>
{/key}

<style>
</style>
