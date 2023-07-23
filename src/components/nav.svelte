<script>
	import { current_key, getLastPartOfUrl } from '$lib/index.js';
	// Function to update the store value

	async function updateJsonFile(formData) {
		try {
			const response = await fetch('/api/update', {
				method: 'POST',

				body: formData
			});

			const data = await response.json();
			current_key.set({
				code: $current_key.code,
				lang: data.lang,
				key: undefined
			});
			console.log($current_key.code, data);
		} catch (error) {
			console.error('Error writing to JSON file:', error);
		}
	}

	function save() {
		let formData = new FormData();

		formData.append('code', $current_key.code);
		formData.append('lang', $current_key.lang);
		formData.append('key', getLastPartOfUrl(window.location.href));
		// console.log($current_key.code);
		// console.log(getLastPartOfUrl(window.location.href));
		updateJsonFile(formData);
	}
</script>

<nav class=" w-full">
	<ul class="w-full flex justify-between items-center p-4 shadow-xl">
		<li class="text-2xl">Snippets</li>
		<ul class="flex gap-3">
			<button type="submit" class="bg-sky-400 px-4 py-2 rounded-xl cursor-pointer" on:click={save}
				>Save</button
			>
			<li class="bg-sky-300 px-4 py-2 rounded-xl cursor-pointer">Share</li>
		</ul>
	</ul>
</nav>
