<script>
	import { faTerminal } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { showjsConsole, consoleOutput } from '$lib/feEditor/store.js';
	import { spring } from 'svelte/motion';

	let currentHeight = 300; // Initial height of the overlay
	let startY, startHeight;
	let isResizing = false;

	// Function to handle resizing logic
	let ovelay;

	showjsConsole.subscribe(() => {
		if (ovelay) {
			ovelay.transform = `translate3d(0, 0, 0)`;
		}
	});
	function drag(node) {
		let x;
		let y;

		const coords = spring({
			x: 0,
			y: 0
		});

		coords.subscribe((current) => {
			node.style.transform = `translate3d(0px, ${current.y}px, 0)`;
		});

		node.addEventListener('mousedown', mousedown);

		function mousedown(event) {
			x = event.clientX;
			y = event.clientY;

			window.addEventListener('mouseup', mouseup);
			window.addEventListener('mousemove', mousemove);
		}

		function mouseup() {
			window.removeEventListener('mouseup', mouseup);
			window.removeEventListener('mousemove', mousemove);

			// coords.update(() => {
			// 	return { x: 0, y: 0 };
			// });

			// node.dispatchEvent(
			// 	new CustomEvent('dragstop', {
			// 		detail: { x, y }
			// 	})
			// );

			// x = 0;
			// y = 0;
		}

		function mousemove(event) {
			const dx = event.clientX - x;
			const dy = event.clientY - y;

			x = event.clientX;
			y = event.clientY;

			coords.update((current) => {
				return {
					x: current.x + dx,
					y: current.y + dy
				};
			});
		}
	}
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

<div
	class="overlay overflow-scroll"
	bind:this={ovelay}
	class:hidden={!$showjsConsole}
	style="height: {currentHeight}px;"
	id="jsconsole"
	use:drag
>
	<!-- on:dragstop={(event) => {
		if (event.detail.x > 300) {
			currentHeight = event.details.x;
		}
	}} -->
	<div class="handle w-full" />
	<div class="flex w-full justify-between">
		<span class="flex items-center gap-2 text-white">
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
	<div class="content h-full w-full divide-y divide-gray-100 overflow-scroll bg-black text-white">
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
		resize: vertical;
	}

	.content {
		padding: 10px;
	}

	.handle {
		width: 100%;
		height: 30px;
		cursor: ns-resize; /* Vertical resize cursor */
		user-select: none; /* Prevent text selection while dragging */
		background-color: orange;
	}
</style>
