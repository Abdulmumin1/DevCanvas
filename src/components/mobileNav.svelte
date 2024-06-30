<script>
	import { faBars, faX } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { clickOutside } from '$lib/index.js';
	import Darkmode from './darkmode.svelte';

	import {slide} from 'svelte/transition'
	// let isOpen = false;
	let modal = false;

	function openModal() {
		// modal.showModal();
	modal = true;

	}

	function closeModal() {
		// modal.close();
	 modal = false;

	}
</script>


<!-- <div class="vaul"  bind:this={modal} >
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
		</a><a href="/play" class="py-4" on:click={closeModal}>Playground </a>

		<div class="-center mb-4 flex items-center gap-2">
			Change Theme: <div class="px-2 py-2 text-black dark:text-white"><Darkmode /></div>
		</div>
		<button on:click={closeModal} class="rounded-lg bg-sky-400 py-4 text-black">Close Menu</button>
	</div>
</div> -->

<button id="openModal" on:click={openModal}>
<Fa icon={faBars} />

</button>

{#if modal}
	
<div in:slide class="vaul dark:bg-[#191919] bg-white text-sky-300"  bind:this={modal} >
	<div
		class="flex flex-col  h-full text-base justify-between"
		use:clickOutside
		on:click_outside={closeModal}
	>
	<div class="flex flex-col">

		<a href="/explore" class="py-2" on:click={closeModal}
			>Home
			<br /><span class="text-sm text-black dark:text-[#e5e7eb]">Explore cool stuff</span>
		</a>
		<a href="/blog" class="py-4" on:click={closeModal}>Blog </a>
		<a href="/dashboard" class="py-4" on:click={closeModal}>Dashboard </a>
		<a href="/play/try" class="py-4" on:click={closeModal}
			>+ New Canvas
			<br /><span class="text-sm text-black dark:text-[#e5e7eb]">Create new Canvas/Editor</span>
		</a><a href="/play" class="py-4" on:click={closeModal}>Playground </a>

		<div class="-center mb-4 flex items-center gap-2">
			Change Theme: <div class="px-2 py-2 text-black dark:text-white"><Darkmode /></div>
		</div>
	</div>
		<button on:click={closeModal} class="rounded-lg bg-sky-400 py-4 text-black">Close Menu</button>
	</div>
</div>


{/if}

<style>
.vaul{
	/* height: 300px; */
	/* background-color: black; */
	z-index: 999;
	position: fixed;
	bottom: 0;
	width: 100%;
	right: 0;
	padding: 20px;
	border-top-left-radius: 1rem;
	border-top-right-radius: 1rem;
	border-top: 2px solid #38bdf8;
	height: 70%;

	
}

	#myModal {
		width: 300px;
		border-radius: 8px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
		transform: translateY(-100%);
		transition: transform 0.3s ease-in-out;
		box-shadow: 0px 0px 2px gray;
		animation: fade-out 0.1s ease-out;
		position: absolute;
		bottom: 0;
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
