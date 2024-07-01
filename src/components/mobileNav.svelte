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

<button id="openModal" class="text-xl" on:click={openModal}>
<Fa icon={faBars} />

</button>

{#if modal}
	
<div in:slide class="vaul z-50 dark:bg-[#191919] bg-white text-sky-300"  >
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
	/* z-index: 999; */
	position: fixed;
	bottom: 0;
	width: 100%;
	right: 0;
	left: 0;
	padding: 20px;
	border-top-left-radius: 1rem;
	border-top-right-radius: 1rem;
	border-top: 2px solid #38bdf8;
	height: 70%;
	padding-bottom: 40px;

	
}

</style>
