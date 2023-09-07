<script>
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import { showToast } from '$lib/index.js';
	export let message;

	onMount(() => {
		setTimeout(() => {
			showToast.set(false);
		}, 2500);
	});
</script>

<div
	transition:slide
	class="absolute bottom-0 right-0 m-2 shadow-md border-l-2 rounded-sm bg-white dark:bg-primary border-sky-500 p-2"
>
	{message}
</div>
