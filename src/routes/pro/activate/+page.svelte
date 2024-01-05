<script>
	import InnerNav from '$components/innerNav.svelte';
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import Fa from 'svelte-fa';
	import { faSpinner } from '@fortawesome/free-solid-svg-icons';
	import { scale } from 'svelte/transition';

	export let form;

	let submitted = false;
	let showMessage = false;

	const submitStatus = () => {
		submitted = true;
		return async ({ update }) => {
			submitted = false;
			await update();
		};
	};

	$: if (form?.errors) {
		let interval = 100;
		form.errors.forEach((err) => {
			showMessage = err.message;
		});
	}
	let license = $page.url.searchParams.get('license');
</script>

<svelte:head>
	<title>Activate license key</title>
</svelte:head>

<div class="h-full flex flex-col">
	<!-- <InnerNav /> -->

	<div class="h-[100dvh] flex items-center justify-center">
		<div
			class="w-full h-full bg-black text-white dark:bg-secondary-dark hidden gap-6 md:flex flex-col items-center justify-center"
		>
			<h1 class="text-[5rem] leading-none">Activate <br /> License <br /> Key</h1>
			<div>
				<a href="/dashboard" class="bg-sky-200 px-3 py-2 rounded-2xl text-black font-thin"
					>Go to dashboard
				</a>
			</div>
		</div>
		<div class="flex flex-col w-full items-center gap-4">
			<form
				class="flex flex-col gap-4 w-full px-12"
				use:enhance={submitStatus}
				action="?/update_license"
				method="post"
			>
				<label for="license">
					<span class="text-3xl font-semibold">Enter license key</span>
				</label>
				<div class="flex gap-2">
					<input
						type="text"
						name="license"
						id="license"
						value={license}
						class="p-2 border-2 rounded-lg border-sky-500 w-full dark:bg-secondary-dark"
					/>
					<button
						class="bg-sky-300 p-1 px-2 rounded-lg dark:text-black gap-2 flex items-center justify-center"
						type="submit"
						on:click={() => {
							showMessage = false;
						}}
					>
						Activate
						{#if submitted}
							<span class="animate-spin">
								<Fa icon={faSpinner} />
							</span>
						{/if}
					</button>
				</div>
			</form>
			{#if showMessage}
				<div in:scale class="bg-red-400 p-2 rounded-lg">{showMessage}</div>
			{/if}

			<div class="absolute bottom-3">
				Need <a href="mailto:abdulmuminyqn@gmail.com" class="text-sky-400">help?</a>
			</div>
		</div>
	</div>
</div>
