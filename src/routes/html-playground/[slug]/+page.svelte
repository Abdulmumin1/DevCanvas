<script>
	import { current_data, user, previewMode, SnippetsDescription, showToast } from '$lib/index.js';
	import { onMount } from 'svelte';
	import Toast from '../../../components/toast.svelte';
	import { browser } from '$app/environment';
	import FeCodeEditor from '../../../components/fePlayground/feCodeEditor.svelte';
	import FePlayGroungNav from '../../../components/fePlayground/fePlayGroungNav.svelte';
	import CodeOutput from '../../../components/fePlayground/codeOutput.svelte';

	previewMode.set(true);

	export let data;

	// console.log(user)
	// onMount(() => {
	// 	// getUser()
	// 	current_data.set(data['0']);
	// });

	let mobileDetails;
	if (browser) {
		mobileDetails = window.innerWidth <= 768;
	}
	current_data.set(data['0']);
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

<article class="min-h-screen h-screen flex flex-col">
	{#if data.isFound}
		<FePlayGroungNav />
		<div class="relative flex h-full flex-col lg:flex-row">
			<div class="w-full h-full">
				<FeCodeEditor initialCode={data['0'].html} lang="html" />
			</div>
			<div class="w-full h-full">
				<CodeOutput html={data['0'].html} />
			</div>
			{#if $showToast}
				<Toast message={$showToast.message} />
			{/if}
		</div>
	{:else}
		<div class=" h-screen flex items-center justify-center flex-col">
			<h1 class="text-4xl md:text-5xl font-bold">404</h1>
			<p>Not found</p>
			<a class="bg-sky-300 rounded-md p-1" href="/dashboard">Home</a>
		</div>
	{/if}
</article>
