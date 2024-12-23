<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import { previewMode } from '$lib/index.js';
	import CodeHighlight from './codeHighlight.svelte';

	// Create a writable store to hold the input content
	export let inputContent;
	export let lang;
	const dispatch = createEventDispatcher();

	// Function to handle input changes
	function handleInputChange(event) {
		inputContent = event.target.value;
		// Dispatch an event with the updated content to notify the parent component
		dispatch('contentChange', inputContent);
	}
</script>

<!-- Use the textarea element to capture user input -->

<!-- {#if !$previewMode}
	<textarea
		bind:value={inputContent}
		on:input={handleInputChange}
		spellcheck="false"
		class="bg-inherit focus:outline-none w-full h-[400px] min-h-[400px] max-h-[500px] md:max-h-[600px] text-lg md:text-lg"
	/>
{:else} -->
<div class="h-[400px] rounded-2xl bg-gray-100 p-4 dark:bg-secondary-dark">
	<CodeHighlight initialCode={inputContent} {lang} />
</div>
<!-- {/if} -->
