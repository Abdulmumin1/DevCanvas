<script>
	import { isOwner, current_data } from '$lib/index.js';

	import {
		clickOutside,
		wordWrapSetting,
		smallerFontSize,
		formatOnPasteSetting,
		renderIndentGuidesSetting,
		editorSettingState,
		delayPreview,
		autoSavefast
	} from '$lib/index.js';
	import { fly, scale, slide } from 'svelte/transition';
	import SingleSetting from '../singleSetting.svelte';
	import DeleteCanvas from '../deleteCanvas.svelte';
	import Fa from 'svelte-fa';
	import { faBrush, faClose, faRemoveFormat } from '@fortawesome/free-solid-svg-icons';
	import FeGetEmbed from '../feGetEmbed.svelte';
	import FeFork from '../feFork.svelte';
	import AddTags from '../pluginModal/addTags.svelte';
	import FormatCode from './formatCode.svelte';

	function closeDropdown() {
		editorSettingState.set(false);
	}

	function handleWordWrap(event) {
		// console.log(event.detail.status);
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

	function handleDelayChange(event) {
		delayPreview.set(event.detail.status);
	}

	function handleAutoSave(event) {
		autoSavefast.set(event.detail.status);
	}
</script>

{#if $editorSettingState}
	<!-- transition:slide={{ axis: 'x' }} -->
	<!-- in:fly -->
	<div
		transition:fly={{ x: -200 }}
		class="drop absolute top-0 flex h-full w-[300px] flex-col bg-white shadow-2xl dark:bg-black"
	>
		<div class="absolute right-0 m-3">
			<button class="rounded bg-sky-300 p-1 text-2xl text-black" on:click={closeDropdown}
				><Fa icon={faClose} /></button
			>
		</div>

		<ul
			use:clickOutside
			on:click_outside={closeDropdown}
			class={` dropdown-menu    flex h-fit  flex-col items-start justify-start gap-2 p-2 text-sm `}
		>
			<!-- transition:fly={{ y: 200, delay: 50 }} -->
			<li class="p-2 text-center">Applies to all editor</li>

			<li class="w-full">
				<SingleSetting on:checked={handleAutoSave} checked={$autoSavefast} label={'Auto Save'} />
			</li>

			<li class="w-full">
				<SingleSetting
					on:checked={handleDelayChange}
					checked={$delayPreview}
					label={'Delay preview'}
				/>
			</li>
			<li class="w-full">
				<SingleSetting label={'Word Wrap'} on:checked={handleWordWrap} checked={$wordWrapSetting} />
			</li>
			<!-- <li class="w-full">
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
			</li> -->

			<!-- <li class="w-full">
				<DownloadCodeDropDown />
			</li> -->
			<li class="px-1 text-black">
				<FormatCode />
			</li>
			<li><AddTags owner={$isOwner} /></li>
			{#if $isOwner}
				<li>
					<label
						for=""
						class="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-error p-2 text-black transition-all duration-300 hover:gap-4 active:scale-95"
						><DeleteCanvas
							canvas_id={$current_data.project_key}
							title={$current_data.description}
						/> Delete Canvas</label
					>
				</li>
			{/if}
		</ul>

		<ul class="flex flex-col gap-2 p-3 text-black md:hidden">
			<li class="flex w-fit items-center justify-center gap-2 rounded bg-gray-300 px-2">
				Embed
				<FeGetEmbed />
			</li>
			<li>
				{#if !$isOwner}
					<li class="flex w-fit items-center justify-center gap-1 rounded bg-green-500 px-2 py-1">
						Fork <FeFork />
					</li>
				{/if}
			</li>
		</ul>
	</div>
{/if}

<style>
	.drop {
		z-index: 9999;
	}
</style>
