<script>
	import { current_data, user, previewMode, clickOutside } from '$lib/index.js';
	import { supabase } from '$lib/supabase.js';
	import { faEllipsis, faSpinner } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	$: spinner = false;
	async function save() {
		spinner = true;
		console.log($user.id);
		console.log($current_data.id);
		const { error } = await supabase
			.from('snips')
			.update({ code: $current_data.code, lang: $current_data.lang })
			.eq('id', $current_data.id);
		if (error) {
			console.log(error);
		}
		spinner = false;
		previewMode.set(true);
	}
</script>

<button
	type="submit"
	class="bg-sky-400 px-3 py-2 shadow-sm rounded-lg cursor-pointer flex gap-2 items-center justify-center"
	on:click={save}
	>Save
	{#if spinner}
		<Fa icon={faSpinner} class="animate-spin" />
	{/if}
</button>
