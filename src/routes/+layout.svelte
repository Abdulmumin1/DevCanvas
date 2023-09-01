<script>
	import '../tailwind.css';
	import '../app.css';
	import { onMount } from 'svelte';
	import { user, dashboardLoading, SnippetsDescription } from '$lib/index.js';
	import { invalidateAll } from '$app/navigation';

	// console.log(supabase.auth.getUser());

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			user.set(_session?.user);
			if (_session?.expires_at !== session?.expires_at) {
				invalidateAll('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
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
