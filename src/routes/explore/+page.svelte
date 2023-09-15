<script>
	import { afterUpdate, onMount } from 'svelte';
	import { generateRandomKey, user, previewMode, dashboardLoading, pageCount } from '$lib/index.js';

	import Search from '../../components/search.svelte';
	import CollectionPage from '../../components/collectionPage.svelte';
	import InnerNav from '../../components/innerNav.svelte';
	import Fa from 'svelte-fa';
	import { faSpinner } from '@fortawesome/free-solid-svg-icons';
	import CollectionDummy from '../../components/collectionDummy.svelte';
	import SnipsSideNav from '../../components/snips/snipsSideNav.svelte';
	import NavWrapper from '../../components/snips/navWrapper.svelte';
	// if (!$user) {
	// 	window.location.href = '/signin';
	// }
	export let data;
	let supabase = data.supabase;
	async function loadIntialData() {
		let { data: dt, error } = await supabase
			.from('snips')
			.select('*')
			.order('created_at', { ascending: false })
			.limit($pageCount);

		if (error) {
			console.error(error);
		}
		return dt;
	}
	// onMount(() => {
	// 	pageCount.set(6);
	// });

	// afterUpdate(() => {
	// 	// This will handle the redirection if the user logs out on  page
	// 	if (!$user) {
	// 		window.location.href = '/signin';
	// 	} else {
	// 		loading = false;
	// 	}
	// });
</script>

<!-- <div class="bg-secondary-dark min-h-[50vh]">
	<InnerNav />

	<div class="text-center mb-4 flex items-center justify-center flex-col gap-8 my-5">
		<Search />
		<div
			class="bg-sky-500 text-secondary-dark hover:bg-sky-600 py-3 px-3 md:px-6 rounded-lg shadow transition-all duration-300 mb-5"
		>
			<a href="/signin">New Snippet</a>
		</div>
	</div>
</div> -->
<div class="flex min-h-screen gap-2">
	<NavWrapper>
		<main class=" min-h-screen w-full flex">
			<div class="max-w-4xl w-full">
				<!-- Code Snippet Cards -->
				<div>
					<p class="text-xl md:text-2xl font-bold py-6">Collections</p>
				</div>

				{#await loadIntialData()}
					<!-- <p class="flex items-center justify-center gap-2 text-xl h-[50vh]">
						Loading ...
						<Fa icon={faSpinner} class="animate-spin text-xl" />
					</p> -->
					<CollectionDummy />
				{:then userSnippets}
					<CollectionPage
						rawcollection={userSnippets}
						supabase={data.supabase}
						session={data.session}
					/>
				{/await}
			</div>
		</main>
	</NavWrapper>
</div>
