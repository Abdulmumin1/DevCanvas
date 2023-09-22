<script>
	import { afterUpdate, onMount } from 'svelte';
	import { pageCountSnips, pageCountPl } from '$lib/index.js';
	import NewSnippet from '../../components/newSnippet.svelte';
	import CollectionPage from '../../components/collectionPage.svelte';
	import CollectionDummy from '../../components/collectionDummy.svelte';
	import NavWrapper from '../../components/snips/navWrapper.svelte';
	import { fade } from 'svelte/transition';
	import FeCollectionPage from '../../components/fePlayground/feCollectionPage.svelte';

	export let data;

	let supabase = data.supabase;
	let session = data.session;
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
			.eq('user_id', session.user.id)
			.order('created_at', { ascending: false })
			.limit($pageCountSnips);

		if (error) {
			console.error(error);
		}
		return dt;
	}

	async function loadPlaygroundData() {
		let { data: dt, error } = await supabase
			.from('htmlPlayground')
			.select('user_id, project_key, description, view (views)')
			.eq('user_id', session.user.id)
			.order('created_at', { ascending: false })
			.limit($pageCountPl);

		if (error) {
			console.error(error);
			return;
		}
		// pageCount.update((cur) => {
		// 	return cur + 6;
		// });
		return dt;
	}
	// onMount(() => {
	// 	pageCountSnips.set(6);
	// });

	// afterUpdate(() => {
	// 	// This will handle the redirection if the user logs out on  page
	// 	if (!$user) {
	// 		window.location.href = '/signin';
	// 	} else {
	// 		loading = false;
	// 	}
	// });

	let showOther = false;
	function toogle() {
		showOther = !showOther;
	}

	// console.log(session.user);
</script>

<div class="flex min-h-screen gap-2">
	<NavWrapper>
		<main class=" min-h-screen flex py-3 md:py-6 w-full flex-col">
			<NewSnippet />
			<div class="w-full px-0 max-w-4xl">
				<div class="flex flex-col gap-2">
					<p class="text-2xl md:text-3xl font-bold pt-6">Your Collections</p>
					<div class="w-full pb-6 px-2 flex gap-2 text-primary dark:text-white text-xl md:text-3xl">
						<button
							class="border-sky-500"
							on:click={toogle}
							class:border-b-2={!showOther}
							class:text-sky-500={!showOther}>Playground</button
						>
						<button
							class="border-sky-500"
							on:click={toogle}
							class:border-b-2={showOther}
							class:text-sky-500={showOther}>Snips</button
						>
					</div>
					{#await loadPlaygroundData()}
						<CollectionDummy />
					{:then userSnippets}
						<!-- <Sm -->
						<!-- Create New Code Snippet button -->

						<!-- Code Snippet Cards -->
						<div transition:fade class:hidden={showOther} class="hidden h-full">
							<FeCollectionPage
								user_id={data.session.id}
								collection={userSnippets}
								supabase={data.supabase}
							/>
						</div>

						{#await loadIntialData()}
							<!-- <p class="flex items-center justify-center gap-2 text-xl h-[50vh]">
										Loading ...
										<Fa icon={faSpinner} class="animate-spin text-xl" />
									</p> -->
							<CollectionDummy />
						{:then userSnippets}
							<div transition:fade class:hidden={!showOther} class="hidden h-full">
								<CollectionPage
									rawcollection={userSnippets}
									supabase={data.supabase}
									showMore={userSnippets.length > 6}
									user_id={data.session.id}
								/>
							</div>

							<!-- <FeCollectionPage -->
						{/await}
					{/await}
				</div>
			</div>
		</main>
	</NavWrapper>
</div>
