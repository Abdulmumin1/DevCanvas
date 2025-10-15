<script>
	import FeAiBox from '../features/playground/feAIBox.svelte';
	import { goto } from '$app/navigation';
	import { user } from '$lib/stores/index.js';
	import { X } from 'lucide-svelte';
	import { aibox, aiprompt } from '$lib/playground/aiFunctions.js';

	import Loader from '../ui/loader.svelte';
	import { fade } from 'svelte/transition';

	let loading = false;

	async function handlePrompt(e) {
		if (!$user) {
			openModal();
		} else {
			loading = true;
			aibox.set(true);
			aiprompt.set(e.detail?.message ?? '');
			const form = new FormData();
			form.append('description', e.detail.message);
			form.append('returnKey', true);
			const response = await fetch('/db/fe/create', {
				method: 'post',
				body: form
			});

			const data = await response.json();
			// console.log(data)
			goto('/play/' + data.key);
			loading = false;

			// setTimeout(()=>{
			// 	loading = false
			// },1000)
		}
	}

	let modal;

	function openModal() {
		modal.showModal();
	}

	function closeModal() {
		modal.close();
	}
</script>

{#if loading}
	<div
		transition:fade
		class="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-r from-sky-300 to-sky-400"
	>
		<Loader />
	</div>
{/if}

<div class="flex flex-col gap-12">
	<h1
		class="text-2xl font-bold tracking-tight text-gray-800 dark:text-white md:text-4xl lg:text-6xl"
	>
		What do you want to build?
	</h1>
	<div class="mx-auto flex h-full w-full items-center justify-center">
		<FeAiBox on:ai={handlePrompt} />
		<div></div>
	</div>
</div>

{#if !$user}
	<dialog id="loginDialog" bind:this={modal}>
		<div class="flex justify-end p-6 text-xl">
			<button on:click={closeModal} class="cursor-pointer"><X /></button>
		</div>
		<iframe src="/signin" title="auth" frameborder="0" height="520px" width="450px" />
	</dialog>
{/if}
