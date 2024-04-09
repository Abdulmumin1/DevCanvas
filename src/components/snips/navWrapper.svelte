<script>
	import SnipsSideNav from './snipsSideNav.svelte';
	import { user } from '$lib/index.js';
	import Darkmode from '../darkmode.svelte';
	import { page } from '$app/stores';
	import { handleRedirectURL } from '$lib/utils.js';
	import Search from '../search.svelte';
	import OverlayNav from '../overlayNav.svelte';
	import ProfileCard from '../profileCard.svelte';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import Open from '../kbar/open.svelte';
	// import { page } from '$app/store';
	let signinURL = handleRedirectURL($page.url);

	export let noSearch = false;
	// export let data;

	let profile = true;

	async function loadprofile() {
		try {
			let supabase = $page.data.supabase;
			const { data, error: err } = await supabase
				.from('profiles')
				.select('*')
				.eq('user_id', $page.data.session.user.id);
			if (err) throw err;
			profile = data.length > 0 ? data[0] : false;
		} catch (error) {}
	}

	loadprofile().then(() => {});
	// 	onMount(async () => {
	// 		// console.log($page.data);
	// );
</script>

<div class="flex min-h-screen h-screen w-full">
	<div class=" bg-inherit h-full">
		<SnipsSideNav name={profile?.name} />
	</div>

	<!-- second part -->

	<div class="flex flex-col h-full w-full">
		<!-- Upper nave -->

		{#if !profile}
			<p class="dark:bg-secondary-dark text-white p-2 bg-primary text-center">
				<a href="/profile">Complete your profile setup</a>
			</p>
		{/if}

		{#if !noSearch}
			<div class="w-full px-3 py-3 border-b text-primary dark:border-secondary-dark">
				<ul class="flex items-center justify-end w-full gap-2">
					<ul class="w-full flex items-center justify-center gap-2">
						<li class="flex-1"><Search /></li>
						<li><OverlayNav /></li>

						<li
							class="text-sm hidden md:flex bg-gray-100 dark:bg-secondary-dark dark:text-light rounded-xl py-2 px-3 w-fit"
						>
							<Open />
						</li>

						<li class="text-black dark:text-white hidden md:block"><Darkmode /></li>

						{#if !$user}
							<li><a href={signinURL} class="bg-green-400 p-3 rounded-lg">Join</a></li>
						{:else}
							<li><ProfileCard /></li>
						{/if}
					</ul>
				</ul>
			</div>
		{/if}

		<div
			class="h-full w-full overflow-y-scroll px-4 md:px-6 mb-4"
			transition:fly={{ x: 10, duration: 400 }}
		>
			<slot />
		</div>
	</div>
</div>
