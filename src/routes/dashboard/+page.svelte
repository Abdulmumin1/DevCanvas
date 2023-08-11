<script>
	import { supabase } from '$lib/supabase.js';
	import { afterUpdate, onMount } from 'svelte';
	import { generateRandomKey, user, previewMode, dashboardLoading } from '$lib/index.js';
	import Fa from 'svelte-fa';
	import { faAdd, faMoon, faSpinner, faSun } from '@fortawesome/free-solid-svg-icons';
	import RecentCard from '../../components/recentCard.svelte';
	import { scale } from 'svelte/transition';
	import NewSnippet from '../../components/newSnippet.svelte';

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
		console.log($user);
		// if (!getUser()) {
		// 	console.log('failure');
		// }
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

		<main class=" min-h-screen flex items-center justify-center">
			<div class="max-w-4xl mx-auto px-1 sm:px-6 lg:px-8 py-12">
				<!-- <Sm -->
				<!-- Create New Code Snippet button -->
				<div class="text-center mb-4 flex items-center justify-center flex-col">
					<p class="text-4xl md:text-5xl my-6">Snippets</p>
					<div
						class="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-6 rounded-lg shadow"
					>
						<NewSnippet on:newsnippet={handleNew} />
					</div>
				</div>

				<!-- Code Snippet Cards -->
				<div>
					<p class="text-lg md:text-xl font-bold py-6">Your Collections</p>
				</div>
				<div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 rounded-lg">
					{#each data.data as snippet}
						<!-- <div class="bg-white rounded-lg p-4 shadow-md">
							<h3 class="text-xl font-semibold mb-2">{snippet.lang}</h3>
							<code class="block bg-gray-100 p-2 rounded-lg shadow-inner">{snippet.code}</code>
							Add any additional information or actions here
						</div> -->
						<RecentCard card={snippet} />
					{/each}
				</div>
			</div>
		</main>
	{:else}
		<Fa icon={faSpinner} class="animate-spin text-xl" />
	{/if}
</div>
