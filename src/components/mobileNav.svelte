<script>
	import { faBars } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { clickOutside } from '$lib/index.js';
	import Darkmode from './darkmode.svelte';

	// let isOpen = false;
	let modal;

	function openModal() {
		modal.showModal();
	}

	function closeModal() {
		modal.close();
	}
</script>

<button id="openModal" on:click={openModal}><Fa icon={faBars} /></button>

<dialog id="myModal" bind:this={modal} class="dark:bg-[#191919] text-[#38bdf8]">
	<div
		class="flex flex-col text-base dark:bg-[#191919]"
		use:clickOutside
		on:click_outside={closeModal}
	>
		<a href="/explore" class="py-2" on:click={closeModal}
			>Home
			<br /><span class="text-sm text-black dark:text-[#e5e7eb]">Explore cool stuff</span>
		</a>
		<a href="/blog" class="py-4" on:click={closeModal}>Blog </a>
		<a href="/dashboard" class="py-4" on:click={closeModal}>Dashboard </a>
		<a href="/play/try" class="py-4" on:click={closeModal}
			>+ New Canvas
			<br /><span class="text-sm text-black dark:text-[#e5e7eb]">Create new Canvas/Editor</span>
		</a><a href="/explore" class="py-4" on:click={closeModal}>Playground </a>

		<div class="flex gap-2 items-center -center mb-4">
			Change Theme: <div class="text-black dark:text-white px-2 py-2"><Darkmode /></div>
		</div>
		<button on:click={closeModal} class="py-4 text-black rounded-lg bg-sky-400">Close Menu</button>
	</div>
</dialog>

<style>
	#myModal {
		width: 300px;
		padding: 20px;
		border-radius: 8px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
		transform: translateY(-100%);
		transition: transform 0.3s ease-in-out;
		box-shadow: 0px 0px 2px gray;
		animation: fade-out 0.1s ease-out;
	}

	#myModal::backdrop {
		backdrop-filter: blur(1px);
	}

	/* Optional styles for backdrop */
	#myModal::backdrop {
		background-color: rgba(0, 0, 0, 0.5);
	}

	#myModal[open] {
		animation: fade-in 0.2s ease-out;
		transform: translateY(0);
	}

	#myModal::backdrop {
		opacity: 0;
	}

	@keyframes fade-in {
		0% {
			opacity: 0;
			scale: 1.03;
			display: none;
		}

		100% {
			opacity: 1;
			scale: 1;
			display: block;
		}
	}

	@keyframes fade-out {
		0% {
			opacity: 1;
			scale: 1.01;
			display: block;
		}

		100% {
			opacity: 0;
			scale: 1;
			display: none;
		}
	}
</style>
