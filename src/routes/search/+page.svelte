<script>
	import { pageCountSnips, pageCountPl } from '$lib/index.js';

	import NavWrapper from '../../components/snips/navWrapper.svelte';
	import { page } from '$app/stores';
	import CollectionDummy from '../../components/collectionDummy.svelte';
	import { fade } from 'svelte/transition';
	import FeCollectionPage from '../../components/fePlayground/feCollectionPage.svelte';
	import CollectionPage from '../../components/collectionPage.svelte';
	export let data;
	let supabase = data.supabase;

	let query = $page.url.searchParams.get('query');
	console.log(query);
	async function loadIntialData() {
		let { data: dt, error } = await supabase
			.from('snips')
			.select('*')
			.ilike('description', `%${query}%`)
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
			.select('project_key, user_id, description, view (views)')
			// .or('tags.@>.{' + query + '}');

			// .filter('tags', 'cs', '{"css","html"}')
			// .contains('tags', ['css', 'html'])
			// .or(`description:ilike.${query}`)
			.or(`tags.cs.{"${query}"}`)
			// .ilike('description', `%${query}%`)
			// Use `()` for `in` filter, `{}` for array values and `cs` for `contains()`.

			// .cd('tags', [query])
			// .contains('tags', [query])
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
		console.log(dt);
		return dt;
	}

	let showOther = false;
	function toogle() {
		showOther = !showOther;
	}
</script>

<svelte:head>
	<meta name="robots" content="index, follow" />
</svelte:head>

<NavWrapper>
	<!-- Code Snippet Cards -->
	<div class="bg-sky-100 dark:bg-secondary-dark pt-2 px-1 rounded-md my-4">
		<div class="w-full flex gap-2 text-primary dark:text-white">
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
	</div>
	{#await loadPlaygroundData()}
		<CollectionDummy />
	{:then userSnippets}
		<!-- <Sm -->
		<!-- Create New Code Snippet button -->

		<!-- Code Snippet Cards -->
		<div transition:fade class:hidden={showOther} class="hidden h-full">
			<FeCollectionPage collection={userSnippets} supabase={data.supabase} {query} />
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
					{query}
				/>
			</div>

			<!-- <FeCollectionPage -->
		{/await}
	{/await}
</NavWrapper>
