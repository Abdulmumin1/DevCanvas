<script>
	import { fly, scale, slide } from 'svelte/transition';
	import { clickOutside, copyTextToClipboard } from '$lib/index.js';
	import { showEmbedModal } from '$lib/feEditor/store.js';
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
	class="bc w-[90%] md:w-[90%] h-[90%] md:h-[90%] max-w-[850px] max-h-[850px] dark:border border-secondary-dark bg-transparent rounded-md"
>
	<!--class="bc absolute top-0 h-full w-full z-50"-->
	<div
		class="bg-white dark:bg-black dark:text-white flex justify-between p-2 sticky top-0 border-b-4 border-sky-500"
	>
		<p>Embed Canvas</p>
		<button on:click={closeModal}><Fa icon={faClose} /></button>
	</div>
	<div
		in:fly
		out:slide
		use:clickOutside
		on:click_outside={closeModal}
		class="modal h-full bg-white dark:bg-black p-3 rounded flex flex-col gap-2"
	>
		<iframe
			src={path}
			title="fs"
			height="100%"
			frameborder="0"
			scrolling="no"
			class="w-full overflow-hidden rounded-xl"
		/>
		<div class="flex text-sm items-center justify-center gap-2">
			<p class="bg-sky-300 text-black p-1 rounded-lg w-full">
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
			<button class=" bg-primary text-light z-50 px-3 py-2 rounded-lg" on:click={CopyAction}
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
