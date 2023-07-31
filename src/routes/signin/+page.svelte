<script>
	import { redirect } from '@sveltejs/kit';
	import { supabase } from '$lib/supabase.js';
	import { user, current_data } from '$lib/index.js';
	import Fa from 'svelte-fa';
	import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

	let loading = false;
	let email;
	const handleSubmit = async () => {
		try {
			const { error } = await supabase.auth.signInWithOtp({ email });

			if (error) throw error;
			alert('Check your inbox for the magik link');
		} catch (error) {
			console.error(error);
		}
	};

	if ($user) {
		console.log($user.id);
		// window.href.location = `${$current_data.project_key}`;
	}
</script>

<form
	on:submit|preventDefault={handleSubmit}
	class=" flex flex-col justify-center items-center h-96 px-6"
>
	<h2 class="text-6xl py-11">Snippets</h2>
	<div class="flex flex-col shadow-md rounded-md p-6 gap-4 min-w-[300px]">
		<label for="email" class="text-xl">Email</label>
		<input type="email" id="email" bind:value={email} class="border border-sky-200 p-2 rounded" />
		<button type="submit" class="p-2 rounded-md">Signin</button>

		<span class="bg-sky-100 rounded-md p-1 px-2 gap-2 text-sm flex items-center justify-start">
			<Fa icon={faExclamationCircle} />Magik link will be sent to your inbox</span
		>
	</div>
</form>
