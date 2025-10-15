<script>
	import { run } from 'svelte/legacy';

	import '../app.css';
	import { onMount, setContext } from 'svelte';
	import { KDialog, setKbarState } from 'kbar-svelte-mini';
	import { actions } from '$lib/utils/kbar.js';
	import { goto } from '$app/navigation';
	import {
		user,
		showNavigating,
		showToast,
		darkModeState,
		SnippetsDescription,
		getProfile,
		setProfile
	} from '$lib/stores/index.js';

	// setProfile(null);

	import { invalidateAll } from '$app/navigation';
	import PageTransition from './transition.svelte';
	import { browser } from '$app/environment';
	import Toast from '$components/ui/toast.svelte';

	import PageLoadProgess from '$components/ui/pageLoadProgess.svelte';
	import { page } from '$app/stores';
	import AcceptCookies from '../components/auth/acceptCookies.svelte';
	import Page from './(auth)/signin/+page.svelte';

	

	/**
	 * @typedef {Object} Props
	 * @property {any} data - console.log(supabase.auth.getUser());
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { data, children } = $props();

	let { supabase, session, user: userInfo } = $state(data);
	run(() => {
		({ supabase, session, user: userInfo } = data);
	});

	// let profile = getProfile();

	setKbarState();
	setProfile(userInfo);

	if (browser) {
		darkModeState.set(
			localStorage.theme === 'dark' ||
				(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		);
	}
	run(() => {
		({
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
	});

	let url = $state();
	onMount(async () => {
		url = window.location.href.replace('www.', '');
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.user) {
				if (window.name == 'authPopup') {
					window.close();
				}
			}
			user.set(_session?.user);
			if (_session?.expires_at !== session?.expires_at) {
				invalidateAll('supabase:auth');
			}
		});
		return () => data.subscription.unsubscribe();
	});

	let a = actions(goto);
	let kbarbg = $derived($darkModeState ? '#191919' : 'white');
	let kbarSecondary = $derived($darkModeState ? '#e5e7eb' : 'black');
</script>

<svelte:head>
	<!-- HTML Meta Tags -->

	<meta
		name="keywords"
		content="css, html, css art, css animation, code snippet, javascript animations, animation with html/css,"
	/>

	<link rel="canonical" href={url} />
</svelte:head>

<!-- {#if && !(($page.url.pathname.endsWith('/preview') && $page.url.searchParams.get('preview') == 'preview') || $page.url.pathname.endsWith('/embed'))}
	{/if} -->

{#if !(($page.url.pathname.endsWith('/preview') && $page.url.searchParams.get('preview') == 'preview') || $page.url.pathname.endsWith('/embed'))}
	<AcceptCookies />

	<PageLoadProgess />
{/if}
<div class=" relative bg-white transition-colors duration-300 dark:bg-primary dark:text-white">
	{@render children?.()}
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
