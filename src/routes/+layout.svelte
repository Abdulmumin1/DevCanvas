<script>
	import '../tailwind.css';
	import '../app.css';
	import { supabase } from '$lib/supabase.js';
	import { onMount } from 'svelte';
	import { user, dashboardLoading } from '$lib/index.js';
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
		}
	});

	// onMount(() => {});
</script>

<main>
	<slot />
</main>
