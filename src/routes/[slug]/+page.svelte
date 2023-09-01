<script>
	import LanguageSelect from '../../components/languageSelect..svelte';
	import Nav from '../../components/nav.svelte';
	import CodeText from '../../components/codeText.svelte';
	import { current_data, user, previewMode, SnippetsDescription, showToast } from '$lib/index.js';
	import { onMount, afterUpdate } from 'svelte';
	import Fa from 'svelte-fa';
	import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
	import { slide } from 'svelte/transition';
	import Toast from '../../components/toast.svelte';
	import Shortcuts from '../../components/shortcuts.svelte';
	import { browser } from '$app/environment';

	previewMode.set(true);

	export let data;

	// function handleContentChange(event) {
	// 	current_data.update((cur) => {
	// 		return { ...cur, code: event.detail };
	// 	});
	// 	console.log($current_data);
	// 	console.log(event.detail);
	// }

	// Subscribe to the content store to update the input when necessary

	const setPreview = (user) => {
		console.log(user.id, data['0'].user_id);

		if (user.id == data['0'].user_id) {
			previewMode.set(false);
		} else {
			previewMode.set(true);
		}
	};

	let showDetails = false;
	// console.log(user)
	onMount(() => {
		current_data.set(data['0']);
		// getUser()
	});

	// afterUpdate(() => {
	// 	// This will handle the redirection if the user logs out on another page
	// 	if (!$user) {
	// 		window.location.href = '/sigin'; // Replace '/login' with your desired login page URL
	// 	}
	// });

	function formatDate(inputDate) {
		const options = { year: 'numeric', month: 'long', day: 'numeric' };
		const date = new Date(inputDate);
		return date.toLocaleDateString('en-US', options);
	}
	let mobileDetails;
	if (browser) {
		mobileDetails = window.innerWidth <= 760;
	}

	function hideShowDetails() {
		mobileDetails = !mobileDetails;
	}
</script>

<svelte:head>
	<!-- HTML Meta Tags -->
	<!-- <title>{data['0'].description}</title> -->

	<!-- Facebook Meta Tags -->
	<!-- <meta property="og:title" content={data['0'].description} /> -->

	<!-- Twitter Meta Tags -->
	<!-- <meta name="twitter:title" content={data['0'].description} /> -->
</svelte:head>

<article class="min-h-screen h-screen flex flex-col gap-4">
	{#if data.isFound}
		<Nav />
		<div class="relative flex h-full gap-5 flex-col lg:flex-row p-0 md:p-1">
			<div class="w-full h-full p-0 md:p-1 pb-2 md:pb-1">
				<CodeText inputContent={data['0'].code} lang={data['0'].lang} />
			</div>

			<div>
				<button
					class="flex sm:hidden fixed bottom-3 right-3 p-3 bg-sky-300 rounded-full transition-transform duration-300 hover:scale-105"
					on:click={hideShowDetails}
				>
					<Fa icon={faExclamationCircle} />
				</button>
			</div>
			<div
				in:slide
				class="max-w-full w-full md:max-w-md md:w-[24rem] flex flex-col gap-3 px-3 lg:px-4 mb-4"
				class:hidden={mobileDetails}
			>
				<LanguageSelect lang={data['0'].lang} />
				<button
					class="w-fit justify-center items-center flex gap-2 text-lg"
					on:click={() => {
						showDetails = !showDetails;
					}}>Details <Fa icon={faExclamationCircle} /></button
				>
				{#if showDetails}
					<div transition:slide>
						<p class="">Last Edited:</p>
						<p class="text-gray-700">
							{formatDate(data['0'].created_at)}
						</p>
						<p class="">Description:</p>
						<p class="text-gray-700">
							{data['0'].description}
						</p>
					</div>
				{/if}
				<Shortcuts />
			</div>
			{#if $showToast}
				<Toast message={$showToast.message} />
			{/if}
		</div>
	{:else}
		<div class=" h-screen flex items-center justify-center flex-col">
			<h1 class="text-4xl md:text-5xl font-bold">404</h1>
			<p>Not found</p>
			<a class="bg-sky-300 rounded-md p-1" href="/dashboard">Home</a>
		</div>
	{/if}
</article>
