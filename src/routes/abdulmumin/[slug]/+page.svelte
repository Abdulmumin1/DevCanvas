<script>
	import { HighlightAuto, LineNumbers } from 'svelte-highlight';
	import Nav from '../../../components/nav.svelte';
	import { darkModeState } from '$lib/index.js';
	// import { d } from 'svelte-highlight/languages/index.js';
	import { github, githubDark, atomOneDark } from 'svelte-highlight/styles';
	import Fa from 'svelte-fa';
	import { faPen } from '@fortawesome/free-solid-svg-icons';
	import { setContext } from 'svelte';

	export let data;
	setContext('isOwner', false);
	if (data.isFound && data.session) {
		setContext('isOwner', data.session.user.id == data[0].user_id);
		console.log(data.session.user.id == data[0].user_id);
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
			<div class="text-sm md:text-sm w-full items-center h-full flex justify-center">
				<div
					class="w-full md:w-[90%] bg-orange-100 p-4 rounded-lg dark:bg-[#0d1117] overflow-scroll h-full"
				>
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
