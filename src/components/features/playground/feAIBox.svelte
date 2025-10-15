<script>
	import { createEventDispatcher, getContext, onMount } from 'svelte';
	import { SendHorizontal, Loader2, Square, Maximize2, Minimize2, X } from 'lucide-svelte';
	import MessagesParser from './messagesParser.svelte';
	import { aibox, aiprompt } from '$lib/playground/aiFunctions.js';

	export let messages = [];
	let generating = getContext('generating');

	let inputContainer = $aiprompt;
	let inputbackup = null;
	const dispatch = createEventDispatcher();

	function handleSend() {
		if ($generating || !inputContainer.trim()) return;
		dispatch('ai', {
			message: inputContainer
		});
		inputbackup = inputContainer;
		inputContainer = '';
	}

	function handleStop() {
		if (!$generating) return;
		dispatch('stop', {
			stop: true
		});
		inputContainer = inputbackup;
		inputbackup = '';
	}

	function handleClose() {
		aibox.update((c) => {
			return !c;
		});
	}

	function handleKeyDown(e) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSend();
		}
	}
	let inputx;

	onMount(() => {
		if (inputContainer) {
			aiprompt.set('');
			handleSend();
		}
		inputx.focus();
	});
	let expand = false;
	let auto = 'auto';
	$: heat = $generating || messages.length > 2 ? (expand ? 500 : auto) : 0;
	// $:console.log(heat);
</script>

<div>
	<div
		style="height: {heat}{heat !== auto && 'px'};"
		class="relative {$generating || messages.length > 2
			? '  p-2'
			: ' overflow-hidden'} z-50 mx-auto flex w-[80%] flex-col rounded-t border-sky-950 bg-primary text-white transition-all duration-200 md:w-[90%]"
	>
		<div class="absolute -top-6 right-0 flex w-full items-end justify-end gap-1">
			<button
				class="rounded bg-primary p-1"
				on:click={() => {
					expand = !expand;
					// heat = 0;
				}}
			>
				{#if expand}
					<Minimize2 size={14} />
				{:else}
					<Maximize2 size={14} />
				{/if}
			</button>
			<button class="rounded bg-primary p-1" on:click={handleClose}>
				<X size={14} />
			</button>
		</div>
		{#if expand}
			<MessagesParser {messages} />
		{:else if inputbackup}
			<div class="h-fit max-w-full rounded-lg bg-text-secondary p-1 text-white">
				<div class="mb-1 flex items-center">
					<div class="mr-1.5 size-4 rounded-full bg-gradient-to-r from-sky-400 to-sky-300"></div>
					<div class="text-xs font-medium">you</div>
				</div>
				<p class="text-wrap text-xs">{inputbackup}</p>
			</div>
		{:else}
			<div class="w-full max-w-full rounded-lg bg-text-secondary p-1 text-sm text-white">
				Messages
			</div>
		{/if}
	</div>
	<div
		class="shadow-glow relative w-full min-w-[350px] rounded-full border-2 border-sky-950 bg-primary transition-shadow duration-200 md:w-[700px]"
	>
		<div class="flex items-center px-2 py-2">
			{#if $generating}
				<div class="animate-pulse p-2 text-cyan-400">
					<Loader2 class="animate-spin" size={20} />
				</div>
			{/if}
			<input
				type="text"
				placeholder={$generating ? 'cooking...' : 'make'}
				bind:value={inputContainer}
				bind:this={inputx}
				on:keydown={handleKeyDown}
				disabled={$generating}
				class="flex-1 bg-transparent p-2 text-sm text-gray-200 placeholder-gray-500 outline-none disabled:opacity-80"
			/>
			<div class="ml-2 flex items-center space-x-2">
				{#if $generating}
					<button
						on:click={handleStop}
						class="rounded-full bg-gradient-to-r from-sky-400 to-sky-300 p-2 transition-colors {inputContainer.trim()
							? 'text-black'
							: 'text-black'}"
					>
						<Square size={20} />
					</button>
				{:else}
					<button
						on:click={handleSend}
						class="rounded-full bg-gradient-to-r from-sky-400 to-sky-300 p-2 transition-colors {inputContainer.trim()
							? 'text-black'
							: 'text-black'}"
					>
						<SendHorizontal size={20} />
					</button>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	/* Add the glow effect with Tailwind */
	:global(.shadow-glow:focus-within)::after {
		content: '';
		position: absolute;
		top: -5px;
		left: -5px;
		right: -5px;
		bottom: -5px;
		z-index: -1;
		border-radius: inherit;
		background: linear-gradient(to right, #38bdf8, #7dd3fc); /* sky-400 to sky-300 */
		filter: blur(30px);
		opacity: 0.2;
		pointer-events: none;
	}

	:global(.shadow-glow:focus-within) {
		position: relative;
		z-index: 1;
	}
</style>
