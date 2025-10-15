<script>
	import { faAdd, faClose, faExclamation, faSpinner } from '@fortawesome/free-solid-svg-icons';
	import { createEventDispatcher, getContext, onMount } from 'svelte';
	import Fa from 'svelte-fa';
	import { scale, slide } from 'svelte/transition';
	import { supportedLanguages, user_info, showToast } from '$lib/stores/index.js';
	import Probadge from './probadge.svelte';

	let isTooltipVisible = false;

	const options = supportedLanguages;
	let selectedValue = 'javascript';
	let clickedNew = $state(false);
	let description = $state('');

	let descriptionEnter = $state(true);
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
	<form
		method="POST"
		action="/db/create"
		transition:slide
		class="  mb-8 rounded-2xl bg-neutral-100 p-8 dark:bg-secondary-dark"
	>
		<div class="flex w-full flex-col gap-4 dark:text-white">
			<div class="flex items-center gap-2 text-3xl">
				<span
					class="flex aspect-square h-12 items-center justify-center rounded-full bg-sky-300 dark:text-black"
					>+</span
				> <span class="dark:text-white">New Snippet</span>
			</div>
			<p class="w-full text-left font-semibold text-black dark:text-white">Enter Description</p>
			<input
				name="description"
				bind:value={description}
				class="w-full rounded-lg border border-sky-200 p-4 text-left text-black outline-sky-200 dark:border-0 dark:bg-primary dark:text-white dark:outline-none dark:focus:outline-none"
				placeholder="Description / Title"
			/>
			<p class="w-full text-left font-semibold text-black dark:text-white">Select language:</p>
			<div class="flex gap-2">
				<select
					name="lang"
					onchange={handleDropdownChange}
					class="mb-2 w-full rounded-lg border-[.5px] p-2 text-black outline-sky-200 dark:border-0 dark:bg-primary dark:text-white dark:outline-none dark:focus:outline-none"
				>
					{#each options as option}
						<option value={option}>{option}</option>
					{/each}
				</select>
				<!-- <input name="username" value={username} readonly class="hidden" /> -->
				<!-- <input type="text" name="user_id" value="{user}"> -->
				<button
					type="submit"
					onclick={handleClick}
					class=" mb-2 flex w-fit items-center justify-center gap-3 rounded-full bg-sky-300 p-4 text-primary shadow transition-colors duration-200 hover:bg-sky-400"
				>
					{#if clickedNew}
						<Fa icon={faSpinner} class="animate-spin" />
					{:else}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="lucide lucide-send-horizontal"
							><path
								d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z"
							/><path d="M6 12h16" /></svg
						>
					{/if}
				</button>
			</div>
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
</div>

<style>
	/* .tooltip-container .tooltip-content {
		display: block;
	} */
</style>
