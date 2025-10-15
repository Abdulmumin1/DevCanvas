<script>
	import { user } from '$lib/stores/index.js';
	import { page } from '$app/stores';
	import FeAccordion from '$components/features/playground/feAccordion.svelte';
	import { handleRedirectURL } from '$lib/utils.js';
	import Signout from '$components/ui/signout.svelte';
	let signinURL = handleRedirectURL($page.url);

	// Define navigation items for cleaner rendering
	const navItems = [
		{ href: '/explore', label: 'Community', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart-handshake-icon lucide-heart-handshake"><path d="M19.414 14.414C21 12.828 22 11.5 22 9.5a5.5 5.5 0 0 0-9.591-3.676.6.6 0 0 1-.818.001A5.5 5.5 0 0 0 2 9.5c0 2.3 1.5 4 3 5.5l5.535 5.362a2 2 0 0 0 2.879.052 2.12 2.12 0 0 0-.004-3 2.124 2.124 0 1 0 3-3 2.124 2.124 0 0 0 3.004 0 2 2 0 0 0 0-2.828l-1.881-1.882a2.41 2.41 0 0 0-3.409 0l-1.71 1.71a2 2 0 0 1-2.828 0 2 2 0 0 1 0-2.828l2.823-2.762"/></svg>', pathMatch: '/explore' },
		{ href: '/snippets', label: 'Snippets', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-code-icon lucide-code"><path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/></svg>`, pathMatch: '/snippets' },
		{ href: '/dashboard', label: 'Your Collection', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-layers-icon lucide-layers"><path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"/><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"/><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"/></svg>`, pathMatch: '/dashboard' },
		{ href: '/play', label: 'Create', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil-icon lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>`, pathMatch: '/play' }
	];
</script>

<div class="h-full md:w-64">
	<div class="fixed hidden h-full w-64 bg-neutral-100 shadow-md dark:bg-secondary-dark md:flex">
		<div class="flex h-full w-full flex-col justify-between">
			<!-- Top section with logo and navigation -->
			<div class="flex w-full flex-col">
				<!-- Logo and site name -->
				<div class="border-b border-neutral-200 p-6 dark:border-neutral-700">
					<a href="/" class="mb-2 flex items-center">
						<img
							src="/logo.svg"
							class="rounded-full bg-white/90 p-1 shadow-sm dark:bg-neutral-800"
							alt="DevCanvas Logo"
							width="80"
						/>
					</a>
					<a href="/dashboard" class="mt-2 block text-xl font-bold">
						<span class="text-neutral-800 dark:text-neutral-100">Dev</span>
						<span class="text-sky-600 dark:text-sky-300">Canvas</span>
					</a>
					<div class="mt-2 flex">
						<span
							class="max-w-full truncate rounded-full bg-neutral-200 px-3 py-1 font-mono text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
						>
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
									class="flex items-center gap-3 px-4 py-2.5 transition-colors duration-200 hover:bg-sky-300/10
					  {$page.url.pathname.startsWith(item.pathMatch)
										? 'bg-gradient-to-r from-sky-300 to-sky-400 font-medium text-black'
										: 'text-neutral-700 dark:text-neutral-300'}"
								>
									{@html item.icon}
									{item.label}
								</a>
							</li>
						{/each}
					</ul>
				</nav>
			</div>

			<!-- User section at bottom -->
			<div class="mt-auto border-t border-neutral-200 p-4 dark:border-neutral-700">
				{#if $user}
					<FeAccordion
						title={$user?.user_metadata?.name ?? 'Settings'}
						buttonClass="w-full bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 px-4 py-2.5 rounded-lg flex justify-between items-center"
					>
						<div
							class="mt-2 flex flex-col gap-2 rounded-lg bg-neutral-200/50 p-2 dark:bg-neutral-700/50"
						>
							<a
								href="/profile"
								class="flex items-center gap-3 rounded-lg px-3 py-2 text-neutral-800 hover:bg-sky-300/20 dark:text-neutral-200"
							>
								<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-icon lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
								Profile
							</a>

							<div class="mt-2 w-full rounded-lg">
								<Signout
									buttonClass="w-full bg-neutral-300 dark:bg-neutral-600 hover:bg-neutral-400 dark:hover:bg-neutral-500 px-3 py-2 rounded-lg text-neutral-800 dark:text-neutral-200"
								/>
							</div>
						</div>
					</FeAccordion>
				{:else}
					<a
						href={signinURL}
						class="block w-full rounded-lg bg-sky-300 px-4 py-2.5 text-center text-neutral-800 transition-colors duration-200 hover:bg-sky-400"
					>
						Sign In
					</a>
				{/if}
			</div>
		</div>
	</div>
</div>
