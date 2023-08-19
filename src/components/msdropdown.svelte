<script>
	import { current_data, user, clickOutside, goto } from '$lib/index.js';
	import { supabase } from '$lib/supabase.js';
	import { faBars, faEllipsis } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import Fa from 'svelte-fa';
	import { scale } from 'svelte/transition';
	const signOut = () => {
		supabase.auth.signOut();
		console.log($user);
	};

	async function DeleteEntry() {
		const { data, error } = await supabase.from('snips').delete().eq('id', $current_data.id);
		if (error) throw error;
		if (!error) goto('/dashboard');
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
		setInterval(() => {
			removePreview();
		}, 2000);
	});
</script>

<div class="relative flex text-left items-center justify-center">
	<button on:click={toggleDropdown}>
		<Fa icon={faBars} class=" transition-transform duration-150 hover:scale-110" />
	</button>

	{#if isOpen}
		<div
			class="absolute top-5 right-0 z-10 bg-white mt-2 w-60 p-3 rounded-md shadow-lg text-left"
			use:clickOutside
			in:scale={{ duration: 200, transformOrigin: 'top right' }}
			out:scale={{ duration: 200, transformOrigin: 'top right' }}
			on:click_outside={closeDropdown}
		>
			<ul>
				<!-- <li class="py-2 px-4 hover:bg-blue-100 cursor-pointer">Option 1</li> -->

				<li class="py-2 px-4 hover:bg-blue-100 cursor-pointer rounded-lg">
					<button class="w-full h-full text-left" on:click={() => goto('/dashboard')}
						>Dashboard</button
					>
				</li>
				{#if showDelete}
					<li class="py-2 px-4 hover:bg-red-100 cursor-pointer">
						<button class="w-full text-left" on:click={DeleteEntry}>Delete</button>
					</li>
				{/if}
				<li class="bg-rose-300 px-4 m-1 py-2 rounded-xl cursor-pointer">
					<button on:click={signOut} class="w-full"> Logout </button>
				</li>
			</ul>
		</div>
	{/if}
</div>
