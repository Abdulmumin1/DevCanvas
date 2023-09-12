<script>
	import { current_data } from '$lib/index.js';
	import { onMount } from 'svelte';

	let code;
	$: {
		code = $current_data.html;
		// console.log(code);
	}

	// onMount(() => {
	// 	html = code;
	// });
</script>

<svelte:head>
	<script src="https://cdn.tailwindcss.com"></script>
</svelte:head>

<div class="w-full p-4 h-full">{@html code}</div>
