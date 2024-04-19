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
	class="bg-sky-400 w-full px-3 py-2 rounded-lg flex gap-2 items-center
               transition duration-300 ease-in-out
               hover:bg-sky-500
               active:bg-sky-600 active:scale-95"
	on:click={format}
>
	<Fa icon={faBrush} /> Format Code
</button>
