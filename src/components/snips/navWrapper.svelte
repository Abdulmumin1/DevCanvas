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
	// import { page } from '$app/store';
	let signinURL = handleRedirectURL($page.url);

	export let noSearch = false;
	// export let data;

	let profile = true;
	onMount(async () => {
		// console.log($page.data);

		try {
			let supabase = $page.data.supabase;
			const { data, error: err } = await supabase
				.from('profiles')
				.select('*')
				.eq('user_id', $page.data.session.user.id);
			if (err) throw err;
			profile = data.length > 0 ? data[0] : false;
		} catch (error) {}
	});
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
					<li><OverlayNav /></li>
					<li class="w-full"><Search /></li>
					<li class="text-black dark:text-white"><Darkmode /></li>

					{#if !$user}
						<li><a href={signinURL} class="bg-green-400 p-3 rounded-lg">Join</a></li>
					{:else}
						<li><ProfileCard /></li>
					{/if}
				</ul>
			</div>
		{/if}

		<div
			class="h-full w-full overflow-y-scroll px-4 md:px-6 mb-4"
			transition:fly={{ duration: 400 }}
		>
			<slot />
		</div>
	</div>
</div>
