<script>
	import '../tailwind.css';
	import '../app.css';
	import { onMount, setContext } from 'svelte';
	import {
		user,
		showNavigating,
		showToast,
		darkModeState,
		SnippetsDescription
	} from '$lib/index.js';
	import { invalidateAll } from '$app/navigation';
	import PageTransition from './transition.svelte';
	import { browser } from '$app/environment';
	import Toast from '../components/toast.svelte';

	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import PageLoadProgess from '../components/pageLoadProgess.svelte';
	import { page } from '$app/stores';

	// console.log(supabase.auth.getUser());

	export let data;

	let { supabase, session, userInfo } = data;
	$: ({ supabase, session, userInfo } = data);

	if (browser) {
		darkModeState.set(
			localStorage.theme === 'dark' ||
				(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		);
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

	beforeNavigate(() => {
		console.log('Navigation started!');
		showNavigating.set(true);
	});

	afterNavigate(() => {
		showNavigating.set(false);
		console.log('Navigation ended!');
	});
	// setContext('userInfo', data.user_info);

	// console.log('jfdklafdka fd afodamfd afdjaofdmaf dafodafmdas');
	onMount(async () => {
		// user_info.set(await userInfo());
		// console.log(userInfo);
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
	<meta property="twitter:domain" content="devCanvas" />
	<meta property="twitter:url" content={$SnippetsDescription.url} />
	<meta name="twitter:description" content={$SnippetsDescription.des} />
	<meta name="twitter:image" content={$SnippetsDescription.imageUrl} />
	<meta
		name="keywords"
		content="css, html, css art, css animation, code snippet, javascript animations, animation with html/css,"
	/>
</svelte:head>

{#if $showNavigating && !($page.url.pathname.endsWith('/preview') || $page.url.pathname.endsWith('/embed'))}
	<PageLoadProgess />
{/if}
<div class=" bg-white dark:bg-primary dark:text-white transition-colors duration-300">
	<slot />
	{#if $showToast}
		<Toast message={$showToast.message} />
	{/if}
</div>
