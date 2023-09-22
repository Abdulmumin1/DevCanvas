<script>
	import { clickOutside } from '$lib/index.js';

	import { faBars, faClose, faWindowMaximize } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { slide } from 'svelte/transition';

	let openSideBar = false;

	function toogleOpen() {
		openSideBar = !openSideBar;
	}
</script>

<ul class="flex justify-between items-center md:hidden dark:text-white">
	<li class="flex items-center justify-center">
		<button on:click={toogleOpen}><Fa icon={faBars} /></button>
	</li>
	{#if openSideBar}
		<li
			transition:slide={{ axis: 'x' }}
			use:clickOutside
			on:click_outside={toogleOpen}
			class="fixed top-0 left-0 w-full h-screen z-50 bg-white p-4 dark:bg-primary shadow-lg"
		>
			<ul class="flex justify-between items-end flex-col">
				<li>
					<button on:click={toogleOpen}><Fa icon={faClose} /></button>
				</li>
				<li class="w-full text-xl flex flex-col gap-4">
					<ul class="w-full flex flex-col text-center items-center justify-center">
						<li><a href="/explore">Explore</a></li>
						<li><a href="/dashboard">Dashboard</a></li>

						<li><a href="/play">HTML Playground</a></li>
					</ul>
				</li>
			</ul>
		</li>
	{/if}
</ul>
