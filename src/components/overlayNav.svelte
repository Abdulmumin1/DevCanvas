<script>
	import { clickOutside } from '$lib/index.js';

	import { faBars, faClose, faWindowMaximize } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { scale, slide } from 'svelte/transition';

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
			<ul transition:scale class="flex justify-between items-end flex-col">
				<li>
					<button on:click={toogleOpen} class="text-2xl"><Fa icon={faClose} /></button>
				</li>
				<li class="w-full text-xl flex flex-col gap-4">
					<ul class="w-full flex flex-col justify-between gap-4 text-4xl dark:text-secondary-dark">
						<li class="p-6 bg-sky-200 rounded-xl"><a href="/dashboard" class="">Dashboard</a></li>
						<li class="p-6 bg-sky-200 rounded-xl"><a href="/explore" class="">Explore</a></li>
						<li class="p-6 bg-sky-200 rounded-xl"><a href="/blog" class="">Blog</a></li>

						<li class="p-6 bg-sky-200 rounded-xl">
							<a href="/play" class="">HTML Playground</a>
						</li>
					</ul>
				</li>
			</ul>
		</li>
	{/if}
</ul>
