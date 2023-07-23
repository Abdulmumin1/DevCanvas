<script>
	import {
		current_key,
		saveToLocalStorage,
		getFromLocalStorage,
		getLastPartOfUrl
	} from '$lib/index.js';
	// Function to update the store value

	$: ready = null;
	async function writeToJSONFile() {
		try {
			const response = await fetch('/api/write', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ message: 'cool' })
			});

			const data = await response.json();
			console.log(data.key);
			// window.location.href = `/${data.key}`;
			current_key.set({
				code: $current_key.code,
				key: data.key,
				lang: $current_key.lang
			});

			// console.log('jfdkafdkaf da fldsakfda fdas fd afdalfsdafo');
			let available_owns = getFromLocalStorage();
			available_owns = available_owns ? available_owns : [];
			saveToLocalStorage([...available_owns, data.key]);
			// window.location.href = `/${data.key}`;
			ready = data.key;
			return data;
		} catch (error) {
			console.error('Error writing to JSON file:', error);
		}
	}

	function create_new() {
		let data = writeToJSONFile();
		// console.log('jfdkafdkaf da fldsakfda fdas fd afdalfsdafo');
		// let available_owns = getFromLocalStorage();
		// available_owns = available_owns ? available_owns : [];
		// saveToLocalStorage([...available_owns]);
		// window.location.href = `/${data.key}`;
		// console.log(data);
		// let s = [].at
		// window.location.href = getFromLocalStorage().at(-1);
	}
</script>

<div class="flex items-center justify-center h-screen flex-col gap-2">
	<h1 class="text-6xl">Snippets</h1>
	<button class="bg-sky-300 px-5 py-2 rounded-lg shadow-lg" on:click={create_new}>new</button>
	<a>
		{#if ready}
			Go
		{/if}
	</a>
</div>
