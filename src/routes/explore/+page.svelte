<script>
	import { pageCountSnips, pageCountPl } from '$lib/index.js';

	import CollectionPage from '../../components/collectionPage.svelte';
	import CollectionDummy from '../../components/collectionDummy.svelte';
	import NavWrapper from '../../components/snips/navWrapper.svelte';
	import FeCollectionPage from '../../components/fePlayground/feCollectionPage.svelte';
	import { fade, slide } from 'svelte/transition';
	// if (!$user) {
	// 	window.location.href = '/signin';
	// }
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
			.select('*')
			.order('created_at', { ascending: false })
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
	<title>Explore</title>
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
<div class="flex min-h-screen gap-2">
	<NavWrapper>
		<main class=" min-h-screen w-full flex">
			<div class="max-w-4xl w-full">
				<!-- Code Snippet Cards -->
				<div class="w-full py-6 px-2 flex gap-2 text-primary dark:text-white text-xl md:text-3xl">
					<button
						class="border-sky-500"
						on:click={toogle}
						class:border-b-2={!showOther}
						class:text-sky-500={!showOther}>Playground</button
					>
					<button
						class="border-sky-500"
						on:click={toogle}
						class:border-b-2={showOther}
						class:text-sky-500={showOther}>Snippets</button
					>
				</div>
				{#await loadPlaygroundData()}
					<CollectionDummy />
				{:then userSnippets}
					<!-- <Sm -->
					<!-- Create New Code Snippet button -->

					<!-- Code Snippet Cards -->
					<div transition:fade class:hidden={showOther} class="hidden h-full">
						<FeCollectionPage
							collection={userSnippets}
							supabase={data.supabase}
							session={data.session}
						/>
					</div>

					{#await loadIntialData()}
						<!-- <p class="flex items-center justify-center gap-2 text-xl h-[50vh]">
						Loading ...
						<Fa icon={faSpinner} class="animate-spin text-xl" />
					</p> -->
						<CollectionDummy />
					{:then userSnippets}
						<div transition:fade class:hidden={!showOther} class="hidden h-full">
							<CollectionPage
								rawcollection={userSnippets}
								supabase={data.supabase}
								session={data.session}
								showMore={userSnippets.length > 6}
							/>
						</div>

						<!-- <FeCollectionPage -->
					{/await}
				{/await}
			</div>
		</main>
	</NavWrapper>
</div>
