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


	let searchResult = []

	async function searchCdnjs(e) {
		let query = e.target.value;

		let searchUrl = `https://api.cdnjs.com/libraries?search=${query}&limit=10`

		let response = await fetch(searchUrl)
		let jsonRes = await response.json()

		// console.log(jsonRes.results)
		searchResult = jsonRes.results
	}

	let delayt = 300
	let setTimeoutT = null;
	const searchCdnjsThrottle = (e)=>{
		clearTimeout(setTimeoutT)
		setTimeout(async ()=>{
			await searchCdnjs(e)
		}, delayt)
	}
</script>

<div class="flex flex-col gap-2 relative">
	<div class="font-semibold">External Script</div>

	<div class="flex gap-2">
		<input
			type="text"
			class="w-full rounded-xl border-2 border-sky-300 p-2 text-black dark:border-gray-700 dark:bg-secondary-dark dark:text-white"
			bind:value={tagInput}
			on:keydown={(e) => {
				if (e.key === 'Enter') addTag();
			}}
			on:input={searchCdnjsThrottle}			placeholder="Enter src url / Search cdnjs"
			disabled={scrpts.length >= 8}
		/>
		<button
			on:click={addTag}
			disabled={scrpts.length >= 8}
			class="rounded-xl bg-sky-300 px-6 py-1 text-black">Add</button
		>
	</div>
	{#if searchResult.length > 0 && tagInput}
		<div  class="absolute top-[73px] bg-gray-200 text-black flex flex-col p-1 rounded-lg w-full items-start">
			{#each [...searchResult].slice(0, 10) as result}
			<button
			class="px-2 hover:bg-gray-300 w-full py-1 text-left rounded-lg"
			 on:click={()=>{
				tagInput = result.latest;
				addTag()
			}}>{result.name} - {result.latest}</button>
		{/each}
		</div>
	{/if}

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
