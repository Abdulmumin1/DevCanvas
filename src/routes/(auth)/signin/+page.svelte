<script>
	import Fa from 'svelte-fa';
	import { faExclamationCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
	import { slide } from 'svelte/transition';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import PasswordInput from '$components/auth/passwordInput.svelte';
	let email;
	let password;
	let loading = false;
	let completed = false;
	let usePassword = false;
	let errMessage;

	// export let form;

	const handleSubmit = () => {
		loading = true;

		return async ({ update, result }) => {
			loading = false;
			completed = true;
			console.log(result);
			if (result.status == 400) {
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
	<title>Sign In - DevCanvas</title>

	<meta name="description" content={'Sign in to DevCanvas - Prototype with EASE!'} />

	<!-- Facebook Meta Tags -->
	<meta property="og:url" content={'Sign in to DevCanvas - Prototype with EASE!'} />
	<meta property="og:type" content="website" />
	<meta property="og:description" content={'Sign in to DevCanvas - Prototype with EASE!'} />
	<meta property="og:image" content={'Sign in to DevCanvas - Prototype with EASE!'} />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content="devcanvas.art" />
	<meta property="twitter:url" content={'Sign in to DevCanvas - Prototype with EASE!'} />
	<meta name="twitter:description" content={'Sign in to DevCanvas - Prototype with EASE!'} />
	<meta name="twitter:image" content={'Sign in to DevCanvas - Prototype with EASE!'} />
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
		<h2 class="text-center text-3xl text-white md:text-5xl">
			Dev<span class="text-sky-500">Canvas</span>
		</h2>
	</div>
	<form
		transition:slide
		action="?/signin"
		method="post"
		use:enhance={handleSubmit}
		class="mt-2 flex w-full max-w-xl flex-1 flex-col gap-4 rounded-lg p-6 md:p-6 md:px-16"
	>
		<h2 class="text-center text-2xl">Sign In</h2>
		<div class="flex flex-col gap-3">
			<input
				type="text"
				name="redirectTo"
				value={$page.url.searchParams.get('redirectTo')}
				readonly
				class="hidden"
			/>
			<div transition:slide class="flex flex-col gap-2">
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
			{#if !usePassword}
				<div class="flex flex-col gap-2" transition:slide>
					<label for="password" class="text-sm">Password</label>
					<!-- <PasswordInput/ -->
					<PasswordInput id="password" bind:password />
				</div>
			{/if}
			<button
				aria-busy={loading}
				type="submit"
				class="flex items-center justify-center gap-2 rounded-md bg-sky-500 p-2 text-black"
				>Login

				{#if loading}
					<Fa icon={faSpinner} class="animate-spin" />
				{/if}
			</button>
			<label class="flex items-center justify-start gap-2 rounded-md bg-light p-3 text-sm">
				<input type="checkbox" name="usePassword" id="" bind:checked={usePassword} />
				Use Magik Link
			</label>

			{#if usePassword}
				{#if !completed}
					<span
						class="flex items-center justify-start gap-2 rounded-md bg-sky-100 p-1 px-2 text-sm"
					>
						<Fa icon={faExclamationCircle} />Magik link will be sent to your inbox</span
					>
				{:else}
					<span
						class="flex items-center justify-start gap-2 rounded-md bg-green-400 p-1 px-2 text-sm"
					>
						<span class="wobble-hor-top"> <Fa icon={faExclamationCircle} /></span> Magik link sent to
						your inbox</span
					>
				{/if}
			{/if}
		</div>
		<p>Don't have an account? <a href="/signup">SignUp</a></p>
		<a href="recovery/forgot">Forgot password?</a>

		{#if errMessage}
			<p transition:slide={{ duration: 200 }} class="w-full rounded-md bg-error p-2">
				{errMessage}
			</p>
		{/if}
	</form>
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
