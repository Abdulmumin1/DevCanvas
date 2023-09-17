<script>
	import Nav from '../../../components/nav.svelte';
	import CodeText from '../../../components/codeText.svelte';
	import { current_data, user, previewMode, SnippetsDescription, showToast } from '$lib/index.js';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import DetailsGrid from '../../../components/DetailsGrid.svelte';

	previewMode.set(true);

	export let data;

	// function handleContentChange(event) {
	// 	current_data.update((cur) => {
	// 		return { ...cur, code: event.detail };
	// 	});
	// 	console.log($current_data);
	// 	console.log(event.detail);
	// }

	// Subscribe to the content store to update the input when necessary

	// console.log(user)
	onMount(() => {
		current_data.set(data['0']);
		// getUser()
	});

	// afterUpdate(() => {
	// 	// This will handle the redirection if the user logs out on another page
	// 	if (!$user) {
	// 		window.location.href = '/sigin'; // Replace '/login' with your desired login page URL
	// 	}
	// });

	let mobileDetails;
	if (browser) {
		mobileDetails = window.innerWidth <= 768;
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
</svelte:head>

<article class="min-h-screen h-screen flex flex-col gap-2">
	{#if data.isFound}
		<Nav />
		<div class="relative flex h-full flex-col lg:flex-row p-0 md:p-1">
			<div class="w-full h-full">
				<CodeText inputContent={data['0'].code} lang={data['0'].lang} />
			</div>
			<DetailsGrid details={data['0']} />
		</div>
	{:else}
		<div class=" h-screen flex items-center justify-center flex-col">
			<h1 class="text-4xl md:text-5xl font-bold">404</h1>
			<p>Not found</p>
			<a class="bg-sky-300 rounded-md p-1" href="/dashboard">Home</a>
		</div>
	{/if}
</article>
