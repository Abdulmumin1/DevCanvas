<script>
	import { cubicOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import { showNavigating } from '$lib/index.js';

	const progress = tweened(0, {
		duration: 3500,
		easing: cubicOut
	});

	if ($showNavigating) {
		progress.set(0.7);
	} else {
		progress.set(1, { duration: 1000 });
	}
	// onMount(() => {
	// });
</script>

{#if $showNavigating}
	<div class="progress-bar">
		<div class="progress-sliver" style="--width: {$progress * 100}%" />
	</div>
{/if}

<style>
	.progress-bar {
		position: fixed;
		top: 0;
		height: 0.2rem;
		width: 100vw;
		z-index: 100;
	}

	.progress-sliver {
		width: var(--width);
		background-color: rgb(14 165 233);
		height: 100%;
	}
</style>
