<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import { previewMode } from '$lib/index.js';

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

{#if !$previewMode}
	
<textarea
	bind:value={inputContent}
	on:input={handleInputChange}
	spellcheck="false"
	class="bg-inherit focus:outline-none w-full h-full"
/>
{:else}
<textarea
	bind:value={inputContent}
	disabled
	spellcheck="false"
	class="bg-inherit focus:outline-none w-full h-full"
/>
{/if}
