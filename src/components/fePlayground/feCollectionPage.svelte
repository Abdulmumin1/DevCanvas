<script>
	import { fade } from 'svelte/transition';
	import FeCard from './feCard.svelte';
	import { pageCountPl } from '$lib/index.js';
	import { faSpinner } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { onMount } from 'svelte';

	import { getProfile } from '$lib/utils';
	export let supabase;
	export let session;
	export let collection;
	export let dashboard = false;

	let loading = false;
	async function fetchExplore(pageNumber, pageSize) {
		const { data, error } = await supabase
			.from('htmlPlayground')
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
			.from('htmlPlayground')
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
		}

		return newData;
	}

	onMount(async () => {
		collection = await returnDataWithProfile(collection, supabase);
	});
</script>

<div class="flex flex-col gap-6 items-center" transition:fade>
	<div class="gap-6 flex flex-col w-full">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 rounded-lg w-full">
			{#each collection as snippet}
				<!-- <div class="bg-white rounded-lg p-4 shadow-md">
					<h3 class="text-xl font-semibold mb-2">{snippet.lang}</h3>
					<code class="block bg-gray-100 p-2 rounded-lg shadow-inner">{snippet.code}</code>
					Add any additional information or actions here
				</div> -->
				<FeCard details={snippet} />
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
