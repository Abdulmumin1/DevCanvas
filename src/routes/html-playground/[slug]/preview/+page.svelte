<script context="module">
	export const layout = null; // or false
</script>

<script>
	import { page } from '$app/stores';
	import { current_data } from '$lib/index.js';
	$: abdul = 'abdul';

	console.log($page);
	console.log($current_data);
</script>

<div>
	{abdul}
</div>
