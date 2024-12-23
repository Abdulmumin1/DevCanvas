<script>
	import Nav from '../../../../components/nav.svelte';
	import CodeText from '../../../../components/codeText.svelte';
	import {
		current_data,
		user,
		previewMode,
		SnippetsDescription,
		showToast,
		saved_spinner,
		saveData
	} from '$lib/index.js';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import DetailsGrid from '../../../../components/DetailsGrid.svelte';

	import { Carta, MarkdownEditor } from 'carta-md';
	import 'carta-md/default.css'; /* Default theme */
	import { code } from '@cartamd/plugin-code';
	import '@cartamd/plugin-code/default.css';
	import { markdown } from 'svelte-highlight/languages';

	export let data;

	// function handleContentChange(event) {
	// 	current_data.update((cur) => {
	// 		return { ...cur, code: event.detail };
	// 	});
	// 	console.log($current_data);
	// 	console.log(event.detail);
	// }

	// Subscribe to the content store to update the input when necessary

	// console.log(user)

	// afterUpdate(() => {
	// 	// This will handle the redirection if the user logs out on another page
	// 	if (!$user) {
	// 		window.location.href = '/sigin'; // Replace '/login' with your desired login page URL
	// 	}
	// });

	let mobileDetails;
	if (browser) {
		mobileDetails = window.innerWidth <= 768;
	}

	previewMode.set(true);

	const carta = new Carta({
		// Remember to use a sanitizer to prevent XSS attacks!
		// More on that below
		// sanitizer: ...
		theme: 'github-dark',
		extensions: [
			code({
				theme: 'ayu-light'
			})
		]
	});

	let value = '';
	// editor.addAction(saveAction);
	let saved = true;
	let typingTimer; // Timer to track typing
	const delay = 1000; // Adjust the delay as needed (in milliseconds)

	// Function to handle text input
	function handleAutoSave() {
		clearTimeout(typingTimer); // Clear the previous timer

		typingTimer = setTimeout(function () {
			// This function will run after the delay (user has stopped typing)
			save();
		}, delay);
	}

	async function save() {
		saved = false;
		current_data.update((cur) => {
			return { ...cur, markdown: value };
		});
		saved_spinner.set(true);
		saveData($current_data, 'markdown');
		saved = true;
		saved_spinner.set(false);
	}

	$: {
		if (value) {
			handleAutoSave();
		}
	}
	onMount(() => {
		current_data.set(data['0']);
		value = data['0']?.markdown;
		// getUser()
	});
</script>

<svelte:head>
	{#if data.isFound}
		<title>{data['0'].description}</title>

		<!-- Facebook Meta Tags -->
		<meta property="og:title" content={data['0'].description} />

		<!-- Twitter Meta Tags -->
		<meta name="twitter:title" content={data['0'].description} />
	{/if}
	<!-- HTML Meta Tags -->
</svelte:head>

<article class="g flex min-h-screen flex-col gap-2">
	{#if data.isFound}
		<Nav />
		<div class="relative flex h-full flex-col p-0 md:flex-row md:p-3">
			<div class="h-full w-2/3">
				<CodeText inputContent={data['0'].code} lang={data['0'].lang} />
				<h3 class="p-2 py-4 text-xl font-semibold">Explanation</h3>
				<div class="rounded-xl bg-gray-100 p-4 *:border-none dark:bg-secondary-dark">
					<MarkdownEditor
						{carta}
						bind:value
						placeholder="Write some explanation here (helps with SEO alot)"
						class="article rounded-xl"
					/>
				</div>
			</div>

			<div class="sticky top-0 h-full w-2/6">
				<DetailsGrid details={data['0']} />
			</div>
		</div>
	{:else}
		<div class=" flex h-screen flex-col items-center justify-center">
			<h1 class="text-4xl font-bold md:text-5xl">404</h1>
			<p>Not found</p>
			<a class="rounded-md bg-sky-300 p-1" href="/dashboard">Home</a>
		</div>
	{/if}
</article>

<style>
	/* Set your monospace font (Required to have the editor working correctly!) */
	:global(.carta-font-code) {
		font-family: '...', monospace;
		font-size: 1.1rem;
		/* color:currentColor !important;  */
	}
	/* :global(:is(.dark)){} */
	:global(.carta-toolbar) {
		background-color: skyblue;
		border: 0 !important;
		padding-block: 20px !important;
		/* font-size: 300px !important; */
		border-top-left-radius: 12px;
		border-top-right-radius: 12px;
	}
	:global(.carta-editor) {
		border: 0 !important;
	}

	:global(.carta-theme__default .mode-split.carta-container::after) {
		background-color: transparent;
	}
</style>
