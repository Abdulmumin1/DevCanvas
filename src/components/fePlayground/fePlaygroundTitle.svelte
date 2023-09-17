<script>
	import { current_data, isOwner } from '$lib/index.js';
	import { saveData } from '$lib/feEditor/store.js';
	import { faPen } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

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
</script>

{#if $isOwner}
	<div class="flex gap-2 items-center">
		<p
			contenteditable=""
			on:keydown={handleKeyDown}
			on:input={handleInput}
			placeholder="Untitled Project"
			class="w-fit text-base md:text-xl capitalize text-primary dark:text-white bg-inherit outline-none"
		>
			{$current_data.description}
		</p>
		<span class="text-black dark:text-white">
			<Fa icon={faPen} />
		</span>
	</div>
{:else}
	<p class="text-base md:text-xl capitalize text-primary dark:text-white bg-inherit outline-none">
		{$current_data.description}
	</p>
{/if}
