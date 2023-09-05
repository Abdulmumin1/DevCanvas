<script>
	import { onMount } from 'svelte';
	import { current_data, supportedLanguages, user, saveData } from '$lib/index.js';
	import { faCheck, faEdit, faSpinner } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { scale } from 'svelte/transition';

	const options = supportedLanguages;

	let searchTerm = '';
	let filteredOptions = options;
	let selectedOption = 'javascript';
	export let lang;
	$: language = lang;
	$: editIcon = faEdit;
	let notEditable = true;
	$: showEditIcon = false;

	$: spinner = false;
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
		console.log('Selected Option:', _selectedOption);
		language = _selectedOption;
		current_data.update((cur) => {
			return { ...cur, lang: _selectedOption };
		});
		// console.log($current_data);
		// You can do further processing with the selected option here
	}

	onMount(() => {
		setInterval(() => {
			if ($user.id == $current_data.user_id) {
				// console.log('jfdkjafdlka');
				showEditIcon = true;
			}
		}, 2000);
	});
</script>

<div class="flex flex-col gap-3">
	<p class=" text-lg flex items-center justify-center gap-2 w-fit">
		Language:
		{#if showEditIcon}
			<button in:scale on:click={removePreview} class="flex items-center justify-center text-lg">
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
		<input
			type="text"
			class="w-full p-1 outline-none rounded-md focus:outline-none border focus:border-2 border-sky-300 transition-all duration-100"
			placeholder="Search..."
			bind:value={searchTerm}
			on:input={filterOptions}
		/>

		<select
			class="w-full rounded p-1 outline-none focus:outline-none"
			bind:value={selectedOption}
			on:change={selectOption}
		>
			{#each filteredOptions as option}
				<option value={option}>{option}</option>
			{/each}
		</select>
	{/if}

	<div class="bg-sky-100 p-2 rounded-md">
		<span>{language}</span>
	</div>
</div>
