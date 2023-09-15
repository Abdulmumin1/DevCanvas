<script>
	import Fa from 'svelte-fa';
	import { faGithub, faWpexplorer } from '@fortawesome/free-brands-svg-icons';
	import logo from '$lib/logo.png';
	import { faBars, faClose, faWindowMaximize } from '@fortawesome/free-solid-svg-icons';
	import { slide } from 'svelte/transition';
	import { clickOutside, user } from '$lib/index.js';
	import { page } from '$app/stores';
	import FeAccordion from '../fePlayground/feAccordion.svelte';
	import { handleRedirectURL } from '$lib/utils.js';

	import Signout from '../signout.svelte';
	let openSideBar = false;

	function toogleOpen() {
		openSideBar = !openSideBar;
	}
	let signinURL = handleRedirectURL($page.url);
</script>

<div class="h-full md:w-[200px]">
	<div
		class="h-full hidden md:flex bg-inherit w-[200px] text-white fixed bg-primary dark:bg-secondary-dark"
	>
		<ul class="w-full h-full flex flex-col gap-4">
			<ul class="w-full h-full flex flex-col gap-4">
				<li class="py-12 px-2 border-b dark:border-primary">
					<a href="/dashboard" class="text-3xl text-sky-400"
						><span class="text-white dark:text-light">Snippets</span>Land</a
					>
					<span class="bg-sky-200 rounded text-primary p-[2px]">
						{$page.url.pathname}
					</span>
				</li>
				<li><a href="/explore" class="text-lg px-2">Library</a></li>
				<li><a href="/dashboard" class="text-lg px-2">Snips</a></li>
				<li><a href="/html-playground" class="text-lg px-2">Online Editor</a></li>
			</ul>

			<ul class="w-full">
				<li class="text-lg px-2">
					{#if $user}
						<FeAccordion title="Logout">
							<Signout />
						</FeAccordion>
					{:else}
						<li>
							<a href={signinURL} class="bg-green-400 p-2 text-primary rounded-lg">Login</a>
						</li>
					{/if}
				</li>
			</ul>
		</ul>
	</div>
	<ul class="flex justify-between items-center md:hidden">
		<li class="flex items-center justify-center gap-4 mt-14 mx-3 absolute">
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
							<li><a href="/html-playground">HTML Playground</a></li>
						</ul>
					</li>
				</ul>
			</li>
		{/if}
	</ul>
</div>
