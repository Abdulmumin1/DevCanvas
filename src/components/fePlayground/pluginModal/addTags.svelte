<script>
	import { saveTags, canvasTags } from '$lib/feEditor/store.js';
	import { current_data } from '$lib/index.js';

	let tags = $canvasTags;
	if (!tags) {
		tags = [];
		console.log(tags, $canvasTags);
	}
	let tagInput = '';

	let selectMore;
	let delay = 1000;

	function addTag() {
		if (tagInput.trim() !== '' && tagInput.length <= 20 && tags.length < 8) {
			tags = [...tags, tagInput.trim()];
			tagInput = ''; // Clear the input field after adding a tag

			canvasTags.update((cur) => {
				return tags;
			});

			selectMore = setTimeout(() => {
				try {
					saveTags($canvasTags, $current_data.id);
				} catch (err) {
					console.error(err);
				}
			}, delay);
		}
	}

	function removeTag(index) {
		tags = tags.filter((_, i) => i !== index);
	}
</script>

<div>Tags</div>

<div class="tags text-black">
	{#each tags as tag, index}
		<div class="tag" on:click={() => removeTag(index)}>{tag} &times;</div>
	{/each}
</div>

<div>
	<input
		type="text"
		class="p-1 border text-black dark:text-white rounded-md dark:bg-secondary-dark"
		bind:value={tagInput}
		on:keydown={(e) => {
			if (e.key === 'Enter') addTag();
		}}
		placeholder="Add a tag"
		disabled={tags.length >= 8}
	/>
	<button
		on:click={addTag}
		disabled={tags.length >= 8}
		class="bg-sky-300 px-2 py-1 text-black rounded">Add</button
	>
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
