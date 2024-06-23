<script>
	import '../app.css';
	import { onMount, setContext } from 'svelte';
	import { KDialog, setKbarState } from 'kbar-svelte-mini';
	import { actions } from '$lib/kbar.js';
	import { goto } from '$app/navigation';
	import {
		user,
		showNavigating,
		showToast,
		darkModeState,
		SnippetsDescription,
		getProfile,
		setProfile
	} from '$lib/index.js';

	setKbarState();
	setProfile(null);

	import { invalidateAll } from '$app/navigation';
	import PageTransition from './transition.svelte';
	import { browser } from '$app/environment';
	import Toast from '../components/toast.svelte';

	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import PageLoadProgess from '../components/pageLoadProgess.svelte';
	import { page } from '$app/stores';
	import AcceptCookies from '../components/auth/acceptCookies.svelte';

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
		}
	});

	let profile = getProfile();

	async function loadprofile(session) {
		try {
			const { data: d, error: err } = await supabase
				.from('profiles')
				.select('*')
				.eq('user_id', session.user.id);
			if (err) throw err;
			$profile = d.length > 0 ? d[0] : false;
			// console.log('Profile', $profile);
		} catch (error) {}
	}

	let url;
	onMount(async () => {
		url = window.location.href.replace('www.', '');
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			user.set(_session?.user);
			if (_session?.user) {
				loadprofile(_session);
			}
			if (_session?.expires_at !== session?.expires_at) {
				invalidateAll('supabase:auth');
			}
		});
		return () => data.subscription.unsubscribe();
	});

	let a = actions(goto);
	$: kbarbg = $darkModeState ? '#191919' : 'white';
	$: kbarSecondary = $darkModeState ? '#e5e7eb' : 'black';
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
	<meta property="twitter:domain" content="devcanvas.art" />
	<meta property="twitter:url" content={$SnippetsDescription.url} />
	<meta name="twitter:description" content={$SnippetsDescription.des} />
	<meta name="twitter:image" content={$SnippetsDescription.imageUrl} />
	<meta
		name="keywords"
		content="css, html, css art, css animation, code snippet, javascript animations, animation with html/css,"
	/>

	<link rel="canonical" href={url} />
	<meta name="robots" content="index, follow" />
</svelte:head>

<!-- {#if && !(($page.url.pathname.endsWith('/preview') && $page.url.searchParams.get('preview') == 'preview') || $page.url.pathname.endsWith('/embed'))}
	{/if} -->

{#if !(($page.url.pathname.endsWith('/preview') && $page.url.searchParams.get('preview') == 'preview') || $page.url.pathname.endsWith('/embed'))}
	<AcceptCookies />

	<!-- {#if $showNavigating} -->
	<PageLoadProgess />
	<!-- {/if} -->
{/if}
<div class=" relative bg-white transition-colors duration-300 dark:bg-primary dark:text-white">
	<slot />
	{#if $showToast}
		<Toast message={$showToast.message} duration={$showToast?.duration ?? 2500} />
	{/if}
</div>

<KDialog
	actions={a}
	--bg={kbarbg}
	--kbar-primary={'rgb(56 189 248)'}
	--kbar-secondary={kbarSecondary}
	--shadow={'0px 0px 1px gray'}
/>
