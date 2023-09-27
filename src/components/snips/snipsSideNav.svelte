<script>
	import { user } from '$lib/index.js';
	import { page } from '$app/stores';
	import FeAccordion from '../fePlayground/feAccordion.svelte';
	import { handleRedirectURL } from '$lib/utils.js';

	import Signout from '../signout.svelte';

	let signinURL = handleRedirectURL($page.url);
</script>

<div class="h-full md:w-[200px]">
	<div
		class="h-full hidden md:flex bg-inherit w-[200px] text-white fixed bg-primary dark:bg-secondary-dark"
	>
		<ul class="w-full h-full flex flex-col gap-4 pl-3">
			<ul class="w-full h-full flex flex-col gap-4 transition-all duration-200">
				<li class="py-12 px-2 border-b dark:border-primary">
					<a href="/dashboard" class="text-2xl text-sky-400"
						><span class="text-white dark:text-light">Snippet</span>Land</a
					>
					<span class="bg-sky-200 rounded text-primary p-[2px]">
						{$page.url.pathname}
					</span>
				</li>
				<li>
					<a
						href="/explore"
						class="text-lg px-2 w-full"
						class:text-sky-400={$page.url.pathname == '/explore'}
						>Library
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
</div>
