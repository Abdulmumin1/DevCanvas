<script>
	import { run } from 'svelte/legacy';

	import InnerNav from '$components/ui/innerNav.svelte';
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import Fa from 'svelte-fa';
	import { faSpinner } from '@fortawesome/free-solid-svg-icons';
	import { scale } from 'svelte/transition';

	let { form } = $props();

	let submitted = $state(false);
	let showMessage = $state(false);

	const submitStatus = () => {
		submitted = true;
		return async ({ update }) => {
			submitted = false;
			await update();
		};
	};

	run(() => {
		if (form?.errors) {
			let interval = 100;
			form.errors.forEach((err) => {
				showMessage = err.message;
			});
		}
	});
	let license = $page.url.searchParams.get('license');
</script>

<svelte:head>
	<title>Activate license key</title>
</svelte:head>

<div class="flex h-full flex-col">
	<!-- <InnerNav /> -->

	<div class="flex h-[100dvh] items-center justify-center">
		<div
			class="hidden h-full w-full flex-col items-center justify-center gap-6 bg-black text-white dark:bg-secondary-dark md:flex"
		>
			<h1 class="text-[5rem] leading-none">Activate <br /> License <br /> Key</h1>
			<div>
				<a href="/dashboard" class="rounded-2xl bg-sky-200 px-3 py-2 font-thin text-black"
					>Go to dashboard
				</a>
			</div>
		</div>
		<div class="flex w-full flex-col items-center gap-4">
			<form
				class="flex w-full flex-col gap-4 px-12"
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
						class="w-full rounded-lg border-2 border-sky-500 p-2 dark:bg-secondary-dark"
					/>
					<button
						class="flex items-center justify-center gap-2 rounded-lg bg-sky-300 p-1 px-2 dark:text-black"
						type="submit"
						onclick={() => {
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
				<div in:scale class="rounded-lg bg-red-400 p-2">{showMessage}</div>
			{/if}

			<div class="absolute bottom-3">
				Need <a href="mailto:abdulmuminyqn@gmail.com" class="text-sky-400">help?</a>
			</div>
		</div>
	</div>
</div>
