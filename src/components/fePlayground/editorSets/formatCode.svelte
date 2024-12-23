<script>
	import Fa from 'svelte-fa';
	import { faBrush } from '@fortawesome/free-solid-svg-icons';
	import { formatCode } from '$lib/feEditor/store.js';

	function format() {
		formatCode.set(true);
		setTimeout(() => formatCode.set(false), 2000);
	}
</script>

<button
	class="toggle-btn flex w-full items-center gap-2 rounded-lg bg-gradient-to-r from-sky-400 to-sky-300 px-4 py-2 text-sm text-black shadow-md shadow-sky-200/20 transition-transform duration-150 ease-in-out hover:from-sky-500 hover:to-sky-700 hover:shadow-lg active:scale-95"
	on:click={format}
>
	<Fa icon={faBrush} /> Format
</button>

<style>
	.toggle-btn:active {
		transform: scale(0.95);
		transition:
			transform 0.1s ease,
			box-shadow 0.1s ease;
	}
</style>
