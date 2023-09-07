<script>
	import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import Fa from 'svelte-fa';
	import { darkModeState } from '$lib/index.js';
	import { scale } from 'svelte/transition';

	function handleSwitchDarkMode() {
		darkModeState.update((cur) => {
			return !cur;
		});
	}
</script>

<button on:click={handleSwitchDarkMode} class="flex items-center justify-center dark:text-light">
	{#if $darkModeState}
		<div in:scale class=" cursor-pointer p-3 self-center hover-animate">
			<Fa icon={faMoon} class="self-center" />
		</div>
	{:else}
		<div in:scale class=" cursor-pointer p-3 self-center hover-animate">
			<Fa icon={faSun} class="self-center" />
		</div>
	{/if}
</button>
