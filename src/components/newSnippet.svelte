<script>
	import { faAdd, faClose, faExclamation, faSpinner } from '@fortawesome/free-solid-svg-icons';
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
	};
</script>

<div
	class="tooltip-container relative inline-block cursor-pointer transition-transform duration-300"
>
	<button on:click={showOptions} class="flex justify-center items-center gap-2 w-full">
		<Fa icon={newCodeIcon} /> New Code Snippet
	</button>

	{#if isTooltipVisible}
		<form
			method="POST"
			action="/db/create"
			transition:slide
			class="tooltip-content m-0 md:m-4 w-[300px] md:w-[600px] bg-white p-4 shadow top-14 z-10 flex justify-center items-center gap-4 rounded-lg flex-col"
		>
			<div class="w-full gap-2">
				<p class="text-black text-left w-full font-semibold">Enter Description</p>
				<textarea
					name="description"
					bind:value={description}
					class="text-black text-left border border-sky-200 rounded-lg outline-sky-200 w-full p-2"
					placeholder="describe your code here (just a few words!)"
				/>
				<p class="text-black text-left w-full font-semibold">Select language:</p>
				<select
					name="lang"
					on:change={handleDropdownChange}
					class="select select-bordered w-full p-2 text-black outline-sky-200 mb-2"
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
