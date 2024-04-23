<script>
	import { current_data, isOwner } from '$lib/index.js';
	import { showLoginToSave, showForkTosave } from '$lib/feEditor/store.js';

	import { saveData } from '$lib/feEditor/store.js';
	import { faLock, faLockOpen, faPen } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { getProfile } from '$lib/utils.js';

	import { page } from '$app/stores';
	import { onDestroy, onMount } from 'svelte';
	import ShowLoginOrforkBanner from './showLoginOrforkBanner.svelte';
	import CanvasVisibility from './canvasVisibility.svelte';

	let supabase = $page.data.supabase;
	let session = $page.data.session;

	let typingTimer; // Timer to track typing
	const delay = 1000; // Adjust the delay as needed (in milliseconds)

	let text = $current_data.description;
	let title = null;
	try {
		title = text.split('Fork:')[1];
		console.log(title);
	} catch (err) {
		//
	}
	// Function to handle text input
	function handleInput(event) {
		if (!$isOwner) return;
		let text = event.target.innerText;
		if (title) {
			text = `Fork: ${text}`;
		}

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
		saveData($current_data, 'description');
	}

	function handleKeyDown(event) {
		if (event.key === 'Enter' || event.keyCode === 13) {
			event.preventDefault();
		}
	}

	$: profile = [];

	onMount(async () => {
		if ($current_data.user_id == session?.user?.id) return;
		try {
			let profile_data = await getProfile($current_data.user_id, supabase);
			if (profile_data.length > 0) {
				profile = profile_data;
			}
		} catch (error) {
			throw error;
		}
	});

	onDestroy(() => {
		showForkTosave.set(false);
		showLoginToSave.set(false);
	});
</script>

<div class="flex w-full flex-col">
	{#if $isOwner}
		<div class="flex items-center gap-2" style="margin-bottom: -7px;">
			{#if title}
				<div class="flex w-fit max-w-[200px] items-center gap-1 md:max-w-[400px]">
					<p class="rounded bg-sky-400 p-[1.3px] text-sm text-black md:text-xl">Fork</p>
					<p
						contenteditable=""
						on:keydown={handleKeyDown}
						on:input={handleInput}
						placeholder="Untitled Project"
						spellcheck="false"
						class=" min-w-[50px] truncate whitespace-nowrap bg-inherit text-sm font-semibold capitalize text-white focus:outline-1 focus:outline-sky-200 md:text-xl"
					>
						{title}
					</p>
				</div>
			{:else}
				<p
					contenteditable=""
					on:keydown={handleKeyDown}
					on:input={handleInput}
					placeholder="Untitled Project"
					spellcheck="false"
					class="w-fit min-w-[50px] max-w-[200px] truncate whitespace-nowrap bg-inherit text-sm font-semibold capitalize text-white focus:outline-1 focus:outline-sky-200 md:max-w-[400px] md:text-xl"
				>
					{$current_data.description}
				</p>
			{/if}
			<span class="jello-diagonal-2 cursor-pointer text-[11px] text-white md:text-base">
				<Fa icon={faPen} />
			</span>

			<CanvasVisibility canvas_id={$current_data.id} publicLy={$current_data.public} />
		</div>
	{:else if title}
		<div class="flex w-fit max-w-[200px] items-center gap-1 md:max-w-[400px]">
			<p class="flex items-baseline rounded bg-sky-400 p-[1.3px] text-sm text-black md:text-xl">
				Fork
			</p>
			<p
				class="flex w-fit max-w-[200px] items-center gap-2 truncate whitespace-nowrap bg-inherit text-sm font-semibold capitalize text-white outline-none md:max-w-[400px] md:text-xl"
			>
				{title}
			</p>
		</div>
	{:else}
		<p
			style="margin-bottom: -7px;"
			class="flex w-fit max-w-[200px] items-center gap-2 truncate whitespace-nowrap bg-inherit text-sm font-semibold capitalize text-white outline-none md:max-w-[400px] md:text-xl"
		>
			{$current_data.description}
		</p>
	{/if}

	{#if profile.length > 0}
		<div class="flex gap-1 text-[.8rem] md:text-sm">
			<p
				class="rounded-lg p-1 text-sky-400 outline-none focus:outline-sky-300 dark:text-sky-300 focus:dark:outline-sky-400"
				spellcheck="false"
			>
				<span>by</span>
				<a class="font-semibold" href={`/${profile[0].username}`}>@{profile[0].username}</a>
			</p>
			<ShowLoginOrforkBanner />
		</div>
	{:else}
		<p
			class="rounded-lg p-1 text-sm text-sky-400 outline-none focus:outline-sky-300 dark:text-sky-300 focus:dark:outline-sky-400"
			spellcheck="false"
		>
			<a class="text-[.8rem] md:text-sm" href="/play">&larr;backHome</a>
		</p>
	{/if}
</div>

<style>
	.jello-diagonal-2:hover {
		-webkit-animation: jello-diagonal-2 0.8s infinite alternate-reverse both;
		animation: jello-diagonal-2 0.8s infinite alternate-reverse both;
	}

	/* ----------------------------------------------
 * Generated by Animista on 2023-9-22 9:1:29
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

	/**
 * ----------------------------------------
 * animation jello-diagonal-2
 * ----------------------------------------
 */
	@-webkit-keyframes jello-diagonal-2 {
		0% {
			-webkit-transform: skew(0deg 0deg);
			transform: skew(0deg 0deg);
		}
		30% {
			-webkit-transform: skew(-25deg -25deg);
			transform: skew(-25deg -25deg);
		}
		40% {
			-webkit-transform: skew(15deg, 15deg);
			transform: skew(15deg, 15deg);
		}
		50% {
			-webkit-transform: skew(-15deg, -15deg);
			transform: skew(-15deg, -15deg);
		}
		65% {
			-webkit-transform: skew(5deg, 5deg);
			transform: skew(5deg, 5deg);
		}
		75% {
			-webkit-transform: skew(-5deg, -5deg);
			transform: skew(-5deg, -5deg);
		}
		100% {
			-webkit-transform: skew(0deg 0deg);
			transform: skew(0deg 0deg);
		}
	}
	@keyframes jello-diagonal-2 {
		0% {
			-webkit-transform: skew(0deg 0deg);
			transform: skew(0deg 0deg);
		}
		30% {
			-webkit-transform: skew(-25deg -25deg);
			transform: skew(-25deg -25deg);
		}
		40% {
			-webkit-transform: skew(15deg, 15deg);
			transform: skew(15deg, 15deg);
		}
		50% {
			-webkit-transform: skew(-15deg, -15deg);
			transform: skew(-15deg, -15deg);
		}
		65% {
			-webkit-transform: skew(5deg, 5deg);
			transform: skew(5deg, 5deg);
		}
		75% {
			-webkit-transform: skew(-5deg, -5deg);
			transform: skew(-5deg, -5deg);
		}
		100% {
			-webkit-transform: skew(0deg 0deg);
			transform: skew(0deg 0deg);
		}
	}
</style>
