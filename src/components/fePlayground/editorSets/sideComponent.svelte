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
		class="drop absolute top-0 flex h-full w-[300px] flex-col overflow-auto bg-white shadow-2xl dark:bg-black"
	>
		<div class="absolute right-0 m-3">
			<button class="rounded bg-sky-300 p-1 text-2xl text-black" on:click={closeDropdown}
				><Fa icon={faClose} /></button
			>
		</div>

		<ul
			use:clickOutside
			on:click_outside={closeDropdown}
			class={`dropdown-menu flex h-fit  flex-col items-start justify-start gap-2 p-2 text-sm `}
		>
			<!-- transition:fly={{ y: 200, delay: 50 }} -->

			<li class="w-full">
				<ul
					class="settings-section flex flex-col gap-1 border border-light dark:border-secondary-dark"
				>
					<li class="p-2">General</li>

					<li class="w-full">
						<SingleSetting
							on:checked={handleAutoSave}
							checked={$autoSavefast}
							label={'Auto Save'}
						/>
					</li>

					<li class="w-full">
						<SingleSetting
							on:checked={handleDelayChange}
							checked={$delayPreview}
							label={'Delay preview'}
						/>
					</li>
					<li class="w-full">
						<SingleSetting
							label={'Word Wrap'}
							on:checked={handleWordWrap}
							checked={$wordWrapSetting}
						/>
					</li>
				</ul>
			</li>

			<li
				class="settings-section flex flex-col gap-2 border border-light px-1 text-black dark:border-secondary-dark"
			>
				<!-- <p></p> -->
				<div class="dark:text-white">Format Editors</div>

				<div class="w-fit">
					<FormatCode />
				</div>
			</li>

			<li
				class="settings-section flex flex-col gap-1 border border-light dark:border-secondary-dark"
			>
				<AddTags owner={$isOwner} />
			</li>
		</ul>

		<ul
			class="settings-section flex flex-col gap-2 border border-light p-3 text-black dark:border-secondary-dark md:hidden"
		>
			<li class="px-2 dark:text-white">Actions</li>
			{#if $isOwner}
				<li>
					<button
						for=""
						class="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-error p-2 text-black transition-all duration-300 hover:gap-4 active:scale-95"
						><DeleteCanvas
							canvas_id={$current_data.project_key}
							title={$current_data.description}
						/> Delete Canvas</button
					>
				</li>
			{/if}
			<li class="flex w-fit items-center justify-center gap-2 rounded px-2">
				<FeGetEmbed />
			</li>
			<li class="px-2">
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

	.settings-section {
		/* border: 1px solid #ddd;		 */
		border-radius: 4px;
		padding: 10px;
		margin-bottom: 1px;
		width: 100%;
		border-radius: 4px;
	}
</style>
