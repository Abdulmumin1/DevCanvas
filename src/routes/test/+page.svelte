<script>
	import LanguageSelect from '../../components/languageSelect..svelte';
	import Nav from '../../components/nav.svelte';
	import CodeText from '../../components/codeText.svelte';
	import { current_data, user, previewMode } from '$lib/index.js';
	import { onMount, afterUpdate } from 'svelte';
	previewMode.set(true);

	let data = {
		code: '//your code here',
		lang: 'javascript',
		project_key: 'test',
		isFound: true
	};

	// console.log(user)
	onMount(() => {
		current_data.set(data['0']);
		console.log(data);
		// getUser()
	});

	// afterUpdate(() => {
	// 	// This will handle the redirection if the user logs out on another page
	// 	if (!$user) {
	// 		window.location.href = '/sigin'; // Replace '/login' with your desired login page URL
	// 	}
	// });
</script>

<article class="min-h-screen flex flex-col gap-4">
	{#if data.isFound}
		<Nav />

		<div class="flex h-full gap-5 flex-col lg:flex-row p-4">
			<div class="w-full h-full p-3 shadow-md">
				<CodeText inputContent={data.code} lang={data.lang} />
			</div>
			<LanguageSelect lang={data.lang} />
		</div>
	{:else}
		<div class="font-bold">
			<h1 class="text-xl">404</h1>
			<p>Not found</p>
			{data.isFound}
		</div>
	{/if}
</article>
