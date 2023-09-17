<script>
	import { saved_spinner, saveData } from '$lib/feEditor/store.js';
	import { current_data } from '$lib/index.js';
	import { faCodeFork, faSpinner } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
</script>

<form method="POST" action="/db/fe/fork">
	<input type="text" value={$current_data.html} name="html" class="hidden" />
	<input type="text" value={$current_data.css} name="css" class="hidden" />
	<input type="text" value={$current_data.js} name="js" class="hidden" />
	<input type="text" value={$current_data.description} name="description" class="hidden" />

	<button
		type="submit"
		class="p-1 rounded-lg cursor-pointer flex gap-2 items-center justify-center text-primary dark:text-white"
	>
		<Fa icon={faCodeFork} />
		{#if $saved_spinner}
			<Fa icon={faSpinner} class="animate-spin" />
		{/if}
	</button>
</form>
