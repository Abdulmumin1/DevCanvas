<script>
	import { HighlightAuto, LineNumbers } from 'svelte-highlight';
	import Nav from '../../../components/nav.svelte';
	import { darkModeState, copyTextToClipboard, showToast } from '$lib/index.js';
	// import { d } from 'svelte-highlight/languages/index.js';
	import { github, githubDark, atomOneDark } from 'svelte-highlight/styles';
	import Fa from 'svelte-fa';
	import { faCheck, faCopy, faPen } from '@fortawesome/free-solid-svg-icons';
	import { setContext } from 'svelte';

	export let data;
	setContext('isOwner', false);
	if (data.isFound && data.session) {
		setContext('isOwner', data.session.user.id == data[0].user_id);
		console.log(data.session.user.id == data[0].user_id);
	}

	let username = data.username.length > 0 ? data.username[0].username : 'unknown user';
	// console.log(data.username.length);

	let copied = false;
	$: iconCopy = copied ? faCheck : faCopy;

	function CopyAction() {
		copied = true;
		copyTextToClipboard(data[0].code);
		setTimeout(() => {
			copied = false;
		}, 1000);
		showToast.set({ message: 'Code copied to clipboard' });
	}
</script>

<svelte:head>
	{#if data.isFound}
		<title>{data['0'].description}</title>

		<!-- Facebook Meta Tags -->
		<meta property="og:title" content={data['0'].description} />

		<!-- Twitter Meta Tags -->
		<meta name="twitter:title" content={data['0'].description} />
	{/if}
	<!-- HTML Meta Tags -->

	{#if $darkModeState}
		{@html githubDark}
	{:else}
		{@html github}
	{/if}
</svelte:head>

<article class="flex h-screen flex-col">
	{#if data.isFound}
		<header class="w-full">
			<Nav />
		</header>
		<div class="h-full overflow-scroll p-4 dark:bg-black">
			<!-- <Fa icon={faPen} /> -->
			<div class="flex h-full w-full flex-col items-center justify-center text-sm md:text-sm">
				<div class="mb-2 flex flex-col items-center justify-center">
					<h1 class="text-center text-xl">{data[0].description}</h1>
					<p>Shared by: <a href="/{username}">{username}</a></p>
				</div>
				<div
					class="relative h-full w-full overflow-scroll rounded-lg bg-orange-100 p-4 text-[11px] dark:bg-[#0d1117] md:w-[90%] md:text-base"
				>
					<div
						class="sticky right-0 top-0 z-50 flex items-center justify-center text-base md:text-xl"
					>
						<p class="rounded bg-orange-100 p-2 text-sm dark:bg-primary">{data[0].lang}</p>
						<button class="p-2" on:click={CopyAction}><Fa icon={iconCopy} /></button>
					</div>
					<HighlightAuto code={data[0].code} let:highlighted>
						<LineNumbers {highlighted} hideBorder />
					</HighlightAuto>
				</div>
			</div>
		</div>
	{:else}
		<div class=" flex h-screen flex-col items-center justify-center">
			<h1 class="text-4xl font-bold md:text-5xl">404</h1>
			<p>Not found</p>
			<a class="rounded-md bg-sky-300 p-1" href="/dashboard">Home</a>
		</div>
	{/if}
</article>

<style>
	/* Hide the vertical scrollbar */
	::-webkit-scrollbar {
		width: 0;
	}

	/* Hide the horizontal scrollbar */
	::-webkit-scrollbar {
		height: 0;
	}
</style>
