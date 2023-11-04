<script>
	import { fly } from 'svelte/transition';
	import { clickOutside, copyTextToClipboard } from '$lib/index.js';
	import { showEmbedModal } from '$lib/feEditor/store.js';
	import { page } from '$app/stores';
	import Fa from 'svelte-fa';
	import { faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';
	function closeModal() {
		showEmbedModal.set(false);
	}

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
</script>

<div class="bc absolute top-0 h-full w-full z-50">
	<div
		transition:fly
		use:clickOutside
		on:click_outside={closeModal}
		class="modal z-50 backdrop-blur-lg absolute w-[90%] md:w-[70%] h-[80%] md:h-[80%] inset-y-0 inset-x-0 mx-auto m-2 shadow-md border-t-4 bg-white dark:bg-black border-sky-500 p-3 rounded flex flex-col overflow-scroll gap-2"
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
</div>

<style>
	.modal::-webkit-scrollbar {
		width: 0px;
		height: 0px;
	}
	.modal {
		z-index: 50;
	}
	.bc {
		background-color: rgba(0, 0, 0, 0.42);
	}
</style>
