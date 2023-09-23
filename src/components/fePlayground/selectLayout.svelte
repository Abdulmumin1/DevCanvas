<script>
	import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { clickOutside } from '$lib/index.js';
	import { scale } from 'svelte/transition';
	import { layoutView } from '$lib/feEditor/store.js';

	let isOpen = false;
	let selectedOption = '';

	function toggleDropdown() {
		isOpen = !isOpen;
	}

	function selectOption(option) {
		selectedOption = option;
		isOpen = false;
	}
</script>

<div class="relative">
	<div class="">
		<div
			class="dropdown-header p-2 bg-gray-200 text-primary rounded cursor-pointer"
			on:click={toggleDropdown}
		>
			<Fa icon={faLayerGroup} />
		</div>

		{#if isOpen}
			<div
				class=" z-50 absolute left-0 rounded bg-black flex flex-col gap-1 p-3 mt-1"
				on:click_outside={toggleDropdown}
				use:clickOutside
				in:scale={{ duration: 200, transformOrigin: 'top right' }}
				out:scale={{ duration: 200, transformOrigin: 'top right' }}
			>
				<span>Change View</span>
				<div class="flex gap-2 bg-secondary-dark round">
					<button
						class="py-2 px-4 hover:bg-primary cursor-pointer text-white"
						on:click={() => {
							layoutView.set('left');
						}}
					>
						<span class="screen-reader-text">Use Left Layout</span><svg
							viewBox="0 0 20 20"
							width="20"
							height="20"
							class="rotate-[270deg]"
							><path
								d="M0 9.002C0 8.45.455 8 .992 8h18.016c.548 0 .992.456.992 1.002v9.996c0 .553-.455 1.002-.992 1.002H.992C.444 20 0 19.544 0 18.998V9.002Zm0-8C0 .45.451 0 .99 0h4.02A.99.99 0 0 1 6 1.003v4.994C6 6.551 5.549 7 5.01 7H.99A.99.99 0 0 1 0 5.997V1.003Zm7 0C7 .45 7.451 0 7.99 0h4.02A.99.99 0 0 1 13 1.003v4.994C13 6.551 12.549 7 12.01 7H7.99A.99.99 0 0 1 7 5.997V1.003Zm7 0C14 .45 14.451 0 14.99 0h4.02A.99.99 0 0 1 20 1.003v4.994C20 6.551 19.549 7 19.01 7h-4.02A.99.99 0 0 1 14 5.997V1.003Z"
							/></svg
						>
					</button>

					<button
						class="py-2 px-4 hover:bg-primary cursor-pointer text-white"
						on:click={() => {
							layoutView.set('top');
						}}
					>
						<span class="screen-reader-text">Use Top Layout</span><svg
							viewBox="0 0 20 20"
							width="20"
							height="20"
							><path
								d="M0 9.002C0 8.45.455 8 .992 8h18.016c.548 0 .992.456.992 1.002v9.996c0 .553-.455 1.002-.992 1.002H.992C.444 20 0 19.544 0 18.998V9.002Zm0-8C0 .45.451 0 .99 0h4.02A.99.99 0 0 1 6 1.003v4.994C6 6.551 5.549 7 5.01 7H.99A.99.99 0 0 1 0 5.997V1.003Zm7 0C7 .45 7.451 0 7.99 0h4.02A.99.99 0 0 1 13 1.003v4.994C13 6.551 12.549 7 12.01 7H7.99A.99.99 0 0 1 7 5.997V1.003Zm7 0C14 .45 14.451 0 14.99 0h4.02A.99.99 0 0 1 20 1.003v4.994C20 6.551 19.549 7 19.01 7h-4.02A.99.99 0 0 1 14 5.997V1.003Z"
							/></svg
						>
					</button>

					<button
						class="py-2 px-4 hover:bg-primary cursor-pointer text-white"
						on:click={() => {
							layoutView.set('right');
						}}
					>
						<span class="screen-reader-text">Use Right Layout</span><svg
							viewBox="0 0 20 20"
							width="20"
							height="20"
							class="rotate-90"
							><path
								d="M0 9.002C0 8.45.455 8 .992 8h18.016c.548 0 .992.456.992 1.002v9.996c0 .553-.455 1.002-.992 1.002H.992C.444 20 0 19.544 0 18.998V9.002Zm0-8C0 .45.451 0 .99 0h4.02A.99.99 0 0 1 6 1.003v4.994C6 6.551 5.549 7 5.01 7H.99A.99.99 0 0 1 0 5.997V1.003Zm7 0C7 .45 7.451 0 7.99 0h4.02A.99.99 0 0 1 13 1.003v4.994C13 6.551 12.549 7 12.01 7H7.99A.99.99 0 0 1 7 5.997V1.003Zm7 0C14 .45 14.451 0 14.99 0h4.02A.99.99 0 0 1 20 1.003v4.994C20 6.551 19.549 7 19.01 7h-4.02A.99.99 0 0 1 14 5.997V1.003Z"
							/></svg
						>
					</button>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.screen-reader-text {
		display: none;
	}
	svg {
		fill: white;
	}
</style>
