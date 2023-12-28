<script>
	import { onMount } from 'svelte';
	import { isOwner, current_data } from '$lib/index.js';

	import {
		clickOutside,
		wordWrapSetting,
		smallerFontSize,
		formatOnPasteSetting,
		renderIndentGuidesSetting,
		editorSettingState
	} from '$lib/index.js';
	// import feather from 'feather-icons';
	import { scale, slide } from 'svelte/transition';
	import Fa from 'svelte-fa';
	import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
	import SingleSetting from '../singleSetting.svelte';
	import DeleteCanvas from '../deleteCanvas.svelte';

	let dropdownOpen = false;

	function closeDropdown() {
		editorSettingState.set(false);
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

{#if $editorSettingState}
	<div
		transition:slide={{ axis: 'x' }}
		class="absolute drop top-0 w-[300px] flex flex-col bg-white dark:bg-black h-full shadow-2xl"
	>
		<div class="justify-end">
			<button class="p-2" on:click={closeDropdown}>Close</button>
		</div>
		<ul
			use:clickOutside
			on:click_outside={closeDropdown}
			class={` p-2    text-sm h-fit  dropdown-menu flex items-start gap-2 justify-start flex-col `}
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
	</div>
{/if}

<style>
	.drop {
		z-index: 9999;
	}
</style>
