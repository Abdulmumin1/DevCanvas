<script>
	import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import Fa from 'svelte-fa';
	import { darkModeState } from '$lib/index.js';
	import { scale } from 'svelte/transition';
	// import {page} from '$app/'
	function handleSwitchDarkMode() {
		darkModeState.update((cur) => {
			return !cur;
		});
	}
</script>

<button on:click={handleSwitchDarkMode} class="flex items-center justify-center p-1 text-inherit">
	{#if $darkModeState}
		<div in:scale class=" hover-animate cursor-pointer self-center">
			<Fa icon={faMoon} class="self-center" />
		</div>
	{:else}
		<div in:scale class=" hover-animate cursor-pointer self-center">
			<Fa icon={faSun} class="self-center" />
		</div>
	{/if}
</button>
