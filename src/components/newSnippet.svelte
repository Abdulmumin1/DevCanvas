<script>
	import { faAdd, faClose, faSpinner } from '@fortawesome/free-solid-svg-icons';
	import { createEventDispatcher } from 'svelte';
	import Fa from 'svelte-fa';
	import { scale, slide } from 'svelte/transition';

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
	let description;

	const dispatch = createEventDispatcher();

	const handleClick = () => {
		// alert('Button clicked!, ' + `${selectedValue}`);
		dispatch('newsnippet', {
			lang: selectedValue,
			description
		});
		clickedNew = true;
	};

	const handleDropdownChange = (event) => {
		selectedValue = event.target.value;
		// alert(`Selected option: ${selectedValue}`);
	};

	let newCodeIcon = faAdd;
	const showOptions = () => {
		isTooltipVisible = !isTooltipVisible;
		newCodeIcon = isTooltipVisible ? faClose : faAdd;
	};
</script>

<div
	class="tooltip-container relative inline-block cursor-pointer transition-transform duration-300"
>
	<button on:click={showOptions} class="flex justify-center items-center gap-2 w-full">
		<Fa icon={newCodeIcon} /> New Code Snippet
	</button>

	{#if isTooltipVisible}
		<div
			transition:slide
			class="tooltip-content m-4 w-[300px] md:w-[600px] bg-white p-4 shadow top-14 z-10 flex justify-center items-center gap-4 rounded-lg flex-col"
		>
			<div class="w-full gap-2">
				<p class="text-black text-left w-full">Enter Description</p>
				<textarea
					bind:value={description}
					class="text-black text-left border border-sky-200 rounded-lg outline-sky-200 w-full p-2"
					placeholder="describe your code here (just a few words you can recognise later!)"
				/>
				<p class="text-black text-left w-full">Select language:</p>
				<select
					on:change={handleDropdownChange}
					class="select select-bordered w-full p-2 text-black outline-sky-200 mb-2"
				>
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
		</div>
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
