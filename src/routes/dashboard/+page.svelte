<script>
	import { afterUpdate, onMount } from 'svelte';
	import { generateRandomKey, user, previewMode, dashboardLoading, pageCount } from '$lib/index.js';
	import Fa from 'svelte-fa';
	import { faAdd, faMoon, faSpinner, faSun } from '@fortawesome/free-solid-svg-icons';
	import { scale } from 'svelte/transition';
	import NewSnippet from '../../components/newSnippet.svelte';
	import Search from '../../components/search.svelte';
	import CollectionPage from '../../components/collectionPage.svelte';
	import InnerNav from '../../components/innerNav.svelte';

	export let data;

	let loading = false;
	// let supabase = data.supabase;
	// if (!$user) {
	// 	window.location.href = '/signin';
	// }
	// $: loading = false;
	// const create_new = async (lang, description) => {
	// 	console.log($user);
	// 	let code = '// your code here';

	// 	let user_id = $user.id;
	// 	const { data, error } = await supabase
	// 		.from('snips')
	// 		.insert([{ code, lang, project_key: key, user_id, description }]);
	// 	// console.log(data);
	// 	if (error) {
	// 		console.error(error);
	// 	} else {
	// 		console.log(data);
	// 		window.location.href = `/${key}`;
	// 	}
	// };

	// function handleNew(event) {
	// 	let lang, description;
	// 	lang = event.detail.lang;
	// 	description = event.detail.description
	// 		? event.detail.description
	// 		: `New ${selectedValue} project`;

	// 	create_new(lang, description);
	// }

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

<InnerNav />
<div
	class="flex items-center justify-center min-h-screen flex-col gap-2 p-4 px-7 md:px-4 bg-gradient-to-r from-bg-sky-50 to-bg-sky-300"
>
	{#if !loading}
		<!-- Dashboard.svelte -->

		<Search />
		<main class=" min-h-screen flex items-center justify-center">
			<div class="max-w-4xl mx-auto px-1 sm:px-6 lg:px-8 py-12">
				<!-- <Sm -->
				<!-- Create New Code Snippet button -->
				<div class="text-center mb-4 flex items-center justify-center flex-col">
					<div
						class="bg-sky-500 hover:bg-sky-600 text-white py-3 px-3 md:px-6 rounded-lg shadow transition-all duration-300"
					>
						<NewSnippet />
					</div>
				</div>

				<!-- Code Snippet Cards -->
				<div>
					<p class="text-lg md:text-xl font-bold py-6">Your Collections</p>
				</div>
				<CollectionPage rawcollection={data} />
			</div>
		</main>
	{:else}
		<Fa icon={faSpinner} class="animate-spin text-xl" />
	{/if}
</div>
