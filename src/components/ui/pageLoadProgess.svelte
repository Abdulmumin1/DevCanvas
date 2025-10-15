<script>
	import { browser } from '$app/environment';
	import { navigating } from '$app/stores';
	import { onMount } from 'svelte';

	let accentColor = '#7dd3fc';

	/**
	 * @typedef {Object} Props
	 * @property {number} [animationDuration]
	 * @property {any} [color]
	 * @property {number} [height]
	 */

	/** @type {Props} */
	let { animationDuration = 250, color = accentColor, height = 4 } = $props();

	let currentState = $state('waiting');

	let resetTimeout = undefined;

	onMount(() => {
		navigating.subscribe((n) => {
			if (n) {
				currentState = 'loading';
			} else {
				if (currentState == 'loading') {
					currentState = 'doneLoading';

					if (resetTimeout) {
						clearTimeout(resetTimeout);
						resetTimeout = undefined;
					}

					// Start cleanup animation
					resetTimeout = window.setTimeout(() => {
						currentState = 'cleanupLoading';
						resetTimeout = window.setTimeout(() => {
							currentState = 'waiting';
						}, animationDuration);
					}, animationDuration);
				}
			}
		});
	});
</script>

<div class="navigation-loader-container" style="--height: {height}px">
	<div
		class="navigation-loader-loading-bar {currentState} shadow-lg"
		style="background-color: {color}; --duration: {animationDuration}ms"
	></div>
</div>

<style>
	.navigation-loader-container {
		z-index: 99999;
		pointer-events: none;
		position: fixed;
		top: 0;
		left: 0;
		min-width: 100vw;
		width: 100%;
		height: var(--height);
	}

	.navigation-loader-container .navigation-loader-loading-bar {
		display: block;
		height: 100%;
		transition: opacity ease-in-out var(--duration);
	}

	.navigation-loader-container .navigation-loader-loading-bar.waiting {
		width: 0;
		opacity: 0;
	}

	.navigation-loader-container .navigation-loader-loading-bar.loading {
		transition: width cubic-bezier(0, 0.55, 0.45, 1) 20s;
		width: 50%;
		opacity: 1;
	}

	.navigation-loader-container .navigation-loader-loading-bar.doneLoading {
		transition: width ease-in-out var(--duration);
		width: 100%;
		opacity: 1;
	}

	.navigation-loader-container .navigation-loader-loading-bar.cleanupLoading {
		transition: opacity ease-in-out var(--duration);
		opacity: 0;
		width: 100%;
	}
</style>
