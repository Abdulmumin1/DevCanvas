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
	import CollectionDummy from '../../components/collectionDummy.svelte';
	import SnipsSideNav from '../../components/snips/snipsSideNav.svelte';
	import NavWrapper from '../../components/snips/navWrapper.svelte';

	export let data;

	let supabase = data.supabase;
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

	async function loadIntialData() {
		let { data: dt, error } = await supabase
			.from('snips')
			.select('*')
			.eq('user_id', data.session.user.id)
			.order('created_at', { ascending: false })
			.limit($pageCount);

		if (error) {
			console.error(error);
		}
		return dt;
	}

	// onMount(() => {
	// 	// console.log($user);
	// 	// if (!getUser()) {
	// 	console.log(data);
	// 	// }
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

<div class="flex min-h-screen gap-2">
	<NavWrapper>
		<main class=" min-h-screen flex py-3 md:py-6 w-full flex-col">
			<NewSnippet />
			<div class="w-full px-0 md:px-4 max-w-4xl">
				<div>
					<p class="text-lg md:text-xl font-bold py-6">Your Collections</p>
				</div>
				{#await loadIntialData()}
					<CollectionDummy />
				{:then userSnippets}
					<!-- <Sm -->
					<!-- Create New Code Snippet button -->

					<!-- Code Snippet Cards -->

					<CollectionPage
						rawcollection={userSnippets}
						dashboard={true}
						supabase={data.supabase}
						session={data.session}
					/>
				{/await}
			</div>
		</main>
	</NavWrapper>
</div>
