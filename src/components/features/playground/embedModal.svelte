<script>
	import { fly, scale, slide } from 'svelte/transition';
	import { clickOutside, copyTextToClipboard } from '$lib/stores/index.js';
	import { showEmbedModal } from '$lib/stores/playground.js';
	import { page } from '$app/stores';
	import Fa from 'svelte-fa';
	import { faCopy, faCheck, faClose } from '@fortawesome/free-solid-svg-icons';
	import { onDestroy, onMount } from 'svelte';
	function closeModal() {
		showEmbedModal.set(false);
	}
	let modal;
	let copied = false;
	let path = `${$page.url.origin}${$page.url.pathname}/embed`;
	$: iconCopy = copied ? faCheck : faCopy;
	function CopyAction() {
		copied = true;
		copyTextToClipboard(path);
		setTimeout(() => {
			copied = false;
		}, 2000);
	}

	onMount(() => {
		modal.showModal();
	});

	onDestroy(() => {
		modal.close();
	});
</script>

<dialog
	bind:this={modal}
	class="bc h-[90%] max-h-[850px] w-[90%] max-w-[850px] rounded-md border-secondary-dark bg-transparent dark:border md:h-[90%] md:w-[90%]"
>
	<!--class="bc absolute top-0 h-full w-full z-50"-->
	<div
		class="sticky top-0 flex justify-between border-b-4 border-sky-500 bg-white p-2 dark:bg-black dark:text-white"
	>
		<p>Embed Canvas</p>
		<button on:click={closeModal}><Fa icon={faClose} /></button>
	</div>
	<div
		in:fly
		out:slide
		use:clickOutside
		on:click_outside={closeModal}
		class="modal flex h-full flex-col gap-2 rounded bg-white p-3 dark:bg-black"
	>
		<iframe
			src={path}
			title="fs"
			height="100%"
			frameborder="0"
			scrolling="no"
			class="w-full overflow-hidden rounded-xl"
		/>
		<div class="flex items-center justify-center gap-2 text-sm">
			<p class="w-full rounded-lg bg-sky-300 p-1 text-black">
				<!-- {`
            <iframe
			src=${path}
			title="Embed"
			height="100%"
			frameborder="0"
		/>
                `} -->
				{path}
			</p>
			<button class=" z-50 rounded-lg bg-primary px-3 py-2 text-light" on:click={CopyAction}
				><Fa icon={iconCopy} /></button
			>
		</div>
	</div>
</dialog>

<style>
	.modal::-webkit-scrollbar {
		width: 0px;
		height: 0px;
	}
	.modal {
		z-index: 50;
	}
	/* .bc {
		background-color: rgba(0, 0, 0, 0.42);
	} */

	.bc::backdrop {
		backdrop-filter: blur(1px);
	}
</style>
