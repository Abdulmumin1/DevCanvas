<script>
	import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import Shortcuts from './shortcuts.svelte';
	import { slide } from 'svelte/transition';
	import DetailsEditor from './DetailsEditor.svelte';
	import { browser } from '$app/environment';
	import GetEmbedCode from './getEmbedCode.svelte';

	let mobileDetails;
	let showDetails = false;
	if (browser) {
		mobileDetails = window.innerWidth <= 768;
	}

	const setPreview = (user) => {
		console.log(user.id, data['0'].user_id);

		if (user.id == data['0'].user_id) {
			previewMode.set(false);
		} else {
			previewMode.set(true);
		}
	};

	function formatDate(inputDate) {
		const options = { year: 'numeric', month: 'long', day: 'numeric' };
		const date = new Date(inputDate);
		return date.toLocaleDateString('en-US', options);
	}
	function hideShowDetails() {
		mobileDetails = !mobileDetails;
	}

	export let details;
</script>

<div>
	<button
		class="fixed bottom-3 right-3 flex rounded-full bg-sky-300 p-3 text-xl transition-transform duration-300 hover:scale-105 dark:text-secondary-dark sm:hidden"
		on:click={hideShowDetails}
	>
		<Fa icon={faExclamationCircle} />
	</button>
</div>
<div
	in:slide
	class="mx-2 mb-3 flex flex-col gap-3 rounded-lg px-3 py-6 dark:bg-secondary-dark md:mx-4 md:w-[24rem] lg:px-4"
	class:hidden={mobileDetails}
>
	<DetailsEditor lang={details.lang} />
	<button
		class="flex w-fit items-center justify-center gap-2"
		on:click={() => {
			showDetails = !showDetails;
		}}>Details <Fa icon={faExclamationCircle} /></button
	>
	{#if showDetails}
		<div transition:slide>
			<p class="">Last Edited:</p>
			<p class="text-gray-700 dark:text-gray-400">
				{formatDate(details.created_at)}
			</p>
			<p class="">Description:</p>
			<p class="text-gray-700 dark:text-gray-400">
				{details.description}
			</p>
		</div>
	{/if}
	<Shortcuts />

	<GetEmbedCode />
</div>
