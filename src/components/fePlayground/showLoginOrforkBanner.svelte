<script>
	import {
		faCodeMerge,
		faExclamationTriangle,
		faRightToBracket
	} from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { page } from '$app/stores';
	import { handleRedirectURL } from '$lib/utils.js';

	import { showLoginToSave, showForkTosave } from '$lib/feEditor/store.js';
	import { onDestroy } from 'svelte';
	import { scale } from 'svelte/transition';

	let signinURL = handleRedirectURL($page.url);

	onDestroy(() => {
		showForkTosave.set(false);
		showLoginToSave.set(false);
	});
</script>

{#if $showLoginToSave}
	<div in:scale class="flex items-center justify-center gap-2 text-inherit">
		<span class="text-error"><Fa icon={faExclamationTriangle} /></span>
		<span class="flex gap-1 text-light"
			><a href="/signin" target="_blank" class="text-sky-300 underline"> Login</a>
			<span class="hidden md:flex">to save progress</span></span
		>
	</div>
{/if}

<style>
	.wobble-hor-top {
		-webkit-animation: wobble-hor-top 0.8s 3s infinite both;
		animation: wobble-hor-top 0.8s 3s infinite both;
	}
	/* ----------------------------------------------
 * Generated by Animista on 2023-9-14 23:15:0
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

	/**
 * ----------------------------------------
 * animation wobble-hor-top
 * ----------------------------------------
 */
	@-webkit-keyframes wobble-hor-top {
		0%,
		100% {
			-webkit-transform: translateX(0%);
			transform: translateX(0%);
			-webkit-transform-origin: 50% 50%;
			transform-origin: 50% 50%;
		}
		15% {
			-webkit-transform: translateX(-5px) rotate(6deg); /* Smaller translateX value */
			transform: translateX(-5px) rotate(6deg); /* Smaller translateX value */
		}
		30% {
			-webkit-transform: translateX(3px) rotate(-6deg); /* Smaller translateX value */
			transform: translateX(3px) rotate(-6deg); /* Smaller translateX value */
		}
		45% {
			-webkit-transform: translateX(-3px) rotate(3.6deg); /* Smaller translateX value */
			transform: translateX(-3px) rotate(3.6deg); /* Smaller translateX value */
		}
		60% {
			-webkit-transform: translateX(2px) rotate(-2.4deg); /* Smaller translateX value */
			transform: translateX(2px) rotate(-2.4deg); /* Smaller translateX value */
		}
		75% {
			-webkit-transform: translateX(-1px) rotate(1.2deg); /* Smaller translateX value */
			transform: translateX(-1px) rotate(1.2deg); /* Smaller translateX value */
		}
	}

	@keyframes wobble-hor-top {
		0%,
		100% {
			-webkit-transform: translateX(0%);
			transform: translateX(0%);
			-webkit-transform-origin: 50% 50%;
			transform-origin: 50% 50%;
		}
		15% {
			-webkit-transform: translateX(-5px) rotate(6deg); /* Smaller translateX value */
			transform: translateX(-5px) rotate(6deg); /* Smaller translateX value */
		}
		30% {
			-webkit-transform: translateX(3px) rotate(-6deg); /* Smaller translateX value */
			transform: translateX(3px) rotate(-6deg); /* Smaller translateX value */
		}
		45% {
			-webkit-transform: translateX(-3px) rotate(3.6deg); /* Smaller translateX value */
			transform: translateX(-3px) rotate(3.6deg); /* Smaller translateX value */
		}
		60% {
			-webkit-transform: translateX(2px) rotate(-2.4deg); /* Smaller translateX value */
			transform: translateX(2px) rotate(-2.4deg); /* Smaller translateX value */
		}
		75% {
			-webkit-transform: translateX(-1px) rotate(1.2deg); /* Smaller translateX value */
			transform: translateX(-1px) rotate(1.2deg); /* Smaller translateX value */
		}
	}

	.jello-diagonal-2 {
		-webkit-animation: jello-diagonal-2 0.8s infinite alternate-reverse both;
		animation: jello-diagonal-2 0.8s infinite alternate-reverse both;
	}

	/* ----------------------------------------------
 * Generated by Animista on 2023-9-22 9:1:29
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

	/**
 * ----------------------------------------
 * animation jello-diagonal-2
 * ----------------------------------------
 */
	@-webkit-keyframes jello-diagonal-2 {
		0% {
			-webkit-transform: skew(0deg 0deg);
			transform: skew(0deg 0deg);
		}
		30% {
			-webkit-transform: skew(-25deg -25deg);
			transform: skew(-25deg -25deg);
		}
		40% {
			-webkit-transform: skew(15deg, 15deg);
			transform: skew(15deg, 15deg);
		}
		50% {
			-webkit-transform: skew(-15deg, -15deg);
			transform: skew(-15deg, -15deg);
		}
		65% {
			-webkit-transform: skew(5deg, 5deg);
			transform: skew(5deg, 5deg);
		}
		75% {
			-webkit-transform: skew(-5deg, -5deg);
			transform: skew(-5deg, -5deg);
		}
		100% {
			-webkit-transform: skew(0deg 0deg);
			transform: skew(0deg 0deg);
		}
	}
	@keyframes jello-diagonal-2 {
		0% {
			-webkit-transform: skew(0deg 0deg);
			transform: skew(0deg 0deg);
		}
		30% {
			-webkit-transform: skew(-25deg -25deg);
			transform: skew(-25deg -25deg);
		}
		40% {
			-webkit-transform: skew(15deg, 15deg);
			transform: skew(15deg, 15deg);
		}
		50% {
			-webkit-transform: skew(-15deg, -15deg);
			transform: skew(-15deg, -15deg);
		}
		65% {
			-webkit-transform: skew(5deg, 5deg);
			transform: skew(5deg, 5deg);
		}
		75% {
			-webkit-transform: skew(-5deg, -5deg);
			transform: skew(-5deg, -5deg);
		}
		100% {
			-webkit-transform: skew(0deg 0deg);
			transform: skew(0deg 0deg);
		}
	}
</style>
