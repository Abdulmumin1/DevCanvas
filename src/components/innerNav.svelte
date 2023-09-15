<script>
	import Fa from 'svelte-fa';
	import { faGithub, faWpexplorer } from '@fortawesome/free-brands-svg-icons';
	import logo from '$lib/logo.png';
	import Darkmode from './darkmode.svelte';
	import { faBars, faClose, faWindowMaximize } from '@fortawesome/free-solid-svg-icons';
	import { slide } from 'svelte/transition';
	import { clickOutside } from '$lib/index.js';

	let openSideBar = false;

	function toogleOpen() {
		openSideBar = !openSideBar;
	}
</script>

<div class="w-full p-2 bg-sky-300 text-sky-dark text-sm md:text-lg">
	SnippetLand is experimenting with an interactive HTML playground 🤩 <a
		class="underline text-sky-900"
		href="/html-playground"
		>Try it
	</a>
	🚀
</div>
<div class="h-[12vh] p-3 w-full bg-inherit">
	<ul class="hidden md:flex w-full justify-between items-center">
		<li
			class="text-base md:text-lg py-2 px-3 gap-3 text-light bg-secondary-dark flex items-center justify-center rounded-3xl"
		>
			<img src={logo} class="h-6 w-6" alt="snippetsLand" />
			<a href="/"> SnippetLand </a>
		</li>
		<li>
			<ul class="flex gap-2 items-center">
				<li class="bg-secondary-dark text-light rounded-full py-2 px-3">
					<a class="flex gap-2 items-center justify-center" href="/explore">
						Explore <Fa icon={faWpexplorer} class="" /></a
					>
				</li>
				<li class="bg-secondary-dark text-light rounded-full py-2 px-3">
					<a class="flex gap-2 items-center justify-center" href="/html-playground">
						HTML Playground <Fa icon={faWindowMaximize} class="" /></a
					>
				</li>
				<li class="bg-secondary-dark text-light rounded-full">
					<div class="flex gap-2 items-center justify-center"><Darkmode /></div>
				</li>
				<li class="bg-secondary-dark text-light rounded-full p-3">
					<a
						class="flex gap-2 items-center justify-center"
						href="https://github.com/Abdulmumin1/snippets"
						target="_blank"
					>
						<Fa icon={faGithub} class="" /></a
					>
				</li>
			</ul>
		</li>
	</ul>

	<ul class="flex justify-between items-center md:hidden">
		<li
			class="text-base md:text-lg py-2 px-3 gap-3 text-light bg-secondary-dark flex items-center justify-center rounded-3xl"
		>
			<img src={logo} class="h-6 w-6" alt="snippetsLand" />
			<a href="/"> SnippetLand </a>
		</li>

		<li class="flex items-center justify-center gap-4">
			<div class="bg-secondary-dark text-light rounded-xl">
				<Darkmode />
			</div>
			<button on:click={toogleOpen}><Fa icon={faBars} /></button>
		</li>
		{#if openSideBar}
			<li
				transition:slide={{ axis: 'x' }}
				use:clickOutside
				on:click_outside={toogleOpen}
				class="fixed top-0 right-0 w-[90%] h-screen z-50 bg-white p-4 dark:bg-primary shadow-lg"
			>
				<ul class="flex justify-between items-end flex-col">
					<li>
						<button on:click={toogleOpen}><Fa icon={faClose} /></button>
					</li>
					<li class="w-full text-xl flex flex-col gap-4">
						<ul class="w-full flex flex-col text-center items-center justify-center">
							<li><a href="/explore">Explore</a></li>
							<li><a href="/html-playground">HTML Playground</a></li>
						</ul>
					</li>
				</ul>
			</li>
		{/if}
	</ul>
</div>
