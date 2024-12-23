<script>
	import { faSpinner } from '@fortawesome/free-solid-svg-icons';
	import { onMount, tick } from 'svelte';
	import Fa from 'svelte-fa';
	import { slide } from 'svelte/transition';
	import PasswordInput from './passwordInput.svelte';

	let password;
	let confirmPassword;
	export let loading;
	export let submitText;

	let message;

	function validatePassword(event) {
		console.log(password, confirmPassword);
		message = null;
		if (password !== confirmPassword) {
			message = 'Passwords must match! ';
		}
		// Minimum length requirement
		if (password.length < 8) {
			message = 'Password must be at least 8 characters long.';
		}

		// At least one uppercase letter
		if (!/[A-Z]/.test(password)) {
			message = 'Password must contain at least one uppercase letter.';
		}

		// At least one lowercase letter
		if (!/[a-z]/.test(password)) {
			message = 'Password must contain at least one lowercase letter.';
		}

		// At least one digit
		if (!/\d/.test(password)) {
			message = 'Password must contain at least one digit.';
		}

		// At least one special character
		if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
			message = 'Password must contain at least one special character.';
		}

		// if (message) {
		// 	event.preventDefault();
		// }
		// If all requirements are met
		// message = null;
	}

	// if (formEl) {
	// 	tick().then(() => {
	// 		console.log(formEl);
	// 		formEl.addEventListener('submit', (event) => {
	// 			validatePassword(event, password, confirmPassword);
	// 		});
	// 	});
	// }
</script>

<div class="flex flex-col gap-2">
	<div transition:slide class="flex flex-col gap-2">
		<label for="password" class="text-sm">New password</label>
		<!-- <input
			name="password"
			type="password"
			id="password"
			bind:value={password}
			required
			class="border border-sky-200 p-1 rounded outline-none focus:outline focus:outline-sky-300"
		/> -->
		<PasswordInput id={'password'} bind:password />
	</div>

	<div transition:slide class="flex flex-col gap-2">
		<label for="password2" class="text-sm">Confirm password</label>
		<PasswordInput bind:password={confirmPassword} id={'password2'} name="confirm" />
	</div>

	{#if message}
		<p>{message}</p>
	{/if}
</div>
<button
	aria-busy={loading}
	type="submit"
	on:click={validatePassword}
	class="flex items-center justify-center gap-2 rounded-md bg-sky-300 p-2 text-black"
	>{submitText}

	{#if loading}
		<Fa icon={faSpinner} class="animate-spin" />
	{/if}
</button>
