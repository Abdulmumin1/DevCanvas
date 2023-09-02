<script lang="ts">
	import { fade } from 'svelte/transition';

	export let url;
</script>

{#key url}
	<div in:fade>
		<slot />
	</div>
{/key}

<style>
</style>
