<script>
	import { fade } from 'svelte/transition';
	import FeCard from './feCard.svelte';
	import { faForward, faSpinner } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { onMount } from 'svelte';

	export let supabase;
	export let collection;
	export let dashboard = false;
	export let user_id = false;
	export let query = false;

	let loading = false;
	let showMore = false;

	async function fetchExplore(start, end) {
		const { data, error } = await supabase
			.from('htmlPlayground')
			.select('project_key, user_id, description, view (views), profiles (username)')
			.order('created_at', { ascending: false })
			.range(start, end)
			.is('public', true);

		if (error) {
			console.error('Error fetching data:', error.message);
			return [];
		}
		return data;
	}

	async function fetchDashboard(start, end) {
		const { data, error } = await supabase
			.from('htmlPlayground')
			.select('project_key, user_id, description, view (views), profiles (username)')
			.eq('user_id', user_id)
			.order('created_at', { ascending: false })
			.range(start, end);

		if (error) {
			console.error('Error fetching data:', error.message);
			return [];
		}
		return data;
	}

	async function fetchUserCollection(start, end) {
		const { data, error } = await supabase
			.from('htmlPlayground')
			.select('project_key, user_id, description, view (views), profiles (username)')
			.eq('user_id', user_id)
			.order('created_at', { ascending: false })
			.range(start, end)
			.is('public', true);

		if (error) {
			console.error('Error fetching data:', error.message);
			return [];
		}
		return data;
	}

	async function fetchSearchRows(start, end) {
		const { data, error } = await supabase
			.from('htmlPlayground')
			.select('project_key, user_id, description, view (views), profiles (username)')
			.or(`tags.cs.{"${query}"}`)
			.order('created_at', { ascending: false })
			.range(start, end)
			.is('public', true);

		if (error) {
			console.error('Error fetching data:', error.message);
			return [];
		}
		return data;
	}

	async function fetchPaginatedRows(start, end) {
		loading = true;
		let result;
		if (dashboard) {
			result = await fetchDashboard(start, end);
		} else if (user_id) {
			result = await fetchUserCollection(start, end);
		} else if (query) {
			result = await fetchSearchRows(start, end);
		} else {
			result = await fetchExplore(start, end);
		}
		loading = false;
		return result || [];
	}

	async function more() {
		const start = collection.length;
		const end = start + 23; // Fetch next 24 items (inclusive range)
		const result = await fetchPaginatedRows(start, end);

		if (result.length > 0) {
			collection = [...collection, ...result];
			showMore = result.length === 24;
		} else {
			showMore = false;
		}
	}

	onMount(() => {
		// Show "Load More" if initial collection is a multiple of 24 (indicating possible more data)
		// console.log(collection.length)
		showMore = collection.length > 0 && collection.length % 24 === 0;
	});
</script>

{#if collection.length > 0}
	<section class="flex flex-col items-center gap-6" transition:fade>
		<div class="flex w-full flex-col gap-6">
			<div class="customGrid w-full gap-6 rounded-lg">
				{#each collection as snippet (crypto.randomUUID())}
					<article>
						<FeCard details={snippet} />
					</article>
				{/each}
			</div>
		</div>
		{#if showMore}
			<nav aria-label="Pagination">
				<button
					class="flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold  transition-all duration-300 hover:bg-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 active:scale-95 dark:bg-secondary-dark dark:text-gray-200"
					on:click={more}
					disabled={loading}
					aria-label="Load more content"
				>
					{#if loading}
						<Fa icon={faSpinner} class="animate-spin" />
					{/if}
					Load More
					<Fa icon={faForward} />
				</button>
			</nav>
		{/if}
	</section>
{:else}
	<div class="flex h-[100dvh] w-full flex-col items-center justify-center pt-12">
		<img src="/logo.svg" alt="Logo" width="300" style="filter: grayscale(100);" loading="lazy" />
		<p class="text-4xl text-gray-400">Nothing to Show</p>
	</div>
{/if}

<style>
	.customGrid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	}
</style>