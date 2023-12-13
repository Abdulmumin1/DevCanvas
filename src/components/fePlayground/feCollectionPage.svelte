<script>
	import { fade } from 'svelte/transition';
	import FeCard from './feCard.svelte';
	import { pageCountPl } from '$lib/index.js';
	import { faSpinner } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { onDestroy, onMount } from 'svelte';

	import { getProfile, getViews } from '$lib/utils';
	export let supabase;
	export let collection;
	export let dashboard = false;
	export let user_id = false;
	export let query = false;

	let loading = false;
	async function fetchExplore(pageNumber, pageSize) {
		const { data, error } = await supabase
			.from('htmlPlayground')
			.select('project_key, user_id, description, view (views)')
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
			.from('htmlPlayground')
			.select('project_key, user_id, description, view (views)')
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
			.select('project_key, user_id, description, view (views)')
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
			.from('htmlPlayground')
			.select('project_key, user_id, description, view (views)')
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

	async function more() {
		console.log($pageCountPl);
		let result = await fetchPaginatedRows($pageCountPl, $pageCountPl + 6 - 1);

		if (result.length == 0) {
			showMore = false;
			console.log('no more');
			return;
		}
		console.log(result.length);
		if (result.length < 6) {
			showMore = false;
		}
		let result_with_profile_data = await returnDataWithProfile(result, supabase);
		collection = [...collection, ...result_with_profile_data];

		pageCountPl.update((cur) => {
			return cur + 6;
		});

		// window.location.href = '#more';

		loading = false;
	}
	async function returnDataWithProfile(collection, supabase) {
		// console.log('jlfdajkfda fda fda fda ');
		const newData = [];

		for (const element of collection) {
			// const views = await getViews(element.project_key, supabase);
			try {
				const user_name = await getProfile(element.user_id, supabase);
				// Assuming getProfile returns an object with a 'user_name' property
				if (new Object(user_name).length > 0) {
					newData.push({ ...element, profile: user_name[0].username });
				} else {
					newData.push({ ...element });
				}
			} catch (error) {
				newData.push({ ...element });
				console.error(`Error fetching profile for user_id ${element.user_id}: ${error.message}`);
			}
			// console.log(views);
			// newData.push({...element, views:views[0].views})
		}

		return newData;
	}

	$: showMore = collection.length > 5;

	onMount(async () => {
		collection = await returnDataWithProfile(collection, supabase);
	});

	onDestroy(() => {
		pageCountPl.set(6);
	});
</script>

{#if collection.length > 0}
	<div class="flex flex-col gap-6 items-center" transition:fade>
		<div class="gap-6 flex flex-col w-full">
			<div class="customGrid gap-6 rounded-lg w-full">
				{#each collection as snippet (snippet.project_key)}
					<FeCard details={snippet} />
				{/each}
			</div>
		</div>
		{#if showMore}
			<button
				class="active:scale-75 transition-transform duration-300 bg-gray-300 dark:bg-secondary-dark shadow rounded-lg py-2 px-4 flex justify-center items-center gap-2 w-fit"
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
	<div class="flex justify-center pt-12 h-full w-full">
		<p class="text-gray-400 text-6xl">Nothing to Show</p>
	</div>
{/if}

<style>
	.customGrid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
	}
</style>
