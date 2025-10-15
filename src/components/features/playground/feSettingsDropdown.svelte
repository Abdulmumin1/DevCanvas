<script>
	import FeGetEmbed from './feGetEmbed.svelte';
	// import  from '../ShareBtn.svelte';
	import { EllipsisVertical } from 'lucide-svelte';
	import { clickOutside } from '$lib/stores/index.js';
	import { scale } from 'svelte/transition';

	let isOpen = false;

	const toggleDropdown = () => {
		isOpen = !isOpen;
	};

	const closeDropdown = () => {
		isOpen = false;
	};
</script>

<div class="relative flex h-full items-center justify-center text-left">
	<div>
		<button class="flex items-center justify-center" on:click={toggleDropdown}>
			<span class=" uppercase"><EllipsisVertical size={16} /></span>
			<span class="sr-only">more settings</span>
		</button>
	</div>

	{#if isOpen}
		<div
			class="absolute right-0 top-9 z-10 mt-2 w-60 rounded-md bg-primary p-3 text-left shadow-lg"
			use:clickOutside
			in:scale={{ duration: 200, transformOrigin: 'top right' }}
			out:scale={{ duration: 200, transformOrigin: 'top right' }}
			on:click_outside={closeDropdown}
		>
			<ul>
				<!-- <li class="py-2 px-4 hover:bg-blue-100 cursor-pointer">Option 1</li> -->
				<FeGetEmbed />
			</ul>
		</div>
	{/if}
</div>
