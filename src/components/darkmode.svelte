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

<button on:click={handleSwitchDarkMode} class="flex p-1 items-center justify-center text-inherit">
	{#if $darkModeState}
		<div in:scale class=" cursor-pointer self-center hover-animate">
			<Fa icon={faMoon} class="self-center" />
		</div>
	{:else}
		<div in:scale class=" cursor-pointer self-center hover-animate">
			<Fa icon={faSun} class="self-center" />
		</div>
	{/if}
</button>
