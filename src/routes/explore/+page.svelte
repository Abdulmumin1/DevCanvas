<script>
	import { afterUpdate, onMount } from 'svelte';
	import { generateRandomKey, user, previewMode, dashboardLoading, pageCount } from '$lib/index.js';

	import Search from '../../components/search.svelte';
	import CollectionPage from '../../components/collectionPage.svelte';
	import InnerNav from '../../components/innerNav.svelte';

	// if (!$user) {
	// 	window.location.href = '/signin';
	// }

	export let data;

	onMount(() => {
		// console.log($user);
		// if (!getUser()) {
		// 	console.log('failure');
		// }
		pageCount.set(6);
	});

	// afterUpdate(() => {
	// 	// This will handle the redirection if the user logs out on  page
	// 	if (!$user) {
	// 		window.location.href = '/signin';
	// 	} else {
	// 		loading = false;
	// 	}
	// });
</script>

<div
	class="flex items-center justify-center min-h-screen flex-col gap-2 p-4 px-7 md:px-4 bg-sky-50"
>
	<!-- Dashboard.svelte -->
	<InnerNav />
	<Search />
	<main class=" min-h-screen flex items-center justify-center">
		<div class="max-w-4xl mx-auto px-1 sm:px-6 lg:px-8 py-12">
			<!-- <Sm -->
			<!-- Create New Code Snippet button -->
			<div class="text-center mb-4 flex items-center justify-center flex-col">
				<div
					class="bg-sky-500 hover:bg-sky-600 cursor-pointer text-white py-3 px-6 rounded-lg shadow transition-all duration-300"
				>
					<a href="/signin">New Snippet</a>
				</div>
			</div>

			<!-- Code Snippet Cards -->
			<div>
				<p class="text-lg md:text-xl font-bold py-6">Collections</p>
			</div>
			<CollectionPage rawcollection={data} />
		</div>
	</main>
</div>
