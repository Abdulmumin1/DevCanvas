<script>
	import { faAdd, faClose, faExclamation, faSpinner } from '@fortawesome/free-solid-svg-icons';
	import { createEventDispatcher, getContext, onMount } from 'svelte';
	import Fa from 'svelte-fa';
	import { scale, slide } from 'svelte/transition';
	import { supportedLanguages, user_info, showToast } from '$lib/index.js';
	import Probadge from './probadge.svelte';

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
		// if (!username) {
		// 	showToast.set({ message: `Sorry 😮‍💨! please you profile to continue` });
		// 	return;
		// }
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
	// $: username = $user_info?.username;
	// onMount(() => {
	// 	setTimeout(() => {
	// 		username =
	// 	}, 500);
	// });
</script>

<div class="tooltip-container relative inline-block w-full transition-transform duration-300">
	<button
		on:click={showOptions}
		class="mb-2 flex w-fit cursor-pointer items-center gap-2 rounded-lg bg-sky-400 p-2 text-sm text-secondary-dark"
	>
		<Fa icon={newCodeIcon} /> New Code Snippet
	</button>

	{#if isTooltipVisible}
		<form
			method="POST"
			action="/db/create"
			transition:slide
			class="tooltip-content top-14 z-10 flex w-full flex-col items-center justify-center gap-4 rounded-lg bg-inherit py-4 md:max-w-[500px]"
		>
			<div class="w-full gap-2 dark:text-white">
				<p class="w-full text-left font-semibold text-black dark:text-white">Enter Description</p>
				<input
					name="description"
					bind:value={description}
					class="w-full rounded-lg border border-sky-200 p-2 text-left text-black outline-sky-200 dark:border-0 dark:bg-secondary-dark dark:text-white dark:outline-none dark:focus:outline-none"
					placeholder="describe your code here (just a few words!)"
				/>
				<p class="w-full text-left font-semibold text-black dark:text-white">Select language:</p>
				<select
					name="lang"
					on:change={handleDropdownChange}
					class="mb-2 w-full rounded-lg border-[.5px] p-2 text-black outline-sky-200 dark:border-0 dark:bg-secondary-dark dark:text-white dark:outline-none dark:focus:outline-none"
				>
					{#each options as option}
						<option value={option}>{option}</option>
					{/each}
				</select>
				<!-- <input name="username" value={username} readonly class="hidden" /> -->
				<!-- <input type="text" name="user_id" value="{user}"> -->
				<button
					type="submit"
					on:click={handleClick}
					class=" mb-2 flex w-full items-center justify-center gap-3 rounded-lg bg-sky-500 p-2 text-primary shadow transition-colors duration-200 hover:bg-sky-600"
					>Create
					{#if clickedNew}
						<Fa icon={faSpinner} class="animate-spin" />
					{/if}
				</button>
				{#if !descriptionEnter}
					<p
						transition:scale={{ duration: 150 }}
						class="flex items-center justify-center gap-2 rounded-md bg-rose-200 p-1 text-black"
					>
						<Fa icon={faExclamation} /> No description entered
					</p>
				{/if}
			</div>
		</form>
	{/if}
</div>

<style>
	/* .tooltip-container .tooltip-content {
		display: block;
	} */
</style>
