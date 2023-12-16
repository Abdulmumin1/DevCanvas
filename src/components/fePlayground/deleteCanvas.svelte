<script>
	import { isOwner, current_data, showToast } from '$lib/index.js';
	import { faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { invalidateAll, goto } from '$app/navigation';

	export let canvas_id;
	export let user_id;
	export let title;
	let modal;
	let loading;

	function openModal() {
		modal.showModal();
	}

	function closeModal() {
		modal.close();
	}

	async function DeleteCanvas() {
		loading = true;
		let formData = new FormData();

		formData.append('id', canvas_id);
		formData.append('user_id', user_id);
		const response = await fetch('/db/fe/delete', {
			method: 'POST',
			body: formData
		});

		if (response.ok) {
			// Handle save success
			goto('/dashboard').then(() => {
				invalidateAll().then(() => {
					loading = false;
					showToast.set({ message: 'Canvas deleted' });
					modal.close();
				});
			});
		} else {
			// Handle save failed
			console.log('failed');
		}
	}
</script>

<button on:click={openModal}><Fa icon={faTrash} /> </button>

<dialog id="myModal" bind:this={modal}>
	<!-- <h2>Delete Canvas</h2> -->
	<div class="flex flex-col gap-2 items-center justify-center">
		<p class="font-bold text-center">Are You Sure you want to delete canvas?</p>
		<p>"{title}"</p>
		<div class="flex gap-4">
			<button class="p-2 bg-gray-300 rounded-lg" id="closeModal" on:click={closeModal}>Close</button
			>
			<button
				class="bg-error p-2 rounded-lg flex items-center justify-center gap-2"
				on:click={DeleteCanvas}
				>Delete {#if loading}
					<Fa icon={faSpinner} class="animate-spin" />
				{/if}</button
			>
		</div>
	</div>
</dialog>

<style>
	#myModal {
		width: 300px;
		padding: 20px;
		background-color: white;
		border-radius: 8px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
		transform: translateY(-100%);
		transition: transform 0.3s ease-in-out;
	}

	#myModal[open] {
		transform: translateY(0);
	}

	#myModal::backdrop {
		backdrop-filter: blur(1px);
	}

	/* Optional styles for backdrop */
	#myModal::backdrop {
		background-color: rgba(0, 0, 0, 0.5);
	}

	#openModal {
		position: absolute;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}

		to {
			opacity: 1;
		}
	}

	@keyframes fadeOut {
		from {
			opacity: 1;
		}

		to {
			opacity: 0;
		}
	}
</style>
