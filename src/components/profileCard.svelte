<script>
	import { user } from '$lib/index.js';

	import { current_data, clickOutside, goto } from '$lib/index.js';
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
			console.log('failed');
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

<div class="relative flex text-left items-center justify-center dark:text-white">
	<div>
		<button
			class="rounded-full bg-gray-300 w-8 h-8 flex items-center justify-center dark:bg-secondary-dark dark:text-white text-primary"
			on:click={toggleDropdown}
		>
			<span class=" uppercase">{$user.email.slice(0, 2)}</span>
		</button>
	</div>

	{#if isOpen}
		<div
			class="absolute top-5 right-0 z-10 bg-white dark:bg-primary mt-2 w-60 p-3 rounded-md shadow-lg text-left"
			use:clickOutside
			in:scale={{ duration: 200, transformOrigin: 'top right' }}
			out:scale={{ duration: 200, transformOrigin: 'top right' }}
			on:click_outside={closeDropdown}
		>
			<ul>
				<!-- <li class="py-2 px-4 hover:bg-blue-100 cursor-pointer">Option 1</li> -->
				<li class="py-2 px-4 hover:bg-blue-100 hover:text-primary cursor-pointer rounded-lg">
					<a class="w-full h-full text-left" href="/play/try">+ New Canvas</a>
				</li>
				<li class="py-2 px-4 hover:bg-blue-100 hover:text-primary cursor-pointer rounded-lg">
					<a class="w-full h-full text-left" href="/profile">Profile</a>
				</li>
				<li class="py-2 px-4 hover:bg-blue-100 hover:text-primary cursor-pointer rounded-lg">
					<a class="w-full h-full text-left" href="/dashboard">Dashboard</a>
				</li>

				<li class="bg-error dark:text-black px-4 m-1 py-2 rounded-xl cursor-pointer">
					<Signout />
				</li>
			</ul>
		</div>
	{/if}
</div>
