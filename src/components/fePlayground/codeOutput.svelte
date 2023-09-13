<script>
	import { current_data } from '$lib/index.js';
	import { onMount } from 'svelte';

	let code;
	let documentCode = `
<!DOCTYPE html>
<html lang="en">
<head>
	<linkhref="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.CSS"rel=" stylesheet"/>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
	
</head>
<body>

	${code}
</body>
</html>
`;

	let sc = '';

	let iframeDoc;
	$: {
		code = $current_data.html;
		documentCode = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
	<link href="
https://cdn.jsdelivr.net/npm/tailwindcss@3.3.3/tailwind.min.css
" rel="stylesheet">
	
</head>
<body>

	${code}
</body>
</html>

`;

		if (iframeDoc) {
			iframeDoc.contentDocument.open();
			iframeDoc.contentDocument.write(documentCode);
			iframeDoc.contentDocument.close();
		}

		// console.log(code);
	}

	// onMount(() => {
	// 	html = code;
	// });

	onMount(() => {
		// Initialize the iframe with the default HTML code
		if (iframeDoc) {
			iframeDoc.contentDocument.open();
			iframeDoc.contentDocument.write(documentCode);
			iframeDoc.contentDocument.close();
		}
	});
</script>

<div
	class="bg-white border-t md:border-l dark:border-primary border-gray-300 w-full h-full text-black dark:text-white"
>
	<iframe bind:this={iframeDoc} title="preview" id="preview-frame" class="w-full h-full" />
</div>
