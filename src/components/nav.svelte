<script>
	import { current_data, user, getLastPartOfUrl } from '$lib/index.js';
	import { supabase } from '$lib/supabase.js';
	// Function to update the store value

	async function save() {
		console.log($current_data.id);
		const { error } = await supabase
			.from('snips')
			.update({ code: $current_data.code, lang: $current_data.lang })
			.eq('id', $current_data.id);
		if (error) {
			console.log(error);
		}
	}
</script>

<nav class=" w-full">
	<ul class="w-full flex justify-between items-center p-4 shadow-xl">
		<li class="text-2xl">Snippets</li>
		<ul class="flex gap-3">
			<button type="submit" class="bg-sky-400 px-4 py-2 rounded-xl cursor-pointer" on:click={save}
				>Save</button
			>
			<li class="bg-sky-300 px-4 py-2 rounded-xl cursor-pointer">Share</li>
			{#if $user}
				<li class="bg-sky-300 px-4 py-2 rounded-xl cursor-pointer">Logout</li>
			{/if}
		</ul>
	</ul>
</nav>
