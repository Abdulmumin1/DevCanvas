<script>
	import { user } from '$lib/stores/index.js';
	import { page } from '$app/stores';
	import FeAccordion from '$components/features/playground/feAccordion.svelte';
	import { handleRedirectURL } from '$lib/utils.js';
	import Signout from '$components/ui/signout.svelte';
	import Fa from 'svelte-fa';
	import { faUser } from '@fortawesome/free-solid-svg-icons';
	import { HeartHandshake, Code, Layers, Pencil, User } from 'lucide-svelte';
	let signinURL = handleRedirectURL($page.url);

	// Define navigation items for cleaner rendering
	const navItems = [
		{ href: '/explore', label: 'Community', icon: HeartHandshake, pathMatch: '/explore' },
		{ href: '/snippets', label: 'Snippets', icon: Code, pathMatch: '/snippets' },
		{ href: '/dashboard', label: 'Your Collection', icon: Layers, pathMatch: '/dashboard' },
		{ href: '/play', label: 'Create', icon: Pencil, pathMatch: '/play' }
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
									<svelte:component this={item.icon} size={17} />
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
								<User size={16} class="text-sky-500 dark:text-sky-300" />
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
