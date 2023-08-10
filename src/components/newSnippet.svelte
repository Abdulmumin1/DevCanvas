<script>
	import { faSpinner } from '@fortawesome/free-solid-svg-icons';
	import { createEventDispatcher } from 'svelte';
	import Fa from 'svelte-fa';

	let isTooltipVisible = false;

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
	let selectedValue = options[0];
	let clickedNew = false;

	const dispatch = createEventDispatcher();

	const handleClick = () => {
		// alert('Button clicked!, ' + `${selectedValue}`);
		dispatch('newsnippet', {
			lang: selectedValue
		});
		clickedNew = true;
	};

	const handleDropdownChange = (event) => {
		selectedValue = event.target.value;
		// alert(`Selected option: ${selectedValue}`);
	};

	const showOptions = () => {
		isTooltipVisible = !isTooltipVisible;
	};
</script>

<div class="tooltip-container relative inline-block cursor-pointer">
	<button on:click={showOptions}> New Code Snippet </button>

	{#if isTooltipVisible}
		<div
			class="tooltip-content absolute bg-white p-4 shadow z-10 flex justify-center items-center gap-4 rounded-lg flex-col"
		>
			<select on:change={handleDropdownChange} class="select select-bordered w-full p-2 text-black">
				{#each options as option}
					<option value={option}>{option}</option>
				{/each}
			</select>
			<button
				on:click={handleClick}
				class=" mb-2 w-full p-2 bg-sky-500 rounded-lg shadow flex items-center justify-center gap-3"
				>Create
				{#if clickedNew}
					<Fa icon={faSpinner} class="animate-spin" />
				{/if}
			</button>
		</div>
	{/if}
</div>

<style>
	.tooltip-content {
		top: calc(100% + 8px);
		left: 0;
		min-width: 300px;
	}

	/* .tooltip-container .tooltip-content {
		display: block;
	} */
</style>
