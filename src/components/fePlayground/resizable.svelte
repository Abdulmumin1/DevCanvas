<script>
	import { onMount } from 'svelte';
	import { Pane, Splitpanes } from 'svelte-splitpanes';
	import { browser } from '$app/environment';
	let windowSize = 'medium'; // Initialize with the default size

	// Define a function to update the windowSize variable based on the window width
	function updateWindowSize() {
		const width = window.innerWidth;
		if (width < 640) {
			windowSize = 'small';
		} else if (width < 1024) {
			windowSize = 'medium';
		} else {
			windowSize = 'large';
		}
	}

	onMount(() => {
		window.addEventListener('resize', updateWindowSize);
		return window.removeEventListener('resize', updateWindowSize);
	});

	// Initial call to set the initial window size\
	if (browser) {
		updateWindowSize();
	}
</script>

<Splitpanes theme="my-theme">
	<Pane snapSize={20}>
		<slot name="left" />
	</Pane>
	<Pane snapSize={10}>
		<slot name="right" />
	</Pane>
</Splitpanes>
