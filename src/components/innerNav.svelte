<script>
	import { darkModeState } from '$lib/index.js';
	import { fade, fly } from 'svelte/transition';
	import Fa from 'svelte-fa';
	import Darkmode from './darkmode.svelte';
	import { faWindowMaximize, faPlus, faStar } from '@fortawesome/free-solid-svg-icons';
	import { page } from '$app/stores';
	import Open from './kbar/open.svelte';
	import MobileNav from './mobileNav.svelte';
</script>

<nav class="z-50 w-full border-b border-b-primary bg-sky-300">
	<div class="mx-auto max-w-7xl px-4 py-1 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<div class="flex items-center">
				<a href="/" class="active tex flex items-center space-x-3 px-3 py-2">
					<img
						src="/logo.svg"
						alt="DevCanvas"
						class="h-8 w-8 transition-all duration-300 hover:rotate-45"
					/>
					<span class="text-xl font-semibold text-white">DevCanvas</span>
				</a>
			</div>
			<div class=" hidden items-center space-x-2 md:flex">
				{#each ['Community', 'Blog'] as item}
					<a
						href="/{item.toLowerCase()}"
						class="nav-item {$page.url.pathname === `/${item.toLowerCase()}` ? 'active' : ''}"
					>
						{item}
					</a>
				{/each}
				<a href="/play/try" class="new-canvas-btn">
					<Fa icon={faPlus} class="mr-2" />
					New Canvas
				</a>
				<!-- <a
					href="https://github.com/Abdulmumin1/devcanvas"
					target="_blank"
					rel="noopener noreferrer"
					class="icon-link"
				>
					<Fa icon={faStar} />
				</a>
				<a href="/play" class="icon-link">
					<Fa icon={faWindowMaximize} />
				</a> -->
				<div class="active ml-3 flex aspect-square items-center justify-center p-1">
					<Darkmode />
				</div>
			</div>
			<div class="block text-black md:hidden">
				<MobileNav />
			</div>
		</div>
	</div>
</nav>

<style>
	.nav-item {
		color: #0e0e0e;
		padding: 0.5rem 0.75rem;
		border-radius: 0.375rem;
		font-size: 0.875rem;
		font-weight: 500;
		/* transition: color 0.2s; */
		position: relative;
	}

	.nav-item:hover {
		color: white; /* sky-900 for darker text on hover */
		background-color: #0e0e0e;
		border-radius: 9999px;
	}

	.active {
		color: white; /* sky-900 for darker text on hover */
		background-color: #0e0e0e;
		border-radius: 9999px;
	}

	.new-canvas-btn {
		background-color: #0e0e0e;
		color: white; /* sky-500 for better contrast */
		padding: 0.5rem 1rem;
		border-radius: 9999px;
		font-size: 0.875rem;
		font-weight: 500;
		display: flex;
		align-items: center;
		transition:
			background-color 0.2s,
			color 0.2s;
	}

	.new-canvas-btn:hover {
		background-color: #0e0e0e; /* sky-900 */
		color: white;
	}

	.icon-link {
		color: #0e0e0e;
		transition: color 0.2s;
	}

	.icon-link:hover {
		color: #0e0e0e; /* sky-900 */
	}
</style>
