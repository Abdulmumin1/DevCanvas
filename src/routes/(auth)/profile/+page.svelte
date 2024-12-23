<script>
	import Fa from 'svelte-fa';
	import {
		faArrowRight,
		faExclamationCircle,
		faRightLong,
		faSpinner,
		faUpRightFromSquare
	} from '@fortawesome/free-solid-svg-icons';
	import { slide } from 'svelte/transition';
	import { enhance } from '$app/forms';
	import NavWrapper from '$components/snips/navWrapper.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	import { getProfile } from '$lib/index.js';

	let loading = false;
	let serverErr = false;
	let email;
	let completed = false;
	const handleSubmit = () => {
		loading = true;

		return async ({ update, result }) => {
			// console.log(result);
			loading = false;
			console.log(result.status);
			if (result.status == 200) {
				completed = true;
				// data = result.data;
				if (mesa) {
					console.log($page.url.searchParams.get('next'));
					window.location.href = $page.url.searchParams.get('next') ?? '/dashboard';
				}
				setTimeout(() => {
					completed = false;
				}, 3000);
			} else if (result.status == 402) {
				serverErr = result.data;
				setTimeout(() => {
					serverErr = false;
				}, 3000);
			} else if (result.status == 400) {
				form = result.data;
			}
			// details = result.data;
			// console.log(details.username, details);
			// await update();
			// invalidateAll();
		};
	};

	export let data;
	export let form;
	let mesa = $page.url.searchParams.get('rt');
	let details = data.details;
</script>

<svelte:head>
	<meta name="robots" content="index, follow" />
	<title>Update profile</title>
</svelte:head>

<NavWrapper noSearch={true}>
	<div class="flex h-full min-h-[90vh] flex-col items-center justify-center">
		{#if mesa}
			<div class="my-12">
				<p class="flex items-center justify-start gap-2 rounded-md p-1 px-2 text-xl">
					<span class="wobble-hor-top"> <Fa icon={faExclamationCircle} /></span> Sorry to interrupt,
					we shipped too fast!
				</p>
				<p>
					Manually click the <strong>"Update Profile"</strong> button to <strong>Continue</strong>
				</p>
			</div>
		{/if}
		<div class="mb-4 max-w-[700px] rounded-2xl bg-gray-100 p-8 pt-20 dark:bg-secondary-dark">
			<h2 class="mb-4 flex gap-2 text-4xl font-bold text-gray-800 dark:text-white">
				Profile <span
					><a href="/{details?.username}"><Fa class="text-sm" icon={faUpRightFromSquare} /></a
					></span
				>
			</h2>

			<form action={data.action} use:enhance={handleSubmit} method="POST">
				<!-- User Name -->
				<div class="mb-4">
					<label for="username" class="mb-2 block text-sm text-gray-700 dark:text-white md:text-lg">
						Username
					</label>
					<input
						type="text"
						id="username"
						name="username"
						class="earance-none focus:line w-full rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none dark:border-0 dark:bg-primary dark:text-white"
						placeholder="Username"
						value={details?.username}
						class:border-error={form?.errors?.username}
					/>
					{#if form?.errors?.username}
						<p class="border-error">Invalid Username</p>
					{/if}
				</div>
				<!-- Email -->
				<div class="mb-4">
					<label for="email" class="mb-2 block text-sm text-gray-700 dark:text-white md:text-lg">
						<i class="fas fa-envelope mr-1" /> Email
					</label>
					<input
						type="email"
						id="email"
						name="email"
						class="earance-none focus:line w-full rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none dark:border-0 dark:bg-primary dark:text-white"
						placeholder="Email"
						value={details?.email}
						readonly
					/>
				</div>

				<!-- Full Name -->
				<div class="mb-4">
					<label for="fullname" class="mb-2 block text-sm text-gray-700 dark:text-white md:text-lg">
						<i class="fas fa-user mr-1" /> Full Name
					</label>
					<input
						type="text"
						id="fullname"
						name="fullname"
						class="earance-none focus:line w-full rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none dark:border-0 dark:bg-primary dark:text-white"
						placeholder="Full Name"
						value={details?.name}
						class:border-error={form?.errors?.fullname}
					/>
					{#if form?.errors?.fullname}
						<p class="border-error">Fullname is required</p>
					{/if}
				</div>
				<!-- Social Media Links -->
				<div class="mb-4">
					<span class="mb-2 block text-sm text-gray-700 dark:text-white md:text-lg">
						<i class="fas fa-share-alt mr-1" /> Social Media Links
					</span>
					<div class="flex gap-2">
						<!-- Facebook -->
						<div class="w-1/2">
							<label
								for="github"
								class="mb-2 block text-sm text-gray-700 dark:text-white md:text-lg">Github</label
							>
							<input
								type="text"
								id="github"
								name="github"
								class="earance-none focus:line w-full rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none dark:border-0 dark:bg-primary dark:text-white"
								placeholder="Username"
								value={details?.socials?.github}
							/>
						</div>
						<!-- Twitter -->
						<div class="w-1/2">
							<label
								for="twitter"
								class="mb-2 block text-sm text-gray-700 dark:text-white md:text-lg">Twitter</label
							>
							<input
								type="text"
								id="twitter"
								name="twitter"
								class="earance-none focus:line w-full rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none dark:border-0 dark:bg-primary dark:text-white"
								placeholder="@username"
								value={details?.socials?.twitter}
							/>
						</div>

						<div class="w-1/2">
							<label
								for="instagram"
								class="mb-2 block text-sm text-gray-700 dark:text-white md:text-lg">Instagram</label
							>
							<input
								type="text"
								id="instagram"
								name="instagram"
								class="earance-none focus:line w-full rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none dark:border-0 dark:bg-primary dark:text-white"
								placeholder="username"
								value={details?.socials?.instagram}
							/>
						</div>
					</div>
				</div>

				<!-- Submit Button -->
				<div class="flex items-center justify-between">
					<button
						type="submit"
						class="focus:line flex items-center justify-center gap-2 rounded bg-sky-500 px-4 py-2 text-primary hover:bg-sky-600 focus:outline-none"
					>
						{#if loading}
							<Fa icon={faSpinner} class="animate-spin" />
						{/if} Update Profile
					</button>
				</div>
			</form>
			{#if completed}
				<div
					in:slide={{ axis: 'y' }}
					out:slide
					class="mt-2 flex h-6 w-fit items-center justify-start gap-2 rounded-md bg-green-400 p-2 py-4 text-sm text-black md:text-base"
				>
					<span> <Fa icon={faExclamationCircle} /></span><span transition:slide
						>profile updated</span
					>
				</div>
			{/if}
			{#if serverErr}
				<div
					in:slide={{ axis: 'y' }}
					out:slide
					class="mt-2 flex h-6 w-fit items-center justify-start gap-2 rounded-md bg-error p-2 py-4 text-sm text-black md:text-base"
				>
					<span> <Fa icon={faExclamationCircle} /></span>
					<p>{serverErr.message}</p>
				</div>
			{/if}

			<div class="mt-6 w-fit rounded-2xl bg-gray-50 p-3 dark:bg-primary">
				<a href="/recovery/reset" class="flex items-center gap-2"
					>Reset password <Fa icon={faArrowRight} /></a
				>
			</div>
		</div>
	</div>
</NavWrapper>
