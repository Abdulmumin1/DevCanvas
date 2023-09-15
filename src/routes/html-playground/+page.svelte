<script>
	import Fa from 'svelte-fa';
	import InnerNav from '../../components/innerNav.svelte';
	import { faRightLong } from '@fortawesome/free-solid-svg-icons';
	import { pageCount } from '$lib/index.js';

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
			.select('*')
			.order('created_at', { ascending: false })
			.limit($pageCount);

		if (error) {
			console.error(error);
			return;
		}
		// pageCount.update((cur) => {
		// 	return cur + 6;
		// });
		return dt;
	}

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

	onMount(() => {
		console.log(data);
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
				class="bg-sky-500 hover:bg-sky-300 px-6 py-4 rounded-lg text-primary text-xl md:text-5xl flex transition-all duration-300 hover:gap-6 gap-4"
				>Launch play ground <Fa icon={faRightLong} /></button
			>
		</form>
	</article>
	<div class="flex items-center justify-center min-h-screen flex-col gap-2">
		<main class=" min-h-screen flex py-3 md:py-6 w-full justify-center">
			<div class="w-full px-4 max-w-4xl">
				<div>
					<p class="text-lg md:text-xl font-bold py-6">Recent Collections</p>
				</div>
				{#await loadIntialData()}
					<CollectionDummy />
				{:then userSnippets}
					<!-- <Sm -->
					<!-- Create New Code Snippet button -->

					<!-- Code Snippet Cards -->

					<FeCollectionPage
						collection={userSnippets}
						supabase={data.supabase}
						session={data.session}
					/>
				{/await}
			</div>
		</main>
	</div>
</NavWrapper>
