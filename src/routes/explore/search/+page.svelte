<script>
	import { pageCountSnips, pageCountPl } from '$lib/index.js';

	import NavWrapper from '$components/snips/navWrapper.svelte';
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import FeCollectionPage from '$components/fePlayground/feCollectionPage.svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import FeCollectionDummy from '$components/feCollectionDummy.svelte';

	export let data;
	let supabase = data.supabase;

	let query = $page.url.searchParams.get('query');
	let f = $page.url.searchParams.get('f');

	async function loadPlaygroundData() {
		if (f == 't' || filter == 'tags') {
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

			return dt;
		} else if (f == 'd' || filter == 'desc') {
			let { data: dt, error } = await supabase
				.from('htmlPlayground')
				.select('project_key, user_id, description, view (views)')
				// .or('tags.@>.{' + query + '}');

				// .filter('tags', 'cs', '{"css","html"}')
				// .contains('tags', ['css', 'html'])
				// .or(`description:ilike.${query}`)
				// .or(`tags.cs.{"${query}"}`)
				.ilike('description', `%${query}%`)
				// Use `()` for `in` filter, `{}` for array values and `cs` for `contains()`.

				// .cd('tags', [query])
				// .contains('tags', [query])
				.order('created_at', { ascending: false })
				.is('public', true)
				.limit($pageCountPl);
			if (error) {
				// console.error(error);
				return;
			}

			return dt;
		}
	}

	let filter = 'desc';

	function changeFilter(fil) {
		filter = fil;
	}

	$: {
		if (browser) {
			if (filter == 'tags') {
				goto(`/explore/search?query=${query}&f=t`);
			} else {
				goto(`/explore/search?query=${query}&f=d`);
			}
		}
	}
</script>

<svelte:head>
	<meta name="robots" content="index, follow" />
</svelte:head>

<NavWrapper>
	<div
		class="sticky top-[0px] z-50 flex flex-wrap items-center gap-2 border-b bg-white py-2 pt-2 dark:border-secondary-dark dark:bg-primary"
	>
		Filters:
		<button
			class="bg-sky-light {filter == 'tags'
				? 'bg-stone-600 text-light dark:bg-gray-300 dark:text-black'
				: 'dark:bg-secondary-dark '} rounded-md p-1 px-2"
			class:bg-gray-400={filter == 'tags'}
			on:click={() => changeFilter('tags')}>Tags</button
		>
		<button
			class="bg-sky-light {filter == 'desc'
				? 'bg-stone-600 text-light dark:bg-gray-300 dark:text-black'
				: 'dark:bg-secondary-dark '} rounded-md p-1 px-2"
			class:bg-gray-400={filter == 'desc'}
			on:click={() => changeFilter('desc')}>Description</button
		>
	</div>

	<div class="my-12"></div>

	{#key filter}
		{#await loadPlaygroundData()}
			<FeCollectionDummy />
		{:then userSnippets}
			<!-- <Sm -->
			<!-- Create New Code Snippet button -->

			<!-- Code Snippet Cards -->
			<div transition:fade class=" h-full">
				<FeCollectionPage collection={userSnippets} supabase={data.supabase} {query} />
			</div>
		{/await}
	{/key}
</NavWrapper>
