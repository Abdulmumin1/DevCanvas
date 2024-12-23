<script>
	import { current_data, user, clickOutside, goto } from '$lib/index.js';

	import { faExclamationCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
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

	async function DeleteEntry() {
		let formData = new FormData();

		formData.append('id', $current_data.id);
		formData.append('user_id', $current_data.user_id);
		const response = await fetch('/db/delete', {
			method: 'POST',
			body: formData
		});

		if (response.ok) {
			// Handle save success
			window.location.href = '/dashboard';
		} else {
			// Handle save failed
			console.log('failed');
		}
	}

	export let details;
</script>

<div in:slide class="mx-2 mb-3 flex flex-col gap-3 rounded-lg px-3 py-6 lg:px-4">
	<DetailsEditor lang={details.lang} />

	<div transition:slide class="flex flex-col gap-2">
		<p class="">Last Edited:</p>
		<p class="text-xs text-gray-700 dark:text-gray-400">
			{formatDate(details.created_at)}
		</p>
		<p class="">Description:</p>
		<p class="text-xs text-gray-700 dark:text-gray-400">
			{details.description}
		</p>
	</div>

	<div class="cursor-pointer">
		<button
			class="flex w-fit items-center gap-2 rounded bg-red-600 p-2 text-left text-black"
			on:click={DeleteEntry}
		>
			<Fa icon={faTrashAlt} />Delete</button
		>
	</div>
	<!-- <Shortcuts /> -->

	<GetEmbedCode />
</div>
