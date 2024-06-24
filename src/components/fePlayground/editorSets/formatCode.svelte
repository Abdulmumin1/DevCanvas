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
	class="toggle-btn flex w-full items-center gap-2 rounded bg-sky-400 px-2
               py-1 text-xs text-black hover:bg-sky-100 active:bg-sky-100"
	on:click={format}
>
	<Fa icon={faBrush} /> Format
</button>

<style>
	.toggle-btn:active {
		transform: scale(0.96);
		transition: transform 0.1s ease;
	}
</style>
