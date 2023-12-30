<script>
	import { faTerminal } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { Pane, Splitpanes } from 'svelte-splitpanes';
	import { showjsConsole, consoleOutput } from '$lib/feEditor/store.js';
	import { onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	let currentHeight = 150; // Initial height of the overlay
	let startY, startHeight;
	let isResizing = false;

	// Function to handle resizing logic
	let ovelay;
	function startResize(event) {
		isResizing = true;
		startY = event.clientY;
		startHeight = currentHeight;

		if (browser) {
			// Attach window event listeners for mousemove and mouseup
			window.addEventListener('mousemove', resizeOverlay);
			window.addEventListener('mouseup', stopResize);
		}
	}

	function resizeOverlay(event) {
		if (isResizing) {
			const deltaY = event.clientY - startY;
			currentHeight = startHeight + -deltaY;

			ovelay.style.height = `${currentHeight}px`;
		}
	}

	function stopResize() {
		isResizing = false;

		// Remove window event listeners
		if (browser) {
			window.removeEventListener('mouseup', stopResize);
			window.removeEventListener('mousemove', resizeOverlay);
		}
	}
	// Clean up event listeners when the component is destroyed
	onDestroy(() => {
		if (browser) {
			window.removeEventListener('mousemove', resizeOverlay);
			window.removeEventListener('mouseup', stopResize);
		}
	});
</script>

<!-- 
<div class="absolute top-0 h-full w-full z-[100] text-sky-dark" class:hidden={!$showjsConsole}>
	<Splitpanes horizontal theme="my-theme">
		<Pane class={' pointer-events-none opacity-0'}>
			<div
				class="w-full opacity-0 h-full -z-50 bg-orange-100 pointer-events-none"
				role="button"
				on:click={() => {
					showjsConsole.set(false);
				}}
				tabindex="0"
			/>
		</Pane>
		<Pane>
			<div bind:this={ovelay} class:hidden={!$showjsConsole}>
				<div on:mousedown={startResize} class="handle bg-secondary-dark w-full" />
				<div class="w-full flex justify-between">
					<span class="flex items-center gap-2 text-light">
						Console <Fa icon={faTerminal} />
					</span>

					<div class="flex gap-2">
						<button
							on:click={() => {
								consoleOutput.set([]);
							}}>Clear</button
						>
						<button
							on:click={() => {
								showjsConsole.set(false);
							}}>Close</button
						>
					</div>
				</div>
				<div class="bg-black w-full h-full overflow-scroll content divide-y divide-gray-100">
					{#each $consoleOutput as log}
						<div class="w-full">
							{log}
						</div>
					{/each}
				</div>
			</div>
		</Pane>
	</Splitpanes>
</div> -->

<div class="overlay overflow-scroll" bind:this={ovelay} class:hidden={!$showjsConsole}>
	<div on:mousedown={startResize} class="handle bg-secondary-dark w-full" />
	<div class="w-full flex justify-between">
		<span class="flex items-center gap-2 text-light">
			Console <Fa icon={faTerminal} />
		</span>

		<div class="flex gap-2 text-white">
			<button
				on:click={() => {
					consoleOutput.set([]);
				}}>Clear</button
			>
			<button
				on:click={() => {
					showjsConsole.set(false);
				}}>Close</button
			>
		</div>
	</div>
	<div class="bg-black w-full h-full text-white overflow-scroll content divide-y divide-gray-100">
		{#each $consoleOutput as log}
			<div class="w-full">
				{log}
			</div>
		{/each}
	</div>
</div>

<style>
	.overlay {
		position: absolute;
		bottom: 0;
		z-index: 20;
		width: 100%;
		background-color: rgb(25 25 25);
		overflow: hidden;
		max-height: 90%;
		transition: height 0 ease-in-out;
	}

	.content {
		padding: 10px;
	}

	.handle {
		width: 100%;
		height: 10px;
		cursor: ns-resize; /* Vertical resize cursor */
		user-select: none; /* Prevent text selection while dragging */
	}
</style>
