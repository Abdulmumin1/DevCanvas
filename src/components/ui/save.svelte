<script>
	import { current_data, saveData, saved_spinner } from '$lib/stores/index.js';
	import { faFloppyDisk, faSpinner } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
</script>

<button
	type="submit"
	class="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-sky-400 px-3 py-2"
	onclick={() => {
		saveData($current_data);
	}}
>
	<Fa icon={faFloppyDisk} />
	Save
	{#if $saved_spinner}
		<Fa icon={faSpinner} class="animate-spin" />
	{/if}
</button>
