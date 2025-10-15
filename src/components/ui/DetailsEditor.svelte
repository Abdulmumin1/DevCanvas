<script>
	import { onMount } from 'svelte';
	import { current_data, supportedLanguages, user, saveData } from '$lib/stores/index.js';
	import { faCheck, faEdit, faSpinner } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { scale, slide } from 'svelte/transition';

	const options = supportedLanguages;

	let searchTerm = $state('');
	let filteredOptions = $state(options);
	let selectedOption = $state('javascript');
	let { lang } = $props();
	let language = $derived(lang);
	let editIcon = $derived(faEdit);
	let notEditable = $state(true);
	let showEditIcon = $state(false);
	

	let spinner = $state(false);
	
	async function save() {
		spinner = true;
		saveData($current_data, 'lang');
		spinner = false;
	}

	const removePreview = () => {
		if ($user.id == $current_data.user_id) {
			// console.log('jfdkjafdlka');
			notEditable = !notEditable;
			update_lang();
			editIcon = notEditable ? faEdit : faCheck;
		}
	};

	function update_lang() {
		if (editIcon == faCheck) {
			save();
		}
	}
	function filterOptions() {
		filteredOptions = options.filter((option) =>
			option.toLowerCase().includes(searchTerm.toLowerCase())
		);
	}

	function selectOption(event) {
		const _selectedOption = event.target.value;
		// console.log('Selected Option:', _selectedOption);
		language = _selectedOption;
		current_data.update((cur) => {
			return { ...cur, lang: _selectedOption };
		});
		// console.log($current_data);
		// You can do further processing with the selected option here
	}

	onMount(() => {
		setTimeout(() => {
			if ($user.id == $current_data.user_id) {
				// console.log('jfdkjafdlka');
				showEditIcon = true;
			}
		}, 2000);
	});
</script>

<div class="flex flex-col gap-3">
	<p class=" flex w-fit items-center justify-center gap-2 text-lg">
		Language:
		{#if showEditIcon}
			<button in:scale onclick={removePreview} class="flex items-center justify-center text-lg">
				<div class="flex items-center justify-center gap-2">
					<Fa icon={editIcon} class="transition-transform duration-150 hover:scale-110" />
					{#if spinner}
						<Fa icon={faSpinner} class="animate-spin" /> saving ..
					{/if}
				</div>
			</button>
		{/if}
	</p>
	{#if !notEditable}
		<div transition:slide class="space-y-2">
			<input
				type="text"
				class="w-full rounded-md border border-sky-300 p-1 outline-none transition-all duration-100 focus:border-2 focus:outline-none dark:bg-primary"
				placeholder="Search..."
				bind:value={searchTerm}
				oninput={filterOptions}
			/>

			<select
				class="w-full rounded p-1 outline-none focus:outline-none dark:bg-primary dark:text-light"
				bind:value={selectedOption}
				onchange={selectOption}
			>
				{#each filteredOptions as option}
					<option value={option}>{option}</option>
				{/each}
			</select>
		</div>
	{/if}

	<div class="rounded-md bg-gray-100 p-2 dark:bg-sky-200 dark:text-black">
		<span>{language}</span>
	</div>
</div>
