<script>
	import { supabase } from '$lib/supabase.js';
	import { afterUpdate, onMount } from 'svelte';
	import { generateRandomKey, user, previewMode, dashboardLoading, pageCount } from '$lib/index.js';
	import Fa from 'svelte-fa';
	import { faAdd, faMoon, faSpinner, faSun } from '@fortawesome/free-solid-svg-icons';
	import { scale } from 'svelte/transition';
	import NewSnippet from '../../components/newSnippet.svelte';
	import Search from '../../components/search.svelte';
	import CollectionPage from '../../components/collectionPage.svelte';
	import InnerNav from '../../components/innerNav.svelte';

	// if (!$user) {
	// 	window.location.href = '/signin';
	// }
	$: loading = $dashboardLoading;
	const create_new = async (lang, description) => {
		console.log($user);
		let code = '// your code here';
		let key = generateRandomKey();
		let user_id = $user.id;
		const { data, error } = await supabase
			.from('snips')
			.insert([{ code, lang, project_key: key, user_id, description }]);
		// console.log(data);
		if (error) {
			console.error(error);
		} else {
			console.log(data);
			window.location.href = `/${key}`;
		}
	};

	function handleNew(event) {
		let lang, description;
		lang = event.detail.lang;
		description = event.detail.description
			? event.detail.description
			: `New ${selectedValue} project`;

		create_new(lang, description);
	}
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
	{#if !loading}
		<!-- Dashboard.svelte -->
		<InnerNav />
		<Search />
		<main class=" min-h-screen flex items-center justify-center">
			<div class="max-w-4xl mx-auto px-1 sm:px-6 lg:px-8 py-12">
				<!-- <Sm -->
				<!-- Create New Code Snippet button -->
				<div class="text-center mb-4 flex items-center justify-center flex-col">
					<p class="text-4xl md:text-5xl my-6">Snippets</p>
					<div
						class="bg-sky-500 hover:bg-sky-600 text-white py-3 px-3 md:px-6 rounded-lg shadow transition-all duration-300"
					>
						<NewSnippet on:newsnippet={handleNew} />
					</div>
				</div>

				<!-- Code Snippet Cards -->
				<div>
					<p class="text-lg md:text-xl font-bold py-6">Collections</p>
				</div>
				<CollectionPage rawcollection={data} />
			</div>
		</main>
	{:else}
		<Fa icon={faSpinner} class="animate-spin text-xl" />
	{/if}
</div>
