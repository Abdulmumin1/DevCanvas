<script>
	import { user } from '$lib/stores/index.js';

	import { current_data, clickOutside, goto } from '$lib/stores/index.js';
	import { faBars, faEllipsis } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import Fa from 'svelte-fa';
	import { scale } from 'svelte/transition';
	import Signout from './signout.svelte';

	async function DeleteEntry() {
		let formData = new FormData();

		formData.append('id', $current_data.id);
		formData.append('user_id', $current_data.user_id);
		const response = await fetch('/db/delete', {
			method: 'POST',
			body: formData
		});

		if (response.ok) {
			// Handle save success
			window.location.href = '/dashboard';
		} else {
			// Handle save failed
			// console.log('failed');
		}
	}
	$: showDelete = false;
	let isOpen = false;

	const toggleDropdown = () => {
		isOpen = !isOpen;
	};

	const closeDropdown = () => {
		isOpen = false;
	};

	const removePreview = () => {
		if ($user.id == $current_data.user_id) {
			// console.log('jfdkjafdlka');
			showDelete = true;
		}
	};

	onMount(() => {
		setTimeout(() => {
			removePreview();
		}, 2000);
	});
</script>

<div class="relative flex items-center justify-center text-left dark:text-white">
	<div>
		<button
			class="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-sky-400 to-sky-300 text-black"
			on:click={toggleDropdown}
		>
			<span class=" uppercase">{$user.email.slice(0, 2)}</span>
		</button>
	</div>

	{#if isOpen}
		<div
			class="absolute right-0 top-5 z-10 mt-2 w-60 rounded-md bg-white p-3 text-left shadow-lg dark:bg-primary"
			use:clickOutside
			in:scale={{ duration: 200, transformOrigin: 'top right' }}
			out:scale={{ duration: 200, transformOrigin: 'top right' }}
			on:click_outside={closeDropdown}
		>
			<ul>
				<!-- <li class="py-2 px-4 hover:bg-blue-100 cursor-pointer">Option 1</li> -->
				<li class="cursor-pointer rounded-lg px-4 py-2 hover:bg-blue-100 hover:text-primary">
					<a class="h-full w-full text-left" href="/play/try">+ New Canvas</a>
				</li>
				<li class="cursor-pointer rounded-lg px-4 py-2 hover:bg-blue-100 hover:text-primary">
					<a class="h-full w-full text-left" href="/profile">Profile</a>
				</li>
				<li class="cursor-pointer rounded-lg px-4 py-2 hover:bg-blue-100 hover:text-primary">
					<a class="h-full w-full text-left" href="/dashboard">Dashboard</a>
				</li>

				<li class="m-1 cursor-pointer rounded-xl bg-error px-4 py-2 dark:text-black">
					<Signout />
				</li>
			</ul>
		</div>
	{/if}
</div>
