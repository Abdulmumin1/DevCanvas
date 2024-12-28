<script>
	import { fade } from 'svelte/transition';
	import FeCard from './feCard.svelte';
	import { pageCountPl } from '$lib/index.js';
	import { faForward, faForwardFast, faRandom, faSpinner } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { onDestroy, onMount } from 'svelte';

	export let supabase;
	export let collection;
	export let dashboard = false;
	export let user_id = false;
	export let query = false;

	let loading = false;
	async function fetchExplore(pageNumber, pageSize) {
		const { data, error } = await supabase
			.from('htmlPlayground')
			.select('project_key, user_id, description, view (views), profiles (username)')
			.order('created_at', { ascending: false }) // Optional: Ordering the results
			.range(pageNumber, pageSize)
			.is('public', true);

		if (error) {
			console.error('Error fetching data:', error.message);
			return;
		}
		return data;
	}

	async function fetchDashboard(pageNumber, pageSize) {
		const { data, error } = await supabase
			.from('htmlPlayground')
			.select('project_key, user_id, description, view (views), profiles (username)')
			.eq('user_id', session.user.id)
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
			.from('htmlPlayground')
			.select('project_key, user_id, description, view (views), profiles (username)')
			.eq('user_id', user_id)
			.order('created_at', { ascending: false }) // Optional: Ordering the results
			.range(pageNumber, pageSize)
			.is('public', true);

		if (error) {
			console.error('Error fetching data:', error.message);
			return;
		}
		return data;
	}

	async function fetchSearchRows(pageNumber, pageSize) {
		const { data, error } = await supabase
			.from('htmlPlayground')
			.select('project_key, user_id, description, view (views), profiles (username)')
			// .ilike('description', `%${query}%`)
			.or(`tags.cs.{"${query}"}`)
			.order('created_at', { ascending: false }) // Optional: Ordering the results
			.range(pageNumber, pageSize)
			.is('public', true);

		if (error) {
			console.error('Error fetching data:', error.message);
			return;
		}
		return data;
	}
	async function fetchPaginatedRows(pageNumber, pageSize) {
		loading = true;
		// const off = (pageNumber - 1) * pageSize;
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
	async function more() {
		console.log('current page count', $pageCountPl);
		let result = await fetchPaginatedRows($pageCountPl, $pageCountPl + 24 - 1);

		if (result.length == 0) {
			showMore = false;
			console.log('no more');
			return;
		} else if (result.length < 24) {
			showMore = false;
			console.log('is less than 24');
		}

		console.log('I got through using->', result.length);
		// let result_with_profile_data = await returnDataWithProfile(result, supabase);
		collection = [...collection, ...result];

		pageCountPl.update((cur) => {
			return cur + 24;
		});
		loading = false;
	}

	$: showMore = collection.length > 5;

	onMount(async () => {
		if (collection.length < 24) {
			showMore = false;
		}
	});

	onDestroy(() => {
		pageCountPl.set(24);
	});
</script>

{#if collection.length > 0}
	<div class="flex flex-col items-center gap-6" transition:fade>
		<div class="flex w-full flex-col gap-6">
			<div class="customGrid w-full gap-6 rounded-lg">
				{#each collection as snippet (crypto.randomUUID())}
					<FeCard details={snippet} />
				{/each}
			</div>
		</div>
		{#if showMore}
			{#if showMore}
				<button
					class="flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-sky-500 shadow-md transition-all duration-300 hover:bg-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 active:scale-95 dark:bg-secondary-dark dark:text-gray-200"
					on:click={more}
					disabled={loading}
				>
					{#if loading}
						<Fa icon={faSpinner} class="animate-spin" />
					{/if}
					Load More
					<Fa icon={faForward} />
				</button>
			{/if}
		{/if}
	</div>
{:else}
	<div class="flex h-[100dvh] w-full flex-col items-center justify-center pt-12">
		<img src="/logo.svg" alt="" width="300" style="filter: grayscale(100);" />
		<p class="text-4xl text-gray-400">Nothing to Show</p>
	</div>
{/if}

<style>
	.customGrid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
	}
</style>
