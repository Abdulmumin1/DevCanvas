<script>
	import { saved_spinner, saveData } from '$lib/feEditor/store.js';
	import { current_data } from '$lib/index.js';
	import { faFloppyDisk, faSpinner } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
</script>

<button
	type="submit"
	class="bg-sky-400 px-3 py-2 rounded cursor-pointer flex gap-2 items-center justify-center text-primary"
	on:click={() => {
		saveData($current_data);
	}}
>
	<Fa icon={faFloppyDisk} />
	<p class="hidden md:flex">Save</p>
	{#if $saved_spinner}
		<Fa icon={faSpinner} class="animate-spin" />
	{/if}
</button>
