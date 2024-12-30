<script>
	import { pageCountSnips, pageCountPl } from '$lib/index.js';
	import CollectionPage from '$components/collectionPage.svelte';
	import CollectionDummy from '$components/collectionDummy.svelte';
	import NavWrapper from '$components/snips/navWrapper.svelte';
	import { fade } from 'svelte/transition';
	import FeCollectionPage from '$components/fePlayground/feCollectionPage.svelte';
	import UserStats from '$components/userStats.svelte';
	import FeCollectionDummy from '$components/feCollectionDummy.svelte';

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
			.select('*, profiles (username)')
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

<svelte:head>
	<title>Dashboard</title>
</svelte:head>

<div class="flex min-h-screen gap-2">
	<NavWrapper>
		<main class=" flex min-h-screen w-full flex-col py-3 md:py-6">
			<!-- <NewSnippet /> -->
			<UserStats {supabase} user_id={session?.user?.id} />
			<div class="w-full px-0">
				<div class="flex flex-col gap-2">
					<p class="pt-6 text-xl font-bold md:text-2xl">Your Collections</p>
					<div class="my-4 rounded-md bg-sky-light px-1 pt-2 dark:bg-secondary-dark">
						<div class="flex w-full gap-2 text-base text-primary dark:text-white">
							<button
								class="rounded-t-md p-1 px-3"
								on:click={toogle}
								class:bg-white={!showOther}
								class:dark:bg-primary={!showOther}
								>Canvas
							</button>
							<button
								class="rounded-t-md p-1 px-3"
								on:click={toogle}
								class:bg-white={showOther}
								class:dark:bg-primary={showOther}>Snippets</button
							>
						</div>
					</div>
					{#await loadPlaygroundData()}
						<FeCollectionDummy />
					{:then userSnippets}
						<!-- <Sm -->
						<!-- Create New Code Snippet button -->

						<!-- Code Snippet Cards -->
						<div transition:fade class:hidden={showOther} class="hidden h-full">
							<FeCollectionPage
								user_id={data.session.user.id}
								collection={userSnippets}
								supabase={data.supabase}
								dashboard={true}
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
								dashboard={true}

									showMore={userSnippets.length > 6}
									user_id={data.session.user.id}
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
