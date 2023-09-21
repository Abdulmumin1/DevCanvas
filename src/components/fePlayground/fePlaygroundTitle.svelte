<script>
	import { current_data, isOwner } from '$lib/index.js';
	import { saveData } from '$lib/feEditor/store.js';
	import { faPen } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { getProfile } from '$lib/utils.js';

	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let supabase = $page.data.supabase;
	let session = $page.data.session;

	let typingTimer; // Timer to track typing
	const delay = 1000; // Adjust the delay as needed (in milliseconds)

	// Function to handle text input
	function handleInput(event) {
		if (!$isOwner) return;
		let text = event.target.innerText;
		console.log(text);
		current_data.update((cur) => {
			// console.log(cur);
			return { ...cur, description: text };
		});
		clearTimeout(typingTimer); // Clear the previous timer

		typingTimer = setTimeout(function () {
			// This function will run after the delay (user has stopped typing)
			saveToServer();
		}, delay);
	}

	// Function to save text to the server (simulated)
	function saveToServer() {
		// Send a request to the server with the text data
		// You can use AJAX, Fetch API, or any other method to send data to the server
		console.log('saving data');
		saveData($current_data, 'description');
	}

	function handleKeyDown(event) {
		if (event.key === 'Enter' || event.keyCode === 13) {
			event.preventDefault();
		}
	}

	$: profile = [];

	onMount(async () => {
		console.log('mounted');
		if ($current_data.user_id == session?.user?.id) return;
		try {
			let profile_data = await getProfile($current_data.user_id, supabase);
			console.log(profile_data);
			if (profile_data.length > 0) {
				profile = profile_data;
			}
		} catch (error) {
			throw error;
		}
	});
</script>

<div class="flex flex-col w-full">
	{#if $isOwner}
		<div class="flex gap-2 items-center" style="margin-bottom: -7px;">
			<p
				contenteditable=""
				on:keydown={handleKeyDown}
				on:input={handleInput}
				placeholder="Untitled Project"
				class="max-w-[100px] md:max-w-full w-fit text-sm md:text-xl capitalize text-white bg-inherit outline-none whitespace-nowrap overflow-hidden text-ellipsis"
			>
				{$current_data.description}
			</p>
			<span class="text-white text-[11px] md:text-base">
				<Fa icon={faPen} />
			</span>
		</div>
	{:else}
		<p
			style="margin-bottom: -7px;"
			class="max-w-[100px] md:max-w-full w-fit text-sm md:text-xl capitalize text-white bg-inherit outline-none whitespace-nowrap overflow-hidden text-ellipsis"
		>
			{$current_data.description}
		</p>
	{/if}

	{#if profile.length > 0}
		<p
			class="text-sky-400 dark:text-sky-300 outline-none focus:outline-sky-300 p-1 focus:dark:outline-sky-400 rounded-lg text-[9px] md:text-sm"
			spellcheck="false"
		>
			<span>by</span>
			<a href={`/${profile[0].username}`}>@{profile[0].username}</a>
		</p>
	{:else}
		<p
			class="text-sky-400 dark:text-sky-300 outline-none focus:outline-sky-300 p-1 focus:dark:outline-sky-400 rounded-lg text-sm"
			spellcheck="false"
		>
			<a href="/html-playground">&larr;backHome</a>
		</p>
	{/if}
</div>
