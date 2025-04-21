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
  
  <nav class="z-50 w-full md:w-fit mx-auto  p-2 py-3 ">
	<div class="mx-auto max-w-7xl bg-sky-300/65 rounded-full px-1 py-0 ">
	  <div class="flex h-12 items-center gap-8 justify-between">
		<div class="flex items-center">
		  <a href="/" class="flex items-center space-x-2 rounded-full bg-black px-2 py-1.5 text-white">
			<img
			  src="/logo.svg"
			  alt="DevCanvas"
			  class="size-[1.5rem] transition-all duration-300 hover:rotate-45"
			/>
			<span class="text-lg font-semibold ">Devcanvas</span>
		  </a>
		</div>
		
		<div class="hidden items-center md:flex text-sm">
		  <div class="flex items-center rounded-full bg-white/20 p-1">
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
			
			<div class="ml-2 flex aspect-square items-center justify-center rounded-full p-1 text-black">
			  <Darkmode />
			</div>
		  </div>
		</div>
		
		<div class="flex items-center text-black   p-2 md:hidden">
		  <MobileNav />
		</div>
	  </div>
	</div>
  </nav>
  
  <style>
	.nav-item {
	  color: #0e0e0e;
	  padding: 0.5rem 0.75rem;
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
	  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
	}
  </style>