<script>
	import { getKbarState } from 'kbar-svelte-mini';

	let state = getKbarState();

	// your toggle function
	function toggleKbar() {
		$state = !$state;
	}
</script>

<button type="menu" on:click={toggleKbar} class="flex items-center justify-center gap-1 text-sm"
	>Menu <kbd
		class="mx-1 inline-block rounded-md border border-gray-300 bg-gray-100 text-black shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:shadow-md"
		>Ctrl</kbd
	><kbd
		class="mx-1 inline-block rounded-md border border-gray-300 bg-gray-100 text-black shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:shadow-md"
		>K</kbd
	></button
>

<style>
	kbd {
		display: inline-block;
		border: 1px solid #ccc;
		border-radius: 4px;
		padding: 0.1em 0.5em;
		/* margin: 0 0.2em;
		box-shadow:
			0 1px 0px rgba(0, 0, 0, 0.2),
			0 0 0 2px #fff inset;
		background-color: #f7f7f7; */
	}
</style>
