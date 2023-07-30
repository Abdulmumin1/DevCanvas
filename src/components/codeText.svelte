<script>
	import { createEventDispatcher, onMount } from 'svelte';
	// Create a writable store to hold the input content
	export let inputContent;
	const dispatch = createEventDispatcher();

	// Function to handle input changes
	function handleInputChange(event) {
		inputContent = event.target.value;
		// Dispatch an event with the updated content to notify the parent component
		dispatch('contentChange', inputContent);
	}
</script>

<!-- Use the textarea element to capture user input -->
<textarea
	bind:value={inputContent}
	on:input={handleInputChange}
	class="bg-inherit focus:outline-none w-full h-full"
/>
