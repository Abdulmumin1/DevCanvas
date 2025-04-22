<script>
	import { saved_spinner, saveData } from '$lib/feEditor/store.js';
	import { current_data } from '$lib/index.js';
	import { faFloppyDisk, faSpinner } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	async function save() {
		let filtered = Object.fromEntries(
			Object.entries($current_data).filter(([key]) => key !== 'profiles')
		);
		filtered = Object.fromEntries(
			Object.entries(filtered).filter(([key]) => key !== 'profile')
		);
		filtered = Object.fromEntries(
			Object.entries(filtered).filter(([key]) => key !== 'view')
		);
		filtered = Object.fromEntries(
			Object.entries(filtered).filter(([key]) => key !== 'views')
		);

		console.log(filtered)
		await saveData(filtered);
	}
</script>

<button
	type="submit"
	class="flex h-[35px] cursor-pointer items-center justify-center gap-2 rounded bg-gradient-to-r from-sky-400 to-sky-300 px-3 py-2 text-primary"
	on:click={save}
>
	<Fa icon={faFloppyDisk} />
	<p class="hidden md:flex">Save</p>
	{#if $saved_spinner}
		<Fa icon={faSpinner} class="animate-spin" />
	{/if}
</button>
