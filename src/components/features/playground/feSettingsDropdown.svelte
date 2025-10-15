<script>
	import FeGetEmbed from './feGetEmbed.svelte';
	// import  from '../ShareBtn.svelte';
	import { clickOutside } from '$lib/stores/index.js';
	import { scale } from 'svelte/transition';

	let isOpen = $state(false);

	const toggleDropdown = () => {
		isOpen = !isOpen;
	};

	const closeDropdown = () => {
		isOpen = false;
	};
</script>

<div class="relative flex h-full items-center justify-center text-left">
	<div>
		<button class="flex items-center justify-center" onclick={toggleDropdown}>
			<span class=" uppercase"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ellipsis-vertical-icon lucide-ellipsis-vertical"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg></span>
			<span class="sr-only">more settings</span>
		</button>
	</div>

	{#if isOpen}
		<div
			class="absolute right-0 top-9 z-10 mt-2 w-60 rounded-md bg-primary p-3 text-left shadow-lg"
			use:clickOutside
			in:scale={{ duration: 200, transformOrigin: 'top right' }}
			out:scale={{ duration: 200, transformOrigin: 'top right' }}
			onclick_outside={closeDropdown}
		>
			<ul>
				<!-- <li class="py-2 px-4 hover:bg-blue-100 cursor-pointer">Option 1</li> -->
				<FeGetEmbed />
			</ul>
		</div>
	{/if}
</div>
