<script>
	import { onMount } from 'svelte';
	import { scale, slide } from 'svelte/transition';
	import { showToast } from '$lib/index.js';
	import Fa from 'svelte-fa';
	import { faClose } from '@fortawesome/free-solid-svg-icons';
	export let message;
	export let duration = 2500;

	onMount(() => {
		setTimeout(() => {
			showToast.set(false);
		}, duration);
	});
</script>

<div
	in:slide={{ axis: 'y' }}
	out:scale
	class="absolute z-50 right-1 bottom-0 mx-auto w-fit m-2 shadow-md border-l-2 bg-white dark:bg-primary border-sky-500 p-2 rounded"
>
	<div class="flex items-center justify-center gap-2">
		{message}

		<button
			on:click={() => {
				showToast.set(false);
			}}
		>
			<Fa icon={faClose} />
		</button>
	</div>
</div>
