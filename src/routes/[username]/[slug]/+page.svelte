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

<article class="h-screen flex flex-col">
	{#if data.isFound}
		<Nav />
		<div class="h-full overflow-scroll p-4 dark:bg-black">
			<!-- <Fa icon={faPen} /> -->
			<div class="text-sm md:text-sm w-full items-center h-full flex justify-center flex-col">
				<div class="flex flex-col items-center justify-center mb-2">
					<h1 class="text-xl text-center">{data[0].description}</h1>
					<p>Shared by: <a href="/{username}">{username}</a></p>
				</div>
				<div
					class="relative text-[11px] md:text-base w-full md:w-[90%] bg-orange-100 p-4 rounded-lg dark:bg-[#0d1117] overflow-scroll h-full"
				>
					<div
						class="absolute top-2 right-2 text-base md:text-xl flex items-center justify-center z-50"
					>
						<p class="text-sm bg-orange-100 dark:bg-primary p-2 rounded">python</p>
						<button class="p-2" on:click={CopyAction}><Fa icon={iconCopy} /></button>
					</div>
					<HighlightAuto code={data[0].code} let:highlighted>
						<LineNumbers {highlighted} hideBorder />
					</HighlightAuto>
				</div>
			</div>
		</div>
	{:else}
		<div class=" h-screen flex items-center justify-center flex-col">
			<h1 class="text-4xl md:text-5xl font-bold">404</h1>
			<p>Not found</p>
			<a class="bg-sky-300 rounded-md p-1" href="/dashboard">Home</a>
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
