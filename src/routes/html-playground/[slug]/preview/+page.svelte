<script context="module">
	export const layout = null; // or false
</script>

<script>
	import { onMount } from 'svelte';
	export let data;
	let documentCode = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
	<link href="
https://cdn.jsdelivr.net/npm/tailwindcss@3.3.3/tailwind.min.css
" rel="stylesheet">
	<style>
		/* Hide the vertical scrollbar */
	::-webkit-scrollbar {
		width: 0;
	}

	/* Hide the horizontal scrollbar */
	::-webkit-scrollbar {
		height: 0;
	}
		${data[0].css}	
	</style>
</head>
<body>

	${data[0].html}
</body>
</html>

`;
	let iframeDoc;

	onMount(() => {
		// Initialize the iframe with the default HTML code
		if (iframeDoc) {
			iframeDoc.contentDocument.open();
			iframeDoc.contentDocument.write(documentCode);
			iframeDoc.contentDocument.close();
		}
	});
</script>

<iframe
	class="h-[100dvh] w-full overflow-hidden dark:bg-primary"
	src=""
	title="preview"
	frameborder="0"
	bind:this={iframeDoc}
/>
