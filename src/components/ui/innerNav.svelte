<script>
	import { darkModeState } from '$lib/stores/index.js';
	import { fade, fly } from 'svelte/transition';
	import Fa from 'svelte-fa';
	import Darkmode from './darkmode.svelte';
	import { faWindowMaximize, faPlus, faStar } from '@fortawesome/free-solid-svg-icons';
	import { page } from '$app/state';
	import Open from './open.svelte';
	import MobileNav from './mobileNav.svelte';
</script>

<nav class="z-50 mx-auto w-full p-2 pt-4 md:pt-6 md:w-fit">
	<div class="mx-auto w-full md:w-[700px] rounded-full border border-sky-900 bg-sky-300/65 dark:bg-sky-300/80 px-2 py-1 md:px-4 md:py-2">
		<div class="flex h-12 items-center justify-between gap-8">
			<div class="flex items-center">
				<a
					href="/"
					class="flex items-center space-x-2 rounded-full bg-black px-2 py-1.5 text-white"
				>
					<img
						src="/logo.svg"
						alt="DevCanvas"
						class="size-[1.5rem] transition-all duration-300 hover:rotate-45"
					/>
					<span class="text-lg font-semibold">Devcanvas</span>
				</a>
			</div>

			<div class="hidden items-center text-sm md:flex">
				<div class="flex items-center rounded-full">
					{#each ['Community', 'Blog'] as item}
						<a
							href="/{item.toLowerCase()}"
							class="nav-item px-3 py-2 {page.url.pathname === `/${item.toLowerCase()}`
								? 'active'
								: ''}"
						>
							{item}
						</a>
					{/each}

					<a href="/play/try" class="new-canvas-btn">
						<Fa icon={faPlus} class="mr-2" />
						New Canvas
					</a>

					<div class="flex aspect-square items-center justify-center rounded-full p-0.5 text-black">
						<Darkmode />
					</div>
				</div>
			</div>

			<div class="flex items-center p-2 text-black md:hidden">
				<MobileNav />
			</div>
		</div>
	</div>
</nav>

<style>
	.nav-item {
		color: #0e0e0e;
		border-radius: 9999px;
		font-size: 0.875rem;
		font-weight: 500;
		position: relative;
		margin: 0 0.25rem;
		transition: all 0.2s ease;
	}

	.nav-item:hover {
		color: white;
		background-color: #0e0e0e;
	}

	.active {
		color: white;
		background-color: #0e0e0e;
	}

	.new-canvas-btn {
		background-color: #0e0e0e;
		color: white;
		padding: 0.5rem 1rem;
		border-radius: 9999px;
		font-size: 0.875rem;
		font-weight: 500;
		display: flex;
		align-items: center;
		margin: 0 0.25rem;
		transition: all 0.2s ease;
	}

	.new-canvas-btn:hover {
		background-color: #1a1a1a;
		transform: translateY(-1px);
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}
</style>
