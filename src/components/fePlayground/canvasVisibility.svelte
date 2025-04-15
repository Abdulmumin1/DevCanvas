<script>
	import { onMount } from 'svelte';
	import { clickOutside, current_data } from '$lib/index.js';
	// import feather from 'feather-icons';
	import { scale } from 'svelte/transition';
	import Fa from 'svelte-fa';
	import { faLock, faLockOpen, faSpinner } from '@fortawesome/free-solid-svg-icons';
	import SingleSetting from './singleSetting.svelte';

	let dropdownOpen = false;
	export let canvas_id;
	export let publicLy;

	$: isPublic = publicLy;

	$: icon = isPublic ? faLockOpen : faLock;
	$: text = isPublic ? 'Public' : 'Private';

	function toggleDropdown() {
		dropdownOpen = !dropdownOpen;
	}

	function closeDropdown() {
		dropdownOpen = false;
	}

	async function saveVisibility() {
		let formData = new FormData();
		// showSave.set(true);
		formData.append('id', canvas_id);
		formData.append('value', isPublic);
		const response = await fetch('?/updateVisibility', {
			method: 'POST',
			body: formData
		});
		if (response.ok) {
			// Handle save success
			// console.log('visibility saved');
		} else {
			// Handle save failed
			// console.log('failed');
		}
	}

	async function toggleVisibility() {
		isPublic = !isPublic;
		// console.log(canvas_id);
		await saveVisibility();
	}
</script>

<button
	on:click={toggleVisibility}
	class="flex h-fit rounded-xl bg-sky-100 p-1 px-2 text-[10px] text-black"
>
	<div class="flex gap-1">
		<Fa {icon} />
		<span class="hidden md:block">{text}</span>
	</div>
</button>

<!-- {#if dropdownOpen}
		<ul
			use:clickOutside
			on:click_outside={closeDropdown}
			class={`mt-8 w-[200px] rounded-md p-1 absolute drop  left-0 top-0 text-sm h-fit  dropdown-menu flex items-start  justify-start flex-col bg-gray-300 dark:bg-black `}
			transition:scale
		>
			<li class="p-2 text-center">Change Visibility</li>
			<SingleSetting label={'Private'} checked={!isPublic} on:checked={changeTitle} />
		</ul>
	{/if} -->

<style>
	.drop {
		z-index: 9999;
	}
</style>
