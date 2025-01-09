<script>
	import Fa from 'svelte-fa';
	import RecentCard from './recentCard.svelte';
	import { faSpinner } from '@fortawesome/free-solid-svg-icons';
	import { pageCountSnips } from '$lib/index.js';
	import { fade } from 'svelte/transition';
	import { onDestroy, onMount } from 'svelte';
	import { getProfile } from '$lib/utils.js';

	export let supabase;
	export let session;
	export let rawcollection;
	export let dashboard = false;
	export let user_id = false;
	export let query = false;

	let collection = rawcollection;
	let loading = false;

	async function fetchExplore(pageNumber, pageSize) {
		const { data, error } = await supabase
			.from('snips')
			.select('*, profiles (username)')
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
			.select('*, profiles (username)')
			.eq('user_id', user_id)
			.order('created_at', { ascending: false }) // Optional: Ordering the results
			.range(pageNumber, pageSize);

		if (error) {
			console.error('Error fetching data:', error.message);
			return;
		}
		return data;
	}
	async function fetchUserCollection(pageNumber, pageSize) {
		const { data, error } = await supabase
			.from('snips')
			.select('*, profiles (username)')
			.eq('user_id', user_id)
			.order('created_at', { ascending: false }) // Optional: Ordering the results
			.range(pageNumber, pageSize);

		if (error) {
			console.error('Error fetching data:', error.message);
			return;
		}
		return data;
	}

	async function fetchSearchRows(pageNumber, pageSize) {
		const { data, error } = await supabase
			.from('snips')
			.select('*, profiles (username)')
			.ilike('description', `%${query}%`)
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
		} else if (user_id) {
			return fetchUserCollection(pageNumber, pageSize);
		} else if (query) {
			return fetchSearchRows(pageNumber, pageSize);
		} else {
			return fetchExplore(pageNumber, pageSize);
		}
	}

	let showMore = collection.length > 5;
	// console.log();
	async function more() {
		console.log($pageCountSnips);
		let result = await fetchPaginatedRows($pageCountSnips, $pageCountSnips + 6 - 1);
		// console.log(result);
		if (result.length == 0) {
			showMore = false;
			console.log('no more');
			return;
		}
		// console.log(result.length);
		if (result.length < 6) {
			showMore = false;
		}
		loading = false;
		let collection_attached_with_creatorname = await returnDataWithProfile(result, supabase);
		collection = [...collection, ...collection_attached_with_creatorname];
		pageCountSnips.update((cur) => {
			return cur + 6;
		});
	}

	async function returnDataWithProfile(arr, supabase) {
		// console.log('jlfdajkfda fda fda fda ');

		return arr;
	}

	onMount(async () => {
		// console.log('mounted', rawcollection.length);
		collection = await returnDataWithProfile(rawcollection, supabase);
		// console.log('fetched collections', collection.length);
	});

	onDestroy(() => {
		pageCountSnips.set(6);
	});
</script>

{#if collection.length > 0}
	<div class="flex w-full flex-col items-center gap-6" transition:fade>
		<div
			class="flex w-full flex-col gap-6
		"
		>
			<div class="grid w-full gap-6 rounded-lg">
				{#each collection as snippet}
					<RecentCard card={snippet} editIcons={dashboard} />
				{/each}
			</div>
		</div>
		{#if showMore}
			<button
				class="flex w-fit items-center justify-center gap-2 rounded-lg bg-gray-300 px-4 py-2 shadow transition-transform duration-300 active:scale-75 dark:bg-secondary-dark"
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
{:else}
	<div class="flex h-[100dvh] w-full flex-col items-center justify-center pt-12">
		<img src="/logo.svg" alt="" width="300" style="filter: grayscale(100);" />
		<p class="text-4xl text-gray-400">Nothing to Show</p>
	</div>
{/if}

<style>
	.cool {
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
			'Courier New', monospace;
	}
</style>
