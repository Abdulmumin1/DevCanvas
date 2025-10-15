<script>
	import { onMount } from 'svelte';
	import { scale, slide } from 'svelte/transition';
	import { showToast } from '$lib/stores/index.js';
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
	class="fixed bottom-0 right-1 z-50 m-2 mx-auto w-fit rounded border-l-2 border-sky-500 bg-white p-2 shadow-md dark:bg-primary"
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
