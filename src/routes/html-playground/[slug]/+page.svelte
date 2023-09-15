<script>
	import { current_data, user, isOwner, SnippetsDescription, showToast } from '$lib/index.js';
	import { showSave } from '$lib/feEditor/store.js';
	import { onMount } from 'svelte';
	import Toast from '../../../components/toast.svelte';
	import { browser } from '$app/environment';
	import FeCodeEditor from '../../../components/fePlayground/feCodeEditor.svelte';
	import FePlayGroungNav from '../../../components/fePlayground/fePlayGroungNav.svelte';
	import CodeOutput from '../../../components/fePlayground/codeOutput.svelte';
	import Resizable from '../../../components/fePlayground/resizable.svelte';

	export let data;

	// console.log(user)

	let mobileDetails;
	if (browser) {
		mobileDetails = window.innerWidth <= 768;
	}
	current_data.set(data['0']);

	onMount(() => {
		// getUser()
		showSave.set(false);
		setTimeout(() => {
			if ($user) {
				if ($user.id == $current_data.user_id && $current_data.user_id != null) {
					isOwner.set(true);
					console.log('it is set to true');
				} else {
					isOwner.set(false);
				}
			}
		}, 1000);
	});
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

<FePlayGroungNav title={data[0].description} />
<article class="min-h-screen h-screen flex flex-col">
	{#if data.isFound}
		<div class="relative flex h-full flex-col lg:flex-row">
			<Resizable>
				<div slot="left" class="w-full h-full">
					<FeCodeEditor initialHTML={data['0'].html} initialCSS={data['0'].css} lang="html" />
				</div>
				<div slot="right" class="w-full h-full">
					<CodeOutput />
				</div>
			</Resizable>
			<!-- <div class="w-full h-full"> -->
			<!-- </div> -->
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
