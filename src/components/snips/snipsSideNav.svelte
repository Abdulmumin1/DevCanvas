<script>
	import { user } from '$lib/index.js';
	import { page } from '$app/stores';
	import FeAccordion from '../fePlayground/feAccordion.svelte';
	import { handleRedirectURL } from '$lib/utils.js';

	import Signout from '../signout.svelte';
	import Fa from 'svelte-fa';
	import { faPerson, faPersonArrowUpFromLine, faUser } from '@fortawesome/free-solid-svg-icons';

	let signinURL = handleRedirectURL($page.url);
</script>

<div class="h-full md:w-[250px]">
	<div
		class="h-full hidden md:flex bg-inherit w-[250px] text-white fixed bg-primary dark:bg-secondary-dark"
	>
		<ul class="w-full h-full flex flex-col gap-4 pl-3">
			<ul class="w-full h-full flex flex-col gap-4 transition-all duration-200">
				<li class="py-12 px-2 border-b dark:border-primary">
					<img src="/logo.svg" alt="" width="100" />
					<a href="/dashboard" class="text-2xl text-sky-400"
						><span class="text-white dark:text-light">Dev</span>Canvas
					</a><br />
					<span class="bg-sky-200 rounded text-primary p-[2px]">
						{$page.url.pathname}
					</span>
				</li>
				<li>
					<a
						href="/explore"
						class="text-lg px-2 w-full"
						class:text-sky-400={$page.url.pathname == '/explore'}
						>Explore
					</a>
				</li>
				<li>
					<a
						href="/dashboard"
						class="text-lg px-2"
						class:text-sky-400={$page.url.pathname == '/dashboard'}>Your Collection</a
					>
				</li>
				<li>
					<a href="/play" class="text-lg px-2" class:text-sky-400={$page.url.pathname == '/play'}
						>Online Editor</a
					>
				</li>
			</ul>

			<ul class="w-full">
				<li class="text-lg px-2">
					{#if $user}
						<FeAccordion title={'Settings'}>
							<div class="flex flex-col gap-2">
								<a href="/profile" class="flex items-center gap-2 bg-secondary-dark rounded-lg p-2"
									><Fa icon={faUser} />Profile</a
								>
								<div class="bg-error w-full text-black rounded-xl p-1">
									<Signout />
								</div>
							</div>
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
</div>
