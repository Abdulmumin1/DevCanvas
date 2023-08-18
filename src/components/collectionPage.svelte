<script>
	import Fa from 'svelte-fa';
	import RecentCard from './recentCard.svelte';
	import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
	import { supabase } from '$lib/supabase.js';
	import { browser } from '$app/environment';
	import { pageCount } from '$lib/index.js';

	let loading = false;
	async function fetchPaginatedRows(pageNumber, pageSize) {
		let loading = true;
		const off = (pageNumber - 1) * pageSize;
		const { data, error } = await supabase
			.from('snips')
			.select('*')
			.order('created_at', { ascending: false }) // Optional: Ordering the results
			.range(pageNumber, pageSize);

		if (error) {
			console.error('Error fetching data:', error.message);
			return;
		}
		return data;
	}

	let showMore = true;
	async function more() {
		console.log($pageCount);
		let result = await fetchPaginatedRows($pageCount, $pageCount + 6 - 1);
		console.log(result);
		if (result.length == 0) {
			showMore = false;
			console.log('no more');
			return;
		}
		let loading = false;
		collection = [...collection, ...result];
		pageCount.update((cur) => {
			return cur + 6;
		});
		if (browser) {
			window.location.href = '#more';
		}
	}
	export let rawcollection;
	let collection = rawcollection.data;
</script>

<div class="gap-6 flex flex-col">
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 rounded-lg">
		{#each collection as snippet}
			<!-- <div class="bg-white rounded-lg p-4 shadow-md">
                <h3 class="text-xl font-semibold mb-2">{snippet.lang}</h3>
                <code class="block bg-gray-100 p-2 rounded-lg shadow-inner">{snippet.code}</code>
                Add any additional information or actions here
            </div> -->
			<RecentCard card={snippet} />
		{/each}
	</div>
	{#if showMore}
		<button
			class="w-full p-2 flex justify-center items-center gap-2"
			id="more"
			on:click={more}
			class:animate-bounce={loading}>More <Fa icon={faAngleDoubleRight} /></button
		>
	{/if}
</div>
