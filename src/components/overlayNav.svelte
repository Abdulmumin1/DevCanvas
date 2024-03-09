<script>
	import { clickOutside } from '$lib/index.js';

	import { faBars, faClose, faWindowMaximize } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { scale, slide } from 'svelte/transition';

	let openSideBar = false;

	function toogleOpen() {
		openSideBar = !openSideBar;
	}

	import { getKbarState } from 'kbar-svelte-mini';

	let state = getKbarState();

	// your toggle function
	function toggleKbar() {
		$state = !$state;
	}
</script>

<ul
	class="flex justify-between items-center md:hidden dark:text-white bg-gray-200 p-2 rounded-md dark:bg-secondary-dark"
>
	<li class="flex items-center justify-center">
		<button on:click={toggleKbar} class="text-xl"><Fa icon={faBars} /></button>
	</li>
	{#if openSideBar}
		<li
			transition:slide={{ axis: 'x' }}
			use:clickOutside
			on:click_outside={toogleOpen}
			class="fixed top-0 left-0 w-[200px] h-screen z-50 bg-white p-4 dark:bg-primary shadow-lg"
		>
			<ul transition:scale class="flex justify-between items-end flex-col">
				<li class="w-full">
					<button on:click={toogleOpen} class="text-2xl"><Fa icon={faClose} /></button>
				</li>
				<li class="w-full text-base flex flex-col gap-2">
					<ul class="w-full flex flex-col justify-between gap-2 text-base dark:text-secondary-dark">
						<li class="p-3 bg-sky-200 rounded-xl"><a href="/dashboard" class="">Dashboard</a></li>
						<li class="p-3 bg-sky-200 rounded-xl"><a href="/explore" class="">Explore</a></li>
						<li class="p-3 bg-sky-200 rounded-xl"><a href="/blog" class="">Blog</a></li>

						<li class="p-3 bg-sky-200 rounded-xl">
							<a href="/play" class="">HTML Playground</a>
						</li>
					</ul>
				</li>
			</ul>
		</li>
	{/if}
</ul>
