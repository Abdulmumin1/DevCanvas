<script>
	// import { user, current_data } from '$lib/stores/index.js';
	import Fa from 'svelte-fa';
	import { faExclamationCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
	import { faGithub } from '@fortawesome/free-brands-svg-icons';
	import { slide } from 'svelte/transition';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import PasswordInput from '$components/auth/passwordInput.svelte';

	let email;
	let password = '';
	let cfP;

	let loading = false;
	let completed = false;
	let usePassword = false;
	let msg;

	function validatePassword() {
		// console.log(password, confirmPassword);
		// Minimum length requirement
		if (password.length < 8) {
			return 'Password must be at least 8 characters long.';
		}

		// At least one uppercase letter
		if (!/[A-Z]/.test(password)) {
			return 'Password must contain at least one uppercase letter.';
		}

		// At least one lowercase letter
		if (!/[a-z]/.test(password)) {
			return 'Password must contain at least one lowercase letter.';
		}

		// At least one digit
		if (!/\d/.test(password)) {
			return 'Password must contain at least one digit.';
		}

		// At least one special character
		if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
			return 'Password must contain at least one special character.';
		}

		if (password !== cfP) {
			return 'Passwords must match! ';
		}

		return null;

		// if (message) {
		// 	event.preventDefault();
		// }
		// If all requirements are met
		// message = null;
	}

	const handleSubmit = ({ cancel }) => {
		msg = validatePassword();
		if (msg && usePassword) {
			cancel();
			return;
		}
		loading = true;
		return async ({ update, result }) => {
			loading = false;
			if (result.type == 'success') {
				completed = true;
			} else {
				errMessage = result.data.message;
				setTimeout(() => {
					errMessage = '';
				}, 3000);
			}
			await update();
		};
	};
</script>

<svelte:head>
	<title>Sign Up - DevCanvas</title>

	<meta name="description" content={'Sign up for DevCanvas - Prototype with EASE!'} />

	<!-- Facebook Meta Tags -->
	<meta property="og:url" content={'Sign up for DevCanvas - Prototype with EASE!'} />
	<meta property="og:type" content="website" />
	<meta property="og:description" content={'Sign up for DevCanvas - Prototype with EASE!'} />
	<meta property="og:image" content={'Sign up for DevCanvas - Prototype with EASE!'} />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content="devcanvas.art" />
	<meta property="twitter:url" content={'Sign up for DevCanvas - Prototype with EASE!'} />
	<meta name="twitter:description" content={'Sign up for DevCanvas - Prototype with EASE!'} />
	<meta name="twitter:image" content={'Sign up for DevCanvas - Prototype with EASE!'} />
	<meta
		name="keywords"
		content="css, html, css art, css animation, code snippet, javascript animations, animation with html/css,"
	/>
</svelte:head>

<div class="flex h-screen items-center justify-center bg-white text-primary">
	<!-- <InnerNav /> -->

	<div
		class="hidden h-full flex-col items-center justify-center bg-secondary-dark md:flex md:flex-1"
	>
		<img src="/logo.svg" class=" h-24 rounded-3xl" alt="DevCanvas Logo" />
		<a href="/" class="text-center text-3xl text-white md:text-5xl">
			Dev<span class="text-sky-500">Canvas</span>
		</a>
	</div>
	<div class="max-w-xl flex-1 space-y-3 p-6 md:p-6 md:px-16">
		<form
			transition:slide
			action="?/signup"
			method="post"
			use:enhance={handleSubmit}
			class="mt-2 flex w-full flex-1 flex-col gap-4 rounded-lg"
		>
			<h1 class="text-center text-2xl">Sign Up</h1>

			<div class="flex flex-col gap-3">
				<input
					type="text"
					name="redirectTo"
					tabindex="-1"
					value={$page.url.searchParams.get('redirectTo')}
					readonly
					class="hidden"
				/>
				<div class="flex flex-col gap-2">
					<label for="email" class="text-sm">Email</label>
					<input
						name="email"
						type="email"
						id="email"
						bind:value={email}
						required
						class="rounded-lg border border-sky-200 px-3 py-2 outline outline-2 outline-sky-200 focus:outline-4 focus:outline-sky-300"
					/>
				</div>
				{#if usePassword}
					<div class="flex flex-col gap-2" transition:slide>
						<label for="password" class="text-sm">Password</label>
						<PasswordInput bind:password id="password" />

						<label for="cp" class="text-sm">Confirm</label>
						<PasswordInput bind:password={cfP} id="cp" name="confirm" />
					</div>
					{#if msg}
						{msg}
					{/if}
				{/if}

				<button
					aria-busy={loading}
					type="submit"
					class="flex items-center justify-center gap-2 rounded-md bg-sky-300 p-2 text-black"
					>SignUp

					{#if loading}
						<Fa icon={faSpinner} class="animate-spin" />
					{/if}
				</button>
				<label class="flex items-center justify-start gap-2 rounded-md bg-gray-100 p-2 text-xs">
					<input
						type="checkbox"
						name="usePassword"
						id=""
						bind:checked={usePassword}
						class="accne"
					/>
					Use Password Instead
				</label>

				{#if !usePassword}
					{#if !completed}
						<span
							class="flex items-center justify-start gap-2 rounded-md bg-gray-100 p-1 px-2 text-sm"
						>
							<Fa icon={faExclamationCircle} />Magik link will be sent to your inbox</span
						>
					{:else}
						<span
							class="flex items-center justify-start gap-2 rounded-md bg-green-400 p-1 px-2 text-sm"
						>
							<span class="wobble-hor-top"> <Fa icon={faExclamationCircle} /></span> Magik link sent
							to your inbox</span
						>
					{/if}
				{/if}
			</div>
		</form>

		<form action="?/github" method="post">
			<div class="my-4 flex items-center gap-2">
				<div class="flex-grow border-t border-gray-300"></div>
				<span class="text-sm text-gray-500">OR</span>
				<div class="flex-grow border-t border-gray-300"></div>
			</div>

			<button
				class="my-3 flex w-full items-center justify-center gap-2 rounded border p-2 hover:bg-black/20"
				type="submit"
			>
				Continue with github <Fa icon={faGithub} />
			</button>
		</form>
		<p class="text-sm">Account already? <a href="/signin">SignIn</a></p>
	</div>
</div>

<style>
	a {
		@apply text-sky-600;
	}
	.wobble-hor-top {
		-webkit-animation: wobble-hor-top 0.8s 3000ms infinite both;
		animation: wobble-hor-top 0.8s 3000ms infinite both;
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
</style>
