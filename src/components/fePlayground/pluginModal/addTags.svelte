<script>
	import { saveTags, canvasTags } from '$lib/feEditor/store.js';
	import { current_data } from '$lib/index.js';

	export let owner = false;
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
		if (!owner) {
			return;
		}
		tags = tags.filter((_, i) => i !== index);
	}
</script>

<div class="mb-3">Tags</div>

<div class="tags mb-2 text-black">
	{#each tags as tag, index}
		<div class="tag" on:click={() => removeTag(index)}>{tag} &times;</div>
	{:else}
		<p class="text-gray-300 mb-2">Canvas not Tagged!</p>
	{/each}
</div>

{#if owner}
	<div>
		<input
			type="text"
			class="rounded border border-sky-300 p-2 text-black outline-none focus:outline-1 focus:outline-offset-0 focus:outline-sky-300 dark:bg-secondary-dark dark:text-white"
			bind:value={tagInput}
			on:keydown={(e) => {
				if (e.key === 'Enter') addTag();
			}}
			placeholder="Add a tag"
			disabled={tags.length >= 8}
		/>
		<button on:click={addTag} disabled={tags.length >= 8} class="rounded bg-sky-300 p-2 text-black"
			>Add</button
		>
	</div>
{/if}

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
