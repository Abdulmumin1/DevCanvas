<script>
	import { current_data, user, clickOutside } from '$lib/index.js';
	import { supabase } from '$lib/supabase.js';
	import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	const signOut = () => {
		supabase.auth.signOut();
	};

	let isOpen = false;

	const toggleDropdown = () => {
		isOpen = !isOpen;
	};

	const closeDropdown = () => {
		isOpen = false;
	};
</script>

<div class="relative inline-block text-left">
	<button on:click={toggleDropdown}>
		<Fa icon={faEllipsis} class="rotate-90" />
	</button>

	{#if isOpen}
		<div
			class="absolute right-0 z-10 bg-white mt-2 w-32 rounded-md shadow-lg"
			use:clickOutside
			on:click_outside={closeDropdown}
		>
			<ul>
				<!-- <li class="py-2 px-4 hover:bg-blue-100 cursor-pointer">Option 1</li> -->
				<li class="py-2 px-4 hover:bg-blue-100 cursor-pointer">dashboard</li>
				<li class="py-2 px-4 hover:bg-red-100 cursor-pointer">Delete</li>
				{#if $user}
					<li class="bg-rose-300 px-3 m-1 py-2 rounded-xl cursor-pointer">
						<button on:click={signOut}> Logout </button>
					</li>
				{/if}
			</ul>
		</div>
	{/if}
</div>
