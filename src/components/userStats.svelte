<script>
	import NewSnippet from './newSnippet.svelte';
</script>

<NewSnippet />

<div class=" flex w-full gap-4 max-w-[400px]">
	<div
		class="w-full rounded-xl bg-sky-100 dark:bg-secondary-dark text-center h-[150px] flex items-center justify-center flex-col"
	>
		<div class="text-2xl">canvas</div>
		<div class="text-6xl">200</div>
		<a href="/play/try">+ New</a>
	</div>

	<div
		class="w-full rounded-xl bg-sky-100 dark:bg-secondary-dark text-center h-[150px] flex items-center justify-center flex-col"
	>
		<div class="text-2xl">Snippets</div>
		<div class="text-6xl">200</div>
	</div>
</div>
