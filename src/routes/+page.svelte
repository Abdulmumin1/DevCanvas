<script>
	// Function to update the store value
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
			console.log(data.message);
			window.location.href = `/${data.key}`;
		} catch (error) {
			console.error('Error writing to JSON file:', error);
		}
	}

	function create_new() {
		let data = writeToJSONFile();
		// console.log(data);
		// window.location.href = `/${key}`;
	}
</script>

<div class="flex items-center justify-center h-screen flex-col gap-2">
	<h1 class="text-6xl">Snippets</h1>
	<button class="bg-sky-300 px-5 py-2 rounded-lg shadow-lg" on:click={create_new}>new</button>
</div>
