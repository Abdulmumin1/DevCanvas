<script>
	import { user, current_data } from '$lib/index.js';
	import Fa from 'svelte-fa';
	import { faExclamationCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
	import { slide } from 'svelte/transition';

	$: loading = false;
	let email;
	const handleSubmit = async () => {
		loading = false;
	};
</script>

<form
	transition:slide
	action="?/signin"
	method="post"
	on:submit={handleSubmit}
	class=" flex flex-col justify-center items-center h-screen px-6 bg-white dark:bg-secondary-dark"
>
	<h2 class="text-3xl md:text-5xl py-11">Snippets</h2>
	<div class="flex flex-col shadow-md rounded-md p-6 gap-4 min-w-[300px] border-t border-sky-300">
		<label for="email" class="text-xl">Email</label>
		<input
			name="email"
			type="email"
			id="email"
			bind:value={email}
			class="border border-sky-200 p-2 rounded"
		/>
		<button type="submit" class="p-2 rounded-md flex items-center justify-center gap-2"
			>Signin

			{#if loading}
				<Fa icon={faSpinner} class="animate-spin" />
			{/if}
		</button>

		<span class="bg-sky-100 rounded-md p-1 px-2 gap-2 text-sm flex items-center justify-start">
			<Fa icon={faExclamationCircle} />Magik link will be sent to your inbox</span
		>
	</div>
</form>
