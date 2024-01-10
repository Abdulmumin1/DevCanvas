<script>
	import { user, current_data } from '$lib/index.js';
	import Fa from 'svelte-fa';
	import {
		faExclamationCircle,
		faIcons,
		faSpinner,
		faUpRightAndDownLeftFromCenter,
		faUpRightFromSquare,
		faUserEdit
	} from '@fortawesome/free-solid-svg-icons';
	import { fade, scale, slide } from 'svelte/transition';
	import InnerNav from '../../components/innerNav.svelte';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { invalidateAll } from '$app/navigation';
	import NavWrapper from '../../components/snips/navWrapper.svelte';
	import { json } from 'svelte-highlight/languages';
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

	let details = data.details;
</script>

<svelte:head>
	<meta name="robots" content="index, follow" />
	<title>Update profile</title>
</svelte:head>

<NavWrapper noSearch={true}>
	<div class="h-full flex items-center">
		<div class="bg-white rounded px-4 md:py-9 dark:bg-primary py-12 pb-8 mb-4 max-w-[700px]">
			<h2 class="flex gap-2 text-4xl text-gray-800 dark:text-white mb-4">
				Update Your Profile <span
					><a href="/{details?.username}"><Fa icon={faUpRightFromSquare} /></a></span
				>
			</h2>
			<form action={data.action} use:enhance={handleSubmit} method="POST">
				<!-- User Name -->
				<div class="mb-4">
					<label for="username" class="block text-gray-700 dark:text-white text-sm md:text-lg mb-2">
						Username
					</label>
					<input
						type="text"
						id="username"
						name="username"
						class="earance-none dark:bg-secondary-dark dark:border-0 border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:line"
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
					<label for="email" class="block text-gray-700 dark:text-white text-sm md:text-lg mb-2">
						<i class="fas fa-envelope mr-1" /> Email
					</label>
					<input
						type="email"
						id="email"
						name="email"
						class="earance-none dark:bg-secondary-dark dark:border-0 border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:line"
						placeholder="Email"
						value={details?.email}
						readonly
					/>
				</div>
				<!-- Full Name -->
				<div class="mb-4">
					<label for="fullname" class="block text-gray-700 dark:text-white text-sm md:text-lg mb-2">
						<i class="fas fa-user mr-1" /> Full Name
					</label>
					<input
						type="text"
						id="fullname"
						name="fullname"
						class="earance-none dark:bg-secondary-dark dark:border-0 border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:line"
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
					<span class="block text-gray-700 dark:text-white text-sm md:text-lg mb-2">
						<i class="fas fa-share-alt mr-1" /> Social Media Links
					</span>
					<div class="flex gap-2">
						<!-- Facebook -->
						<div class="w-1/2">
							<label
								for="github"
								class="block text-gray-700 dark:text-white text-sm md:text-lg mb-2">Github</label
							>
							<input
								type="text"
								id="github"
								name="github"
								class="earance-none dark:bg-secondary-dark dark:border-0 border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:line"
								placeholder="Username"
								value={details?.socials?.github}
							/>
						</div>
						<!-- Twitter -->
						<div class="w-1/2">
							<label
								for="twitter"
								class="block text-gray-700 dark:text-white text-sm md:text-lg mb-2">Twitter</label
							>
							<input
								type="text"
								id="twitter"
								name="twitter"
								class="earance-none dark:bg-secondary-dark dark:border-0 border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:line"
								placeholder="@username"
								value={details?.socials?.twitter}
							/>
						</div>

						<div class="w-1/2">
							<label
								for="instagram"
								class="block text-gray-700 dark:text-white text-sm md:text-lg mb-2">Instagram</label
							>
							<input
								type="text"
								id="instagram"
								name="instagram"
								class="earance-none dark:bg-secondary-dark dark:border-0 border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:line"
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
						class="bg-sky-500 text-primary hover:bg-sky-600 py-2 px-4 rounded focus:outline-none focus:line flex gap-2 items-center justify-center"
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
					class="bg-green-400 w-fit py-4 text-black h-6 mt-2 rounded-md p-2 gap-2 text-sm md:text-base flex items-center justify-start"
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
					class="bg-error w-fit py-4 text-black h-6 mt-2 rounded-md p-2 gap-2 text-sm md:text-base flex items-center justify-start"
				>
					<span> <Fa icon={faExclamationCircle} /></span>
					<p>{serverErr.message}</p>
				</div>
			{/if}
		</div>
	</div>
</NavWrapper>
