<script>
	import '../tailwind.css';
	import '../app.css';
	import { supabase } from '$lib/supabase.js';
	import { onMount } from 'svelte';
	import { user, dashboardLoading, SnippetsDescription } from '$lib/index.js';
	import { page } from '$app/stores';
	import { redirect } from '@sveltejs/kit';
	import { browser } from '$app/environment';

	// console.log(supabase.auth.getUser());

	async function getUser() {
		console.log('Getting USer[');
		try {
			return await supabase.auth.getUser();
		} catch (error) {
			console.log('error');
			return false;
		}
	}
	getUser().then(({ user_, error }) => {
		console.log(user_);
	});

	supabase.auth.onAuthStateChange((_, session) => {
		user.set(session?.user);
		if ($page.route.id == '/dashboard') {
			console.log('to the dashboard');
			if ($user) {
				dashboardLoading.set(false);
				console.log($user);
			} else {
				if (browser) {
					// to prevent error window is not defined, because it's SSR
					window.location.href = '/signin';
				}
			}
		} else if ($page.route.id == '/signin') {
			console.log('to the dashboard');
			if (!$user) {
				// dashboardLoading.set(false);
				console.log('Log In');
			} else {
				if (browser) {
					// to prevent error window is not defined, because it's SSR
					window.location.href = '/dashboard';
				}
			}
		}
	});

	// onMount(() => {});
</script>

<svelte:head>
	<!-- HTML Meta Tags -->

	<meta name="description" content={$SnippetsDescription.des} />

	<!-- Facebook Meta Tags -->
	<meta property="og:url" content={$SnippetsDescription.url} />
	<meta property="og:type" content="website" />
	<meta property="og:description" content={$SnippetsDescription.des} />
	<meta property="og:image" content={$SnippetsDescription.imageUrl} />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content="snippets" />
	<meta property="twitter:url" content={$SnippetsDescription.url} />
	<meta name="twitter:description" content={$SnippetsDescription.des} />
	<meta name="twitter:image" content={$SnippetsDescription.imageUrl} />
</svelte:head>
<main>
	<slot />
</main>
