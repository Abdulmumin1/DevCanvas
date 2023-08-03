<script>
	import { supabase } from '$lib/supabase.js';
	import { afterUpdate, onMount } from 'svelte';
	import { generateRandomKey, user, previewMode, dashboardLoading } from '$lib/index.js';
	import Fa from 'svelte-fa';
	import { faAdd, faMoon, faSpinner, faSun } from '@fortawesome/free-solid-svg-icons';
	import RecentCard from '../../components/recentCard.svelte';
	import { scale } from 'svelte/transition';

	// if (!$user) {
	// 	window.location.href = '/signin';
	// }
	$: loading = $dashboardLoading;
	const create_new = async () => {
		console.log($user);
		let code = '// your code here';
		let lang = 'javascript';
		let key = generateRandomKey();
		let user_id = $user.id;
		const { data, error } = await supabase
			.from('snips')
			.insert([{ code, lang, project_key: key, user_id }]);
		// console.log(data);
		if (error) {
			console.error(error);
		} else {
			console.log(data);
			window.location.href = `/${key}`;
		}
	};
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
	class="flex items-center justify-center min-h-screen flex-col gap-2 overflow-scroll p-4 px-7 md:px-4"
>
	{#if !loading}
		<h1 class="text-6xl">Snippets</h1>
		<button
			class="bg-sky-300 px-5 py-2 rounded-lg shadow-md mb-4 flex items-center justify-center gap-2"
			on:click={create_new}
		>
			New <Fa icon={faAdd} /></button
		>

		<div class="container mx-auto px-4 sm:px-6 lg:px-8">
			<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{#each data.data as card}
					<RecentCard {card} />
				{/each}
			</div>
		</div>
	{:else}
		<Fa icon={faSpinner} class="animate-spin" />
	{/if}
</div>
