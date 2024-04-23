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

<div class="h-full md:w-[250px]">
	<div
		class="fixed hidden h-full w-[250px] bg-inherit bg-primary text-white dark:bg-secondary-dark md:flex"
	>
		<ul class="flex h-full w-full flex-col gap-4 pl-3">
			<ul class="flex h-full w-full flex-col gap-4 transition-all duration-200">
				<li class="border-b px-2 py-12 dark:border-primary">
					<img src="/logo.svg" alt="" width="100" />
					<a href="/dashboard" class="text-2xl text-sky-400"
						><span class="text-white dark:text-light">Dev</span>Canvas
					</a><br />
					<span class="rounded bg-sky-200 p-[2px] text-primary">
						{$page.url.pathname}
					</span>
				</li>
				<li>
					<a
						href="/explore"
						class="w-full px-2 text-lg"
						class:text-sky-400={$page.url.pathname == '/explore'}
						>Explore
					</a>
				</li>
				<li>
					<a
						href="/dashboard"
						class="px-2 text-lg"
						class:text-sky-400={$page.url.pathname == '/dashboard'}>Your Collection</a
					>
				</li>
				<li>
					<a href="/play" class="px-2 text-lg" class:text-sky-400={$page.url.pathname == '/play'}
						>Online Editor</a
					>
				</li>
			</ul>

			<ul class="w-full">
				<li class="px-2 text-lg">
					{#if $user}
						<FeAccordion title={$profile?.name ?? 'Settings'}>
							<div class="flex flex-col gap-2 text-sm">
								<a href="/profile" class="flex items-center gap-2 rounded-lg bg-secondary-dark p-2"
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
					{:else}
						<li>
							<a href={signinURL} class="rounded-lg bg-green-400 p-2 text-primary">Login</a>
						</li>
					{/if}
				</li>
			</ul>
		</ul>
	</div>
</div>
