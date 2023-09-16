<script>
	import Fa from 'svelte-fa';
	import RecentCard from './recentCard.svelte';
	import { faAngleDoubleRight, faSpinner } from '@fortawesome/free-solid-svg-icons';
	// import { supabase } from '$lib/supabase.js';
	import { browser } from '$app/environment';
	import { pageCount } from '$lib/index.js';
	import { fade } from 'svelte/transition';
	import { HighlightAuto, LineNumbers } from 'svelte-highlight';

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
	<div class="gap-6 flex flex-col w-full bg-white dark:bg-secondary-dark">
		<div class="grid gap-6 rounded-lg w-full">
			{#each collection as snippet}
				<div class="bg-white dark:bg-secondary-dark rounded-lg p-2 md:p-4">
					<h3
						class="text-sm md:text-lg px-3 py-1 my-4 bg-sky-100 w-fit rounded-lg dark:text-primary dark:bg-sky-300"
					>
						{snippet.lang}
					</h3>

					<div class="bg-gray-100 dark:bg-primary flex md:hidden p-2 rounded-lg">
						{snippet.code.slice(0, 200)}
					</div>
					<div class="bg-gray-100 dark:bg-primary w-full hidden md:flex">
						<HighlightAuto code={snippet.code.slice(0, 200)} let:highlighted>
							<LineNumbers {highlighted} hideBorder />
						</HighlightAuto>
					</div>
				</div>

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
