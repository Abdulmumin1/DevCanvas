<script>
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import { showToast } from '$lib/index.js';
	import Fa from 'svelte-fa';
	import { faClose } from '@fortawesome/free-solid-svg-icons';
	export let message;

	onMount(() => {
		setTimeout(() => {
			showToast.set(false);
		}, 2500);
	});
</script>

<div
	in:slide={{ axis: 'x' }}
	class="absolute right-0 top-0 mx-auto w-fit m-2 shadow-md border-l-2 border-r-2 bg-white dark:bg-primary border-sky-500 p-2"
>
	<div class="flex items-center justify-center gap-2">
		{message}

		<Fa icon={faClose} />
	</div>
</div>
