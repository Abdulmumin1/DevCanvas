<script>
	import { pageCountSnips, pageCountPl } from '$lib/index.js';
	import NavWrapper from '$components/snips/navWrapper.svelte';
	import FeCollectionPage from '$components/fePlayground/feCollectionPage.svelte';
	import { fade } from 'svelte/transition';
	import FeCollectionDummy from '$components/feCollectionDummy.svelte';
	import SEO from '$components/seoComp.svelte'

	export let data;
	let supabase = data.supabase;
	async function loadIntialData() {
		let { data: dt, error } = await supabase
			.from('snips')
			.select('*')
			.order('created_at', { ascending: false })
			.limit($pageCountSnips);

		if (error) {
			console.error(error);
		}
		return dt;
	}
	// onMount(() => {
	// 	pageCount.set(6);
	// });

	// afterUpdate(() => {
	// 	// This will handle the redirection if the user logs out on  page
	// 	if (!$user) {
	// 		window.location.href = '/signin';
	// 	} else {
	// 		loading = false;
	// 	}

	// });

	async function loadPlaygroundData() {
		let { data: dt, error } = await supabase
			.from('htmlPlayground')
			.select('*, view (views)')
			.order('created_at', { ascending: false })
			.is('public', true)
			.limit($pageCountPl);

		if (error) {
			console.error(error);
			return;
		}
		// pageCount.update((cur) => {
		// 	return cur + 6;
		// });
		return dt;
	}

	let showOther = false;
	function toogle() {
		showOther = !showOther;
	}
</script>

<svelte:head>
	<!-- <title>Explore</title>
	<meta
		property="og:description"
		content="Library of Awesome frontend creations for your inspiration!"
	/> -->
	<SEO title="Explore" description="Library of Awesome frontend creations for your inspiration!" url="https://devcanvas.art/explore" />
</svelte:head>


<!-- <div class="bg-secondary-dark min-h-[50vh]">
	<InnerNav />

	<div class="text-center mb-4 flex items-center justify-center flex-col gap-8 my-5">
		<Search />
		<div
			class="bg-sky-500 text-secondary-dark hover:bg-sky-600 py-3 px-3 md:px-6 rounded-lg shadow transition-all duration-300 mb-5"
		>
			<a href="/signin">New Snippet</a>
		</div>
	</div>
</div> -->
<!-- <div class="flex min-h-screen bg-sky-300 gap-2 w-full"> -->
<NavWrapper>
	<!-- <FilterTags /> -->
	<main class=" flex min-h-screen w-full py-3 md:py-6">
		<div class=" flex w-full flex-col gap-2">
			<!-- Code Snippet Cards -->
			<!-- <div class="bg-sky-100 dark:bg-secondary-dark pt-2 px-1 rounded-md mt-4">
				<div class="w-full flex gap-2 text-primary dark:text-white text-base">
					<button
						class="p-1 rounded-t-md px-3"
						on:click={toogle}
						class:bg-white={!showOther}
						class:dark:bg-primary={!showOther}>Canvas</button
					>
					<button
						class="p-1 rounded-t-md px-3"
						on:click={toogle}
						class:bg-white={showOther}
						class:dark:bg-primary={showOther}>Snippets</button
					>
				</div>
			</div> -->
			{#await loadPlaygroundData()}
				<FeCollectionDummy />
			{:then userSnippets}
				<!-- <Sm -->
				<!-- Create New Code Snippet button -->

				<!-- Code Snippet Cards -->
				{#key showOther}
					<div in:fade class:hidden={showOther} class="hidden h-full">
						<FeCollectionPage
							collection={userSnippets}
							supabase={data.supabase}
							session={data.session}
						/>
					</div>
				{/key}

				<!-- {#await loadIntialData()}
					
					<CollectionDummy />
				{:then userSnippets}
					{#key showOther}
						<div in:fade class:hidden={!showOther} class="hidden h-full">
							<CollectionPage
								rawcollection={userSnippets}
								supabase={data.supabase}
								session={data.session}
								showMore={userSnippets.length > 6}
							/>
						</div>
					{/key}

				{/await} -->
			{/await}
		</div>
	</main>
</NavWrapper>

<!-- </div> -->
<!-- 
<style>
	* {
		border: 1px solid red;
	}
</style> -->
