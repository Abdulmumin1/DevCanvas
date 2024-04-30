<script>
	import { onMount } from 'svelte';

	export let text = '<h1> Hello world </h1>';
	export let delay = 0;
	export let speed = 50; // New variable for typing speed

	let textElement;
	let index = 0;
	let isTyping = false; // New variable to track typing state

	function typeWriter() {
		if (index < text.length && isTyping) {
			textElement.innerHTML += text.charAt(index);
			index++;
			setTimeout(typeWriter, speed);
		} else {
			isTyping = false; // Stop typing when the text is fully displayed
		}
	}

	// Start the typing animation
	onMount(async () => {
		setTimeout(() => {
			isTyping = true; // Start typing
			typeWriter();
		}, delay);
	});
</script>

<div class="typing-animation">
	<span class="text-white" bind:this={textElement} /> &nbsp;<span
		class={isTyping ? `cursor` : 'hidden'}>&#124;</span
	>
</div>

<style>
	.typing-animation {
		font-family: Arial, sans-serif;
		font-size: 1rem;
		overflow: hidden;
		/* border-right: 2px solid #000; Cursor effect */
		white-space: nowrap; /* Prevent text from wrapping */
		/* animation: blink-caret 0.75s step-end infinite; */
	}

	.cursor {
		display: inline;
		animation: blink-caret 0.75s step-end infinite;
	}

	@keyframes blink-caret {
		from,
		to {
			/* visibility: visible; */

			color: transparent;
		}
		50% {
			/* visibility: visible; */
			color: #fff;
		}
	}
</style>
