<script>
	import SnipsSideNav from './snipsSideNav.svelte';
	import { user, getProfile } from '$lib/index.js';
	import Darkmode from '../darkmode.svelte';
	import { page } from '$app/stores';
	import { handleRedirectURL } from '$lib/utils.js';
	import Search from '../search.svelte';
	import OverlayNav from '../overlayNav.svelte';
	import ProfileCard from '../profileCard.svelte';
	import { fly } from 'svelte/transition';
	import { onMount, tick } from 'svelte';
	import Open from '../kbar/open.svelte';

	let signinURL = handleRedirectURL($page.url);

	export let noSearch = false;
	// export let data;

	let profile = getProfile();

	let show = false;

	onMount(async () => {
		await tick();
		setTimeout(() => (show = true), 2000);
		// show = true;
	});
</script>

<div class="flex h-screen min-h-screen w-full">
	<div class=" h-full bg-inherit">
		<SnipsSideNav />
	</div>

	<!-- second part -->

	<div class="flex h-full w-full flex-col">
		<!-- Upper nave -->

		{#if !$profile & (show && $user)}
			<p class="bg-primary p-2 text-center text-white dark:bg-secondary-dark">
				<a href="/profile">Complete your profile setup</a>
			</p>
		{/if}

		{#if !noSearch}
			<div class="w-full border-b px-3 py-3 text-primary dark:border-secondary-dark">
				<ul class="flex w-full items-center justify-end gap-2">
					<ul class="flex w-full items-center justify-center gap-2">
						<li class="flex-1"><Search /></li>
						<li><OverlayNav /></li>

						<li
							class="hidden w-fit rounded-lg px-3 py-2 text-sm text-black dark:text-white md:flex"
						>
							<Open />
						</li>

						<!-- <li class="hidden text-black dark:text-white md:block"><Darkmode /></li> -->

						{#if !$user}
							<li><a href={signinURL} class="rounded-lg bg-green-400 p-3">Join</a></li>
						{:else}
							<li><ProfileCard /></li>
						{/if}
					</ul>
				</ul>
			</div>
		{/if}

		<div
			class="mb-4 h-full w-full overflow-y-scroll px-4 md:px-6"
			transition:fly={{ x: 10, duration: 400 }}
		>
			<slot />
		</div>
	</div>
</div>
