<script>
	import { pageCountSnips, pageCountPl } from '$lib/stores/index.js';

	import CollectionPage from '$components/ui/collectionPage.svelte';
	import CollectionDummy from '$components/ui/collectionDummy.svelte';
	import FeCollectionPage from '$components/features/playground/feCollectionPage.svelte';
	import { fade } from 'svelte/transition';
	import FeCollectionDummy from '$components/ui/feCollectionDummy.svelte';

	export let data;

	let supabase = data.supabase;
	async function loadIntialData() {
		let { data: dt, error } = await supabase
			.from('snips')
			.select('*, profiles (username)')
			.eq('user_id', data.user_id)
			.order('created_at', { ascending: false })
			.limit($pageCountSnips);

		if (error) {
			console.error(error);
		}
		return dt;
	}

	async function loadPlaygroundData() {
		let { data: dt, error } = await supabase
			.from('htmlPlayground')
			.select('*, view (views), profiles (username)')
			.eq('user_id', data.user_id)
			.order('created_at', { ascending: false })
			.is('public', true)
			.limit($pageCountPl);

		if (error) {
			console.error(error);
			return;
		}

		return dt;
	}

	let showOther = false;
	function toogle() {
		showOther = !showOther;
	}
</script>

<div class=" w-full">
	<!-- Code Snippet Cards -->
	<div class="my-4 rounded-md bg-sky-light px-1 pt-2 dark:bg-secondary-dark">
		<div class="flex w-full gap-2 text-base text-primary dark:text-white">
			<button
				class="rounded-t-md p-1 px-3"
				on:click={toogle}
				class:bg-white={!showOther}
				class:dark:bg-primary={!showOther}>Canvas</button
			>
			<button
				class="rounded-t-md p-1 px-3"
				on:click={toogle}
				class:bg-white={showOther}
				class:dark:bg-primary={showOther}>Snippets</button
			>
		</div>
	</div>
	{#await loadPlaygroundData()}
		<FeCollectionDummy />
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
