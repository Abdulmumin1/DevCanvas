<script>
	import Fa from 'svelte-fa';
	import RecentCard from './recentCard.svelte';
	import { faAngleDoubleRight, faSpinner } from '@fortawesome/free-solid-svg-icons';
	// import { supabase } from '$lib/supabase.js';
	import { browser } from '$app/environment';
	import { pageCount } from '$lib/index.js';
	import { fade } from 'svelte/transition';

	export let supabase;
	export let session;
	export let rawcollection;
	export let dashboard = false;

	let collection = rawcollection;
	let loading = false;

	async function fetchExplore(pageNumber, pageSize) {
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

	async function fetchDashboard(pageNumber, pageSize) {
		const { data, error } = await supabase
			.from('snips')
			.select('*')
			.eq('user_id', session.user.id)
			.order('created_at', { ascending: false }) // Optional: Ordering the results
			.range(pageNumber, pageSize);

		if (error) {
			console.error('Error fetching data:', error.message);
			return;
		}
		return data;
	}
	async function fetchPaginatedRows(pageNumber, pageSize) {
		loading = true;
		const off = (pageNumber - 1) * pageSize;
		if (dashboard) {
			return fetchDashboard(pageNumber, pageSize);
		} else {
			return fetchExplore(pageNumber, pageSize);
		}
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
		console.log(result.length);
		if (result.length < 6) {
			showMore = false;
		}
		loading = false;
		collection = [...collection, ...result];
		pageCount.update((cur) => {
			return cur + 6;
		});
		if (browser) {
			window.location.href = '#more';
		}
	}
</script>

<div class="flex flex-col gap-6 items-center" transition:fade>
	<div class="gap-6 flex flex-col w-full bg-white dark:bg-secondary-dark rounded-lg shadow-md">
		<div class="grid gap-6 rounded-lg divide-y-2 dark:divide-primary w-full">
			{#each collection as snippet}
				<!-- <div class="bg-white rounded-lg p-4 shadow-md">
					<h3 class="text-xl font-semibold mb-2">{snippet.lang}</h3>
					<code class="block bg-gray-100 p-2 rounded-lg shadow-inner">{snippet.code}</code>
					Add any additional information or actions here
				</div> -->

				<RecentCard card={snippet} editIcons={dashboard} />
			{/each}
		</div>
	</div>
	{#if showMore}
		<button
			class="bg-gray-300 dark:bg-secondary-dark shadow rounded-lg py-2 px-4 flex justify-center items-center gap-2 w-fit"
			id="more"
			on:click={more}
		>
			<div class:animate-spin={loading} class:hidden={!loading}>
				<Fa icon={faSpinner} />
			</div>
			Load more...</button
		>
	{/if}
</div>
