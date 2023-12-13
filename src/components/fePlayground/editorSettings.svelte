<script>
	import { onMount } from 'svelte';
	import { isOwner, current_data } from '$lib/index.js';

	import {
		clickOutside,
		wordWrapSetting,
		smallerFontSize,
		formatOnPasteSetting,
		renderIndentGuidesSetting
	} from '$lib/index.js';
	// import feather from 'feather-icons';
	import { scale, slide } from 'svelte/transition';
	import Fa from 'svelte-fa';
	import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
	import SingleSetting from './singleSetting.svelte';
	import DownloadCodeDropDown from './downloadCodeDropDown.svelte';
	import DeleteCanvas from './deleteCanvas.svelte';

	let dropdownOpen = false;

	function toggleDropdown() {
		dropdownOpen = !dropdownOpen;
	}

	function closeDropdown() {
		dropdownOpen = false;
	}

	function handleWordWrap(event) {
		console.log(event.detail.status);
		wordWrapSetting.set(event.detail.status);
	}

	function handleSmallerFont(event) {
		smallerFontSize.set(event.detail.status);
	}

	function handleFormatOnPaste(event) {
		formatOnPasteSetting.set(event.detail.status);
	}
	function handleInderLines(event) {
		renderIndentGuidesSetting.set(event.detail.status);
	}
</script>

<div class="dropdown relative flex flex-col text-center">
	<button
		class="dropdown-button flex items-center justify-end gap-2 hover:scale-105 transition-all duration-300 active:scale-95"
		on:click={toggleDropdown}
	>
		<Fa icon={faArrowDown} />
	</button>

	{#if dropdownOpen}
		<ul
			use:clickOutside
			on:click_outside={closeDropdown}
			class={`mt-4 w-[200px] rounded-xl p-2 absolute drop  right-0 top-0 text-sm h-fit  dropdown-menu flex items-start gap-2 justify-start flex-col bg-gray-300 dark:bg-black `}
			transition:scale
		>
			<li class="p-2 text-center">Applies to all editor</li>
			<li class="w-full">
				<SingleSetting label={'Word Wrap'} on:checked={handleWordWrap} checked={$wordWrapSetting} />
			</li>
			<li class="w-full">
				<SingleSetting
					label={'Smaller font size'}
					on:checked={handleSmallerFont}
					checked={$smallerFontSize}
				/>
			</li>
			<li class="w-full">
				<SingleSetting
					on:checked={handleInderLines}
					checked={$renderIndentGuidesSetting}
					label={'Indent lines'}
				/>
			</li>
			<li class="w-full">
				<SingleSetting
					on:checked={handleFormatOnPaste}
					checked={$formatOnPasteSetting}
					label={'Format on paste'}
				/>
			</li>
			<!-- <li class="w-full">
				<DownloadCodeDropDown />
			</li> -->
			{#if $isOwner}
				<li>
					<label
						for=""
						class="bg-error text-black gap-2 rounded-lg cursor-pointer w-full p-2 flex items-center justify-center transition-all duration-300 active:scale-95 hover:gap-4"
						><DeleteCanvas
							canvas_id={$current_data.project_key}
							title={$current_data.description}
						/> Delete Canvas</label
					>
				</li>
			{/if}
		</ul>
	{/if}
</div>

<style>
	.drop {
		z-index: 9999;
	}
</style>
