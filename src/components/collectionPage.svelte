<script>
	import Fa from 'svelte-fa';
	import RecentCard from './recentCard.svelte';
	import { faSpinner } from '@fortawesome/free-solid-svg-icons';
	import { pageCountSnips } from '$lib/index.js';
	import { fade } from 'svelte/transition';
	import { HighlightAuto, LineNumbers } from 'svelte-highlight';
	import { githubDark } from 'svelte-highlight/styles';
	import { onDestroy, onMount } from 'svelte';
	import { codeToHtml } from 'shiki';
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
	async function fetchUserCollection(pageNumber, pageSize) {
		const { data, error } = await supabase
			.from('snips')
			.select('*')
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
			.select('*')
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
		const newData = [];

		for (const element of arr) {
			// console.log(element);
			try {
				const user_name = await getProfile(element.user_id, supabase);
				// Assuming getProfile returns an object with a 'user_name' property
				// console.log(user_name);
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
		console.log('mounted', rawcollection.length);
		collection = await returnDataWithProfile(rawcollection, supabase);
		console.log('fetched collections', collection.length);
	});

	onDestroy(() => {
		pageCountSnips.set(6);
	});
</script>

<svelte:head>
	{@html githubDark}
</svelte:head>
<!-- {#if $DarmodeState}
{#else}
<svelte:head>
	{@html github}
</svelte:head>
{/if} -->

{#if collection.length > 0}
	<div class="flex flex-col gap-6 items-center w-full" transition:fade>
		<div class="gap-6 flex flex-col w-full bg-white dark:bg-secondary-dark">
			<div class="grid gap-6 rounded-lg w-full">
				{#each collection as snippet}
					<div class="bg-white dark:bg-secondary-dark rounded-lg p-2 md:p-4 max-w-full">
						<h3 class="text-sm px-3 py-2 my-4 bg-[#0d1117] w-fit rounded-lg text-light cool">
							{snippet.lang}
						</h3>
					</div>

					<RecentCard card={snippet} editIcons={dashboard} />
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
	<div class="flex flex-col justify-center pt-12 h-[100dvh] w-full items-center">
		<img src="/logo.svg" alt="" width="300" style="filter: grayscale(100);" />
		<p class="text-gray-400 text-4xl">Nothing to Show</p>
	</div>
{/if}

<style>
	.cool {
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
			'Courier New', monospace;
	}
</style>
