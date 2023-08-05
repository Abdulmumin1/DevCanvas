<script>
	import { onMount } from 'svelte';
	import { current_data, previewMode, user } from '$lib/index.js';
	import { faCheck, faE, faEdit } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	const options = [
		'javascript',
		'python',
		'html',
		'css',
		'java',
		'c++',
		'ruby',
		'swift',
		'typescript',
		'c#',
		'php',
		'go',
		'rust',
		'kotlin',
		'sql',
		'shell/bash',
		'json',
		'yaml',
		'markdown',
		'xml',
		'r',
		'perl',
		'objective-c',
		'dart',
		'scala',
		'haskell',
		'lua',
		'matlab',
		'powershell',
		'groovy',
		'coffeescript',
		'elixir',
		'f#',
		'vb.net',
		'crystal',
		'julia',
		'typescriptreact',
		'jsx',
		'kotlinandroid',
		'swiftios',
		'matlab',
		'matlabsession',
		'ini',
		'toml',
		'perl6',
		'swiftpm',
		'yaml',
		'diff',
		'http',
		'makefile',
		'rubyirb',
		'docker',
		'raku',
		'rspec',
		'http',
		'haskellcabal',
		'apacheconf',
		'nginx',
		'smalltalk',
		'cmake',
		'webassembly',
		'glsl',
		'shellsession',
		'shell',
		'plaintext'
	];

	let searchTerm = '';
	let filteredOptions = options;
	let selectedOption = 'javascript';
	export let lang;
	$: language = lang;
	$: editIcon = faEdit;
	let notEditable = true;

	const removePreview = () => {
		if ($user.id == $current_data.user_id) {
			// console.log('jfdkjafdlka');
			notEditable = !notEditable;
			editIcon = notEditable ? faEdit : faCheck;
		}
	};

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
		console.log($current_data);
		// You can do further processing with the selected option here
	}

	// onMount(() => {
	// 	lang = $current_data.lang;
	// });
</script>

<div class=" max-w-full w-full md:max-w-md md:w-[24rem] flex flex-col gap-3 px-3 lg:px-4 mb-4">
	<p class="font-bold text-lg flex items-center justify-center gap-2 w-fit">
		Language: <button on:click={removePreview} class="flex items-center justify-center text-lg">
			<Fa icon={editIcon} class="transition-transform duration-150 hover:scale-110" /></button
		>
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
