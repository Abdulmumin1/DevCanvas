<script>
	import { user } from '$lib/index.js';
	import { page } from '$app/stores';
	import FeAccordion from '../fePlayground/feAccordion.svelte';
	import { handleRedirectURL } from '$lib/utils.js';
	import { getProfile } from '$lib/index.js';

	import Signout from '../signout.svelte';
	import Fa from 'svelte-fa';
	import { faUser } from '@fortawesome/free-solid-svg-icons';

	let signinURL = handleRedirectURL($page.url);

	let profile = getProfile();
</script>

<div class="h-full md:w-[250px] ">
	<div
		class="fixed hidden h-full w-[250px] bg-inherit  bg-light dark:bg-secondary-dark  text-black dark:text-white md:flex"
	>
		<ul class="flex h-full w-full flex-col gap-4 pl-3">
			<ul class="flex h-full w-full flex-col gap-4 transition-all duration-200">
				<li class="border-b px-2 py-12 border-black/15 dark:border-primary">
					<a href="/" ><img src="/logo.svg" class="bg-white/50 dark:bg-primary/50 dark:text-white rounded-full" alt="" width="100" /></a>
					<a href="/dashboard" class="text-lg text-sky-900"
						><span class="text-black dark:text-white ">Dev</span>Canvas
					</a><br />
					<span class="rounded text-xs bg-white/50 dark:bg-primary/50 dark:text-white p-1 text-primary">
						{$page.url.pathname}
					</span>
				</li>
				<li>
					<a
						href="/explore"
						class="w-full px-2 text-sm bg-white/50 dark:bg-primary/50 dark:text-white py-1 rounded-lg"
						class:text-sky-800={$page.url.pathname == '/explore'}
						>Community
					</a>
				</li>
				<li>
					<a
						href="/snippets"
						class="px-2 text-sm bg-white/50 dark:bg-primary/50 dark:text-white py-1 rounded-lg"
						class:text-sky-800={$page.url.pathname.startsWith('/snippets')}>Snippets</a
					>
				</li>
				<li>
					<a
						href="/dashboard"
						class="px-2 text-sm bg-white/50 dark:bg-primary/50 dark:text-white py-1 rounded-lg"
						class:text-sky-800={$page.url.pathname == '/dashboard'}>Your Collection</a
					>
				</li>
				<li>
					<a
						href="/play"
						class="px-2 text-sm bg-white/50 dark:bg-primary/50 dark:text-white py-1 rounded-lg"
						class:text-sky-800={$page.url.pathname.startsWith('/play')}>Create</a
					>
				</li>
			</ul>

			<ul class="w-full">
				<li class="px-2 text-sm">
					{#if $user}
						<FeAccordion title={$profile?.user_metadata?.name ?? 'Settings'}>
							<div class="flex flex-col gap-2 text-sm">
								<a href="/profile" class="flex items-center gap-2 rounded-lg bg-gray-300 dark:bg-secondary-dark p-2"
									><Fa icon={faUser} />Profile</a
								>
								<!-- <div>
									<a
										href="/pro/activate"
										class="bg-secondary-dark p-1 py-2 text-sm w-full text-left rounded-lg flex gap-2 items-center"
									>
										<Fa icon={faMagicWandSparkles} />Pro<Fa icon={faStar} />
									</a>
								</div> -->
								<div class="w-full rounded-xl bg-error p-1 text-black">
									<Signout />
								</div>
							</div>
						</FeAccordion>
					{/if}
				</li>
			</ul>
		</ul>
	</div>
</div>
