<script>
	import Fa from 'svelte-fa';
	import InnerNav from '../../components/innerNav.svelte';
	import { faRightLong } from '@fortawesome/free-solid-svg-icons';
	import { pageCount, user_info } from '$lib/index.js';
	import { onMount } from 'svelte';

	import CollectionDummy from '../../components/collectionDummy.svelte';
	import FeCollectionPage from '../../components/fePlayground/feCollectionPage.svelte';
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
			.from('htmlPlayground')
			.select('project_key, user_id, description, view (views)')

			.order('created_at', { ascending: false })
			.limit($pageCount);

		// dt = data[0];
		// console.log(data);
		// const views = await getViews(dt.project_key, supabase);
		// console.log(views);
		// try {
		// 	const user_name = await getProfile(dt.user_id, supabase);
		// 	// Assuming getProfile returns an object with a 'user_name' property
		// 	if (new Object(user_name).length > 0) {
		// 		dt = { ...dt, profile: user_name[0].username, views: views[0]?.views };
		// 	} else {
		// 		dt = { ...dt, profile: 'anonymous', views: views[0]?.views };
		// 	}
		// } catch (error) {
		// 	dt = { ...data, profile: 'anonymous', views: views[0]?.views };
		// 	console.error(`Error fetching profile for user_id ${data.user_id}: ${error.message}`);
		// }

		// if (error) {
		// 	console.error(error);
		// 	return;
		// }
		// pageCount.update((cur) => {
		// 	return cur + 6;
		// });
		return dt;
	}

	// async function getEntries() {
	// 	const { data: dt, error } = await supabase.from('htmlPlayground').select(`
	// 	project_key,
	// 	description,

	// 	view (views)

	// 	`);
	// 	console.log(dt);
	// }

	export async function CreateNew() {
		let formData = new FormData();
		formData.append('description', 'Untitled X');
		const response = await fetch('/db/fe/create', {
			method: 'POST',
			body: formData
		});

		if (response.ok) {
			// Handle save success
		} else {
			// Handle save failed
			console.log('failed');
		}
	}

	// onMount(() => {
	// 	setTimeout(() => {
	// 		getEntries();
	// 	}, 4000);
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

<svelte:head>
	<title>Html Playground</title>

	<!-- Facebook Meta Tags -->
	<meta property="og:title" content="play around with html and css (tailwind bootstap)" />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:title" content="play around with html and css (tailwind bootstap)" />
	<!-- HTML Meta Tags -->
</svelte:head>

<NavWrapper>
	<article class=" h-[80vh] flex flex-col items-center justify-center">
		<form action="/db/fe/create" method="post">
			<input type="text" name="description" id="" value="Untitled Project" class="hidden" />
			<button
				type="submit"
				class=" bg-sky-500 hover:bg-sky-300 px-6 py-4 rounded-lg text-primary text-xl md:text-5xl flex transition-all duration-300 hover:gap-6 gap-4"
				>Launch play ground <Fa icon={faRightLong} /></button
			>
		</form>
	</article>
	<div class="flex items-center justify-center min-h-screen flex-col gap-2">
		<main class=" min-h-screen flex py-3 md:py-6 w-full justify-center">
			<div class="w-full px-4">
				<div>
					<p class="text-lg md:text-xl font-bold py-6">Popular Collections</p>
				</div>
				{#await loadIntialData()}
					<CollectionDummy />
				{:then userSnippets}
					<!-- <Sm -->
					<!-- Create New Code Snippet button -->

					<!-- Code Snippet Cards -->

					<FeCollectionPage collection={userSnippets} supabase={data.supabase} />
				{/await}
			</div>
		</main>
	</div>
</NavWrapper>
