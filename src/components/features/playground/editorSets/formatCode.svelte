<script>
	import Fa from 'svelte-fa';
	import { faBrush } from '@fortawesome/free-solid-svg-icons';

	function format() {
		const myEvent = new CustomEvent('formatCode', {
			detail: { lang: 'all' }
		});
		window.dispatchEvent(myEvent);
	}
</script>

<button
	class="toggle-btn flex w-full items-center gap-2 rounded-lg bg-gradient-to-r from-sky-400 to-sky-300 px-4 py-2 text-sm text-black shadow-md shadow-sky-200/20 transition-transform duration-150 ease-in-out hover:bg-gradient-to-bl hover:shadow-lg active:scale-95"
	onclick={format}
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
