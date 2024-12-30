<script>
	import { current_data } from '$lib/index.js';
	import { saveConfig, canvasConfig, userImportedJS } from '$lib/feEditor/store.js';

	let scrpts = $userImportedJS ?? [];
	// if (!scrpts) {
	// 	scrpts = [];
	// 	console.log(scrpts, $userImportedJS);
	// }
	let tagInput = '';

	let selectMore;
	let delay = 1000;

	function addTag() {
		if (tagInput.trim() !== '' && scrpts.length <= 5 && isValidURL(tagInput.trim())) {
			scrpts = [...scrpts, tagInput.trim()];
			tagInput = ''; // Clear the input field after adding a tag

			userImportedJS.set(scrpts);

			canvasConfig.update((cur) => {
				return { ...cur, userImportedJS: scrpts };
			});

			selectMore = setTimeout(() => {
				try {
					saveConfig({ ...$canvasConfig }, $current_data.id);
				} catch (err) {
					console.error(err);
				}
			}, delay);
		}
	}
	function isValidURL(url) {
		// Regular expression for a basic URL validation
		var urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;

		// Test the input URL against the regex
		return urlRegex.test(url);
	}

	function removeTag(index) {
		scrpts = scrpts.filter((_, i) => i !== index);
	}
</script>

<div class="flex flex-col gap-2">
	<div class="font-semibold">External Script</div>

	<div class="flex gap-2">
		<input
			type="text"
			class="w-full rounded-xl  border-2 dark:border-gray-700	 p-2 border-sky-300 text-black dark:bg-secondary-dark dark:text-white"
			bind:value={tagInput}
			on:keydown={(e) => {
				if (e.key === 'Enter') addTag();
			}}
			placeholder="Enter src url"
			disabled={scrpts.length >= 8}
		/>
		<button
			on:click={addTag}
			disabled={scrpts.length >= 8}
			class="rounded-xl bg-sky-300 px-6 py-1 text-black">Add</button
		>
	</div>

	<div class="tags flex w-full flex-col text-black">
		{#each scrpts as tag, index}
			<div class="tag text-sm" on:click={() => removeTag(index)} clas="w-full">{tag} &times;</div>
		{/each}
	</div>
</div>

<style>
	/* Add your CSS styles for tags and input here */
	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.tag {
		background-color: #eee;
		padding: 4px 8px;
		border-radius: 4px;
		cursor: pointer;
	}

	.tag:hover {
		background-color: #ccc;
	}
</style>
