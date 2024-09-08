<script>
	import { page } from '$app/stores';
	import Fa from 'svelte-fa';
	import {
		faCancel,
		faClose,
		faFloppyDisk,
		faRightToBracket
	} from '@fortawesome/free-solid-svg-icons';

	import { handleRedirectURL } from '$lib/utils.js';
	import { user } from '$lib/index.js';

	import ProfileCard from '../profileCard.svelte';

	let signinURL = handleRedirectURL($page.url);
	let modal;

	function openModal() {
		modal.showModal();
	}

	function closeModal() {
		modal.close();
	}
	export let disquise;
</script>

{#if !$user}
	<li class="rounded bg-green-500 px-2 py-2 text-primary md:py-2">
		{#if !disquise}
			<button on:click={openModal}>
				<!-- <span class="flex md:hidden"><Fa icon={faRightToBracket} /></span> -->
				<span class="flex">Login</span>
			</button>
		{:else}
			<button on:click={openModal} class="flex items-center gap-1">
				<!-- <span class="flex md:hidden"><Fa icon={faRightToBracket} /></span> -->
				<Fa icon={faFloppyDisk} />
				<p class="hidden md:flex">Save</p>
			</button>
		{/if}
	</li>

	<dialog id="loginDialog" bind:this={modal}>
		<div class="flex justify-end p-6 text-xl">
			<button on:click={closeModal} class="cursor-pointer"><Fa icon={faClose} /></button>
		</div>
		<iframe src="/signin" title="auth" frameborder="0" height="520px" width="450px" />
	</dialog>
{:else}
	<li>
		<ProfileCard />
	</li>
{/if}

<style>
	#loginDialog {
		background-color: white;
		border-radius: 8px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
		transform: translateY(-100%);
		transition: transform 0.3s ease-in-out;
	}

	#loginDialog[open] {
		transform: translateY(0);
	}

	#loginDialog::backdrop {
		backdrop-filter: blur(1px);
	}

	/* Optional styles for backdrop */
	#loginDialog::backdrop {
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
