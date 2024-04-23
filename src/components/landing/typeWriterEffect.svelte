<script>
	import { onMount } from 'svelte';

	export let text = '<h1>Hello world</h1>';
	export let delay = 0;
	let textElement;
	let index = 0;

	function typeWriter() {
		if (index < text.length) {
			textElement.innerHTML += text.charAt(index);
			index++;
			setTimeout(typeWriter, 100); // Adjust typing speed (milliseconds)
		} else {
		}
	}

	// Start the typing animation
	onMount(async () => {
		setTimeout(() => {
			typeWriter();
		}, delay);
	});
</script>

<div class="typing-animation">
	<span id="text" class="text-sm text-light" bind:this={textElement} /><span
		class="cursor text-light">_</span
	>
</div>

<style>
	.typing-animation {
		font-family: Arial, sans-serif;
		font-size: 24px;
		overflow: hidden;
		border-right: 2px solid #000; /* Cursor effect */
		white-space: nowrap; /* Prevent text from wrapping */
		animation:
			typing 2s steps(40, end),
			blink-caret 0.75s step-end infinite;
	}

	.cursor {
		/* animation: blink-caret 0.75s step-end infinite; */
	}

	@keyframes typing {
		from {
			width: 0;
		}
		to {
			width: 100%;
		}
	}

	@keyframes blink-caret {
		from,
		to {
			border-color: transparent;
		}
		50% {
			border-color: #000;
		}
	}
</style>
