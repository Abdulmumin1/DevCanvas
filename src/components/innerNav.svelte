<script>
	import Fa from 'svelte-fa';
	import { faGithub, faWpexplorer } from '@fortawesome/free-brands-svg-icons';
	import Darkmode from './darkmode.svelte';
	import { faBars, faBlog, faClose, faWindowMaximize } from '@fortawesome/free-solid-svg-icons';
	import { scale, slide } from 'svelte/transition';
	import { clickOutside } from '$lib/index.js';
	import { page } from '$app/stores';
	import Open from './kbar/open.svelte';

	let openSideBar = false;

	function toogleOpen() {
		openSideBar = !openSideBar;
	}
</script>

<div
	class="w-full border-b border-secondary-dark p-2 bg-sky-300 text-sky-dark text-sm text-center flex items-center justify-center"
>
	Free Palestine 🇵🇸, DO NOT BE SILENCED
</div>
<div
	class="flex items-center justify-center py-3 top-0 border-b border-primary dark:border-secondary-dark"
>
	<div class="h-[50px] px-2 w-full bg-inherit max-w-[1200px]">
		<ul class="hidden md:flex w-full justify-between items-center">
			<li
				class="text-base md:text-lg py-2 px-3 gap-3 text-light bg-secondary-dark flex items-center justify-center rounded-3xl"
			>
				<img src="/logo.svg" class="h-8 w-8" alt="devCanvas" />
				<a href="/"> DevCanvas </a>
			</li>
			<li>
				<ul class="flex gap-2 items-center">
					<li class="bg-secondary-dark text-light rounded-full py-2 px-3">
						<Open />
					</li>
					<li class="bg-secondary-dark text-light rounded-full py-2 px-3">
						<a class="flex gap-2 items-center justify-center" href="/play">
							Playground <Fa icon={faWindowMaximize} class="" /></a
						>
					</li>

					<li class="bg-secondary-dark p-2 rounded-full" class:landing={$page.url.pathname == '/'}>
						<div class="flex gap-2 items-center justify-center text-light">
							<Darkmode />
						</div>
					</li>
				</ul>
			</li>
		</ul>

		<ul class="flex justify-between items-center md:hidden">
			<li
				class="text-base md:text-lg py-2 px-3 gap-3 text-light bg-secondary-dark flex items-center justify-center rounded-3xl"
			>
				<img src="/logo.svg" class="h-6 w-6" alt="snippetsLand" />
				<a href="/"> devCanvas </a>
			</li>

			<li
				class="flex items-center justify-center gap-4 text-xl bg-secondary-dark text-light py-2 px-3 rounded-3xl"
			>
				<Darkmode />
				<button on:click={toogleOpen}><Fa icon={faBars} /></button>
			</li>
			{#if openSideBar}
				<li
					transition:slide={{ axis: 'x' }}
					use:clickOutside
					on:click_outside={toogleOpen}
					class="fixed top-0 right-0 w-screen h-screen z-50 bg-white p-4 dark:bg-primary shadow-lg"
				>
					<ul transition:scale class="flex gap-4 justify-between items-end flex-col">
						<li>
							<button on:click={toogleOpen} class="text-4xl"><Fa icon={faClose} /></button>
						</li>
						<li class="w-full text-xl flex flex-col gap-4">
							<ul
								class="w-full flex flex-col justify-between gap-4 text-4xl dark:text-secondary-dark"
							>
								<li class="p-6 bg-sky-200 rounded-xl"><a href="/explore" class="">Explore</a></li>
								<li class="p-6 bg-sky-200 rounded-xl">
									<a href="/play" class="">HTML Playground</a>
								</li>
								<li class="p-6 bg-sky-200 rounded-xl"><a href="/blog" class="">Blog</a></li>
							</ul>
						</li>
					</ul>
				</li>
			{/if}
		</ul>
	</div>
</div>

<style>
	.landing:first-child {
		color: aliceblue !important;
		/* font-size: 1000px; */
	}
</style>
