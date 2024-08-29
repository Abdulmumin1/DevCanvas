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
	import SingleSetting from '../singleSetting.svelte';
	import DeleteCanvas from '../deleteCanvas.svelte';
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

<div class="drop flex h-full w-full flex-col overflow-auto">
	<ul
		use:clickOutside
		on:click_outside={closeDropdown}
		class={`dropdown-menu flex h-fit  flex-col items-start justify-start gap-2 p-2 text-sm `}
	>
		<!-- transition:fly={{ y: 200, delay: 50 }} -->

		<li class="w-full">
			<ul>
				<li class="p-2 font-semibold">General</li>
			</ul>
			<ul class="flex flex-row flex-wrap gap-2 md:*:w-[330px]">
				<li class="w-full rounded-lg bg-gray-200 p-2 dark:bg-primary">
					<SingleSetting on:checked={handleAutoSave} checked={$autoSavefast} label={'Auto Save'} />
				</li>

				<li class="w-full rounded-lg bg-gray-200 p-2 dark:bg-primary">
					<SingleSetting
						on:checked={handleDelayChange}
						checked={$delayPreview}
						label={'Delay preview'}
					/>
				</li>
				<li class="w-full rounded-lg bg-gray-200 p-2 dark:bg-primary">
					<SingleSetting
						label={'Word Wrap'}
						on:checked={handleWordWrap}
						checked={$wordWrapSetting}
					/>
				</li>
			</ul>
		</li>

		<li class="mb-2 flex flex-col gap-2 px-1">
			<!-- <p></p> -->
			<div class="font-semibold dark:text-white">Format Editors</div>

			<div class="w-fit">
				<FormatCode />
			</div>
		</li>

		<li class="px-1">
			<AddTags owner={$isOwner} />
		</li>
	</ul>

	<ul
		class="settings-section flex flex-col gap-2 border-light text-black dark:border-secondary-dark"
	>
		<li class="px-2 font-semibold dark:text-white md:hidden">Actions</li>
		{#if $isOwner}
			<li>
				<button
					for=""
					class="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-error p-2 text-black transition-all duration-300 hover:gap-4 active:scale-95"
					><DeleteCanvas canvas_id={$current_data.project_key} title={$current_data.description} /> Delete
					Canvas</button
				>
			</li>
		{/if}
		<li class="flex w-fit items-center justify-center gap-2 rounded px-2 md:hidden">
			<FeGetEmbed />
		</li>
		<li class="px-2 md:hidden">
			{#if !$isOwner}
				<li class="flex w-fit items-center justify-center gap-1 rounded bg-green-500 px-2 py-1">
					Fork <FeFork />
				</li>
			{/if}
		</li>
	</ul>
</div>

<style>
</style>
