<script>
	import Fa from 'svelte-fa';
	import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
	import { fly } from 'svelte/transition';

	import { onMount, onDestroy } from 'svelte';

	/**
	 * @typedef {Object} Props
	 * @property {string} [content]
	 */

	/** @type {Props} */
	let { content = 'body' } = $props();

	let up = $state(0);

	function reportScroll() {
		const h = document.documentElement,
			b = document.querySelector(content),
			st = 'scrollTop',
			sh = 'scrollHeight';

		const percent = ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
		up = percent;
		// console.log(percent)
	}

	onMount(() => {
		reportScroll();
		window.addEventListener('scroll', reportScroll);

		return () => {
			window.removeEventListener('scroll', reportScroll);
		};
	});

	// onDestroy(()=>{
	// })

	const scrollto = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	};
</script>

{#if up > 15}
	<button
		transition:fly={{ x: 10 }}
		onclick={scrollto}
		class="fixed bottom-4 right-4 rounded border-2 border-primary bg-sky-400 p-1 font-bold text-primary"
	>
		<Fa icon={faAngleUp} />
	</button>
{/if}
