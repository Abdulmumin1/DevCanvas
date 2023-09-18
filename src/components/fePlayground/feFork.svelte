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
		class="p-1 rounded-md cursor-pointer flex gap-2 items-center justify-center text-primary bg-green-500 px-3 py-2"
	>
		<Fa icon={faCodeFork} />
		<span class="hidden md:flex">Fork</span>
	</button>
</form>
