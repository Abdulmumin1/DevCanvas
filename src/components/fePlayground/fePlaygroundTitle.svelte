<script>
	import { current_data, isOwner } from '$lib/index.js';
	import { saveData } from '$lib/feEditor/store.js';
	export let title;
	let typingTimer; // Timer to track typing
	const delay = 1000; // Adjust the delay as needed (in milliseconds)

	// Function to handle text input
	function handleInput(event) {
		if (!$isOwner) return;
		let text = event.target.value;
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
</script>

<input
	value={$current_data.description}
	name="title"
	on:input={handleInput}
	placeholder="Untitled Project"
	class="text-base md:text-xl capitalize text-primary dark:text-white bg-inherit outline-none"
/>
