<script>
	import { faAdd, faClose, faExclamation, faSpinner } from '@fortawesome/free-solid-svg-icons';
	import { createEventDispatcher } from 'svelte';
	import Fa from 'svelte-fa';
	import { scale, slide } from 'svelte/transition';
	import { supportedLanguages, user_info, showToast } from '$lib/index.js';

	let isTooltipVisible = false;

	const options = supportedLanguages;
	let selectedValue = 'javascript';
	let clickedNew = false;
	let description = '';

	let descriptionEnter = true;
	const dispatch = createEventDispatcher();

	const handleClick = (event) => {
		// alert('Button clicked!, ' + `${selectedValue}`);
		clickedNew = true;
		if (!description) {
			event.preventDefault();
			clickedNew = false;
			descriptionEnter = false;
		}
	};

	const handleDropdownChange = (event) => {
		selectedValue = event.target.value;
		// alert(`Selected option: ${selectedValue}`);
	};

	let newCodeIcon = faAdd;
	const showOptions = () => {
		isTooltipVisible = !isTooltipVisible;
		newCodeIcon = isTooltipVisible ? faClose : faAdd;
		// if ($user_info) {
		// 	isTooltipVisible = !isTooltipVisible;
		// 	newCodeIcon = isTooltipVisible ? faClose : faAdd;
		// } else {
		// 	showToast.set({ message: 'Configure Profile to continue' });
		// }
		// console.log($user_info[0]?.username);
	};
</script>

<div
	class="tooltip-container relative inline-block cursor-pointer transition-transform duration-300"
>
	<h1 class="text-6xl">Dashboard</h1>
	<button
		on:click={showOptions}
		class="flex gap-2 p-2 rounded-lg text-secondary-dark bg-sky-400 w-fit items-center text-lg md:text-xl"
	>
		<Fa icon={newCodeIcon} /> New Code Snippet
	</button>

	{#if isTooltipVisible}
		<form
			method="POST"
			action="/db/create"
			transition:slide
			class="tooltip-contentw-[300px] md:w-[600px] bg-inherit py-4 top-14 z-10 flex justify-center items-center gap-4 rounded-lg flex-col"
		>
			<div class="w-full gap-2 dark:text-white">
				<p class="text-black text-left w-full font-semibold dark:text-white">Enter Description</p>
				<textarea
					name="description"
					bind:value={description}
					class="text-black text-left border border-sky-200 rounded-lg outline-sky-200 w-full p-2 dark:bg-primary dark:text-white"
					placeholder="describe your code here (just a few words!)"
				/>
				<p class="text-black text-left w-full font-semibold dark:text-white">Select language:</p>
				<select
					name="lang"
					on:change={handleDropdownChange}
					class="border-[.5px] w-full p-2 text-black outline-sky-200 mb-2 dark:bg-primary dark:text-white rounded-lg"
				>
					{#each options as option}
						<option value={option}>{option}</option>
					{/each}
				</select>
				<!-- <input type="text" name="user_id" value="{user}"> -->
				<button
					type="submit"
					on:click={handleClick}
					class=" mb-2 w-full p-2 bg-sky-500 hover:bg-sky-600 transition-colors duration-200 rounded-lg shadow flex items-center justify-center gap-3"
					>Create
					{#if clickedNew}
						<Fa icon={faSpinner} class="animate-spin" />
					{/if}
				</button>
				{#if !descriptionEnter}
					<p
						transition:scale={{ duration: 150 }}
						class="bg-rose-200 p-1 rounded-md text-black flex items-center justify-center gap-2"
					>
						<Fa icon={faExclamation} /> No description entered
					</p>
				{/if}
			</div>
		</form>
	{/if}
</div>

<style>
	.tooltip-content {
		min-width: 300px;
	}

	/* .tooltip-container .tooltip-content {
		display: block;
	} */
</style>
