<script>
	import { user } from '$lib/index.js';
	import { page } from '$app/stores';
	import FeAccordion from '../fePlayground/feAccordion.svelte';
	import { handleRedirectURL } from '$lib/utils.js';
	import Signout from '../signout.svelte';
	import Fa from 'svelte-fa';
	import { faUser } from '@fortawesome/free-solid-svg-icons';
	import {HeartHandshake, Code, Layers, Pencil, User} from 'lucide-svelte'
	let signinURL = handleRedirectURL($page.url);
	
	// Define navigation items for cleaner rendering
	const navItems = [
	  { href: '/explore', label: 'Community', icon: HeartHandshake , pathMatch: '/explore' },
	  { href: '/snippets', label: 'Snippets', icon: Code, pathMatch: '/snippets' },
	  { href: '/dashboard', label: 'Your Collection', icon: Layers, pathMatch: '/dashboard' },
	  { href: '/play', label: 'Create', icon: Pencil, pathMatch: '/play' }
	];
  </script>
  
  <div class="h-full md:w-64">
	<div class="fixed hidden h-full w-64 bg-neutral-100 dark:bg-secondary-dark shadow-md md:flex">
	  <div class="flex h-full w-full flex-col justify-between">
		<!-- Top section with logo and navigation -->
		<div class="flex flex-col w-full">
		  <!-- Logo and site name -->
		  <div class="border-b border-neutral-200 dark:border-neutral-700 p-6">
			<a href="/" class="flex items-center  mb-2">
			  <img src="/logo.svg" class="bg-white/90 dark:bg-neutral-800 rounded-full p-1 shadow-sm" alt="DevCanvas Logo" width="80" />
			</a>
			<a href="/dashboard" class="block  text-xl font-bold mt-2">
			  <span class="text-neutral-800 dark:text-neutral-100">Dev</span>
			  <span class="text-sky-600 dark:text-sky-300">Canvas</span>
			</a>
			<div class="flex  mt-2">
			  <span class="rounded-full text-xs bg-neutral-200 dark:bg-neutral-800 px-3 py-1 text-neutral-600 dark:text-neutral-300 font-mono truncate max-w-full">
				{$page.url.pathname}
			  </span>
			</div>
		  </div>
		  
		  <!-- Navigation links -->
		  <nav class="py-6">
			<ul class="flex flex-col gap-3">
			  {#each navItems as item}
				<li>
				  <a 
					href={item.href}
					class="flex items-center gap-3 px-4 py-2.5  transition-colors duration-200 hover:bg-sky-300/10 
					  {$page.url.pathname.startsWith(item.pathMatch) ? 
						'bg-gradient-to-r from-sky-300 to-sky-400 text-black font-medium' : 
						'text-neutral-700 dark:text-neutral-300'}"
				  >
					<svelte:component size={17} this={item.icon}  />
					{item.label}
				  </a>
				</li>
			  {/each}
			</ul>
		  </nav>
		</div>
		
		<!-- User section at bottom -->
		<div class="border-t border-neutral-200 dark:border-neutral-700 p-4 mt-auto">
		  {#if $user}
			<FeAccordion title={$user?.user_metadata?.name ?? 'Settings'} buttonClass="w-full bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 px-4 py-2.5 rounded-lg flex justify-between items-center">
			  <div class="flex flex-col gap-2 p-2 mt-2 bg-neutral-200/50 dark:bg-neutral-700/50 rounded-lg">
				<a 
				  href="/profile" 
				  class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-sky-300/20 text-neutral-800 dark:text-neutral-200"
				>
				  <User  size={16} class="text-sky-500 dark:text-sky-300" />
				  Profile
				</a>
				
				<div class="w-full rounded-lg mt-2">
				  <Signout buttonClass="w-full bg-neutral-300 dark:bg-neutral-600 hover:bg-neutral-400 dark:hover:bg-neutral-500 px-3 py-2 rounded-lg text-neutral-800 dark:text-neutral-200" />
				</div>
			  </div>
			</FeAccordion>
		  {:else}
			<a 
			  href={signinURL} 
			  class="block w-full text-center bg-sky-300 hover:bg-sky-400 text-neutral-800 px-4 py-2.5 rounded-lg transition-colors duration-200"
			>
			  Sign In
			</a>
		  {/if}
		</div>
	  </div>
	</div>
  </div>