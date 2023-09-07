<script>
	import '../tailwind.css';
	import '../app.css';
	import { onMount } from 'svelte';
	import { user, darkModeState, SnippetsDescription } from '$lib/index.js';
	import { invalidateAll } from '$app/navigation';
	import PageTransition from './transition.svelte';
	import { browser } from '$app/environment';

	// console.log(supabase.auth.getUser());

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	if (browser) {
		darkModeState.set(localStorage.theme === 'dark');
	}
	$: ({
		if(browser) {
			if ($darkModeState) {
				document.documentElement.classList.add('dark');
				localStorage.setItem('theme', 'dark');
			} else {
				document.documentElement.classList.remove('dark');
				localStorage.setItem('theme', 'light');
			}

			// localStorage.setItem('theme', darkModeState ? 'light' : 'dark');
			console.log('saved mode', localStorage.theme);
		}
	});
	onMount(() => {
		// darkModeState.set(localStorage.theme === 'dark');
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			user.set(_session?.user);
			if (_session?.expires_at !== session?.expires_at) {
				invalidateAll('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
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
<main class="dark:bg-primary dark:text-light transition-colors duration-300">
	<PageTransition url={data.url}>
		<slot />
	</PageTransition>
</main>
