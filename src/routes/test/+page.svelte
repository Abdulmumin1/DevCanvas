<script>
	import LanguageSelect from '../../components/languageSelect..svelte';
	import Nav from '../../components/nav.svelte';
	import CodeText from '../../components/codeText.svelte';
	import { current_data, user, previewMode } from '$lib/index.js';
	import { onMount, afterUpdate } from 'svelte';
	import { shiki, getHighlighter } from 'shiki';
	previewMode.set(true);

	let data = {
		code: '//your code here',
		lang: 'javascript',
		project_key: 'test',
		isFound: true
	};

	function handleContentChange(event) {
		current_data.update((cur) => {
			return { ...cur, code: event.detail };
		});
		console.log($current_data);
		console.log(event.detail);
	}

	// Subscribe to the content store to update the input when necessary

	const setPreview = (user) => {
		console.log(user.id, data['0'].user_id);

		if (user.id == data['0'].user_id) {
			previewMode.set(false);
		} else {
			previewMode.set(true);
		}
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
	getHighlighter({
		theme: 'nord'
	}).then((highlighter) => {
		console.log(highlighter.codeToHtml(`console.log('shiki');`, { lang: 'js' }));
	});
</script>

<article class="min-h-screen flex flex-col gap-4">
	{#if data.isFound}
		<Nav />

		<div class="flex h-full gap-5 flex-col lg:flex-row p-4">
			<div
				class="w-full min-h-[400px] md:h-full max-h-[500px] md:max-h-[900px] bg-gray-50 rounded-xl p-3 shadow-md"
			>
				<CodeText inputContent={data.code} on:contentChange={handleContentChange} />
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
