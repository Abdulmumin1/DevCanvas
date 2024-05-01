<script>
	import Fa from 'svelte-fa';
	import { faBrush } from '@fortawesome/free-solid-svg-icons';
	import { formatCode } from '$lib/feEditor/store.js';

	function format() {
		formatCode.set(true);
		console.log('gesfs');
		setTimeout(() => formatCode.set(false), 2000);
	}
</script>

<button
	class="flex w-full items-center gap-2 rounded-lg bg-sky-400 px-3 py-2
               transition duration-300 ease-in-out
               hover:bg-sky-500
               active:scale-105 active:bg-sky-600"
	on:click={format}
>
	<Fa icon={faBrush} /> Format
</button>
