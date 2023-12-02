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
			.eq('user_id', data.user_id)
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
			.eq('user_id', data.user_id)
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

<div class=" w-full">
	<!-- Code Snippet Cards -->
	<div class="bg-sky-100 dark:bg-secondary-dark pt-2 px-1 rounded-md my-4">
		<div class="w-full flex gap-2 text-primary dark:text-white text-xl md:text-2xl">
			<button
				class="p-1 rounded-t-md px-3"
				on:click={toogle}
				class:bg-white={!showOther}
				class:dark:bg-primary={!showOther}>Plays</button
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
		{#key showOther}
			<div in:fade class:hidden={showOther} class="hidden h-full">
				<FeCollectionPage
					user_id={data.user_id}
					collection={userSnippets}
					supabase={data.supabase}
					session={data.session}
				/>
			</div>
		{/key}

		{#await loadIntialData()}
			<!-- <p class="flex items-center justify-center gap-2 text-xl h-[50vh]">
						Loading ...
						<Fa icon={faSpinner} class="animate-spin text-xl" />
					</p> -->
			<CollectionDummy />
		{:then userSnippets}
			{#key showOther}
				<div in:fade class:hidden={!showOther} class="hidden h-full">
					<CollectionPage
						rawcollection={userSnippets}
						supabase={data.supabase}
						session={data.session}
						showMore={userSnippets.length > 6}
						user_id={data.user_id}
					/>
				</div>
			{/key}

			<!-- <FeCollectionPage -->
		{/await}
	{/await}
</div>
