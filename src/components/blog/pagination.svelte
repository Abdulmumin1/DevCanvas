<script>
	export let currentPage;
	export let totalPages;
	export let onPageChange;

	function changePage(newPage) {
		if (newPage >= 1 && newPage <= totalPages) {
			onPageChange(newPage);
		}
	}

	$: pages = Array.from({ length: totalPages }, (_, i) => i + 1);
</script>

<div class="my-8 flex items-center justify-center space-x-2">
	<button
		on:click={() => changePage(currentPage - 1)}
		disabled={currentPage === 1}
		class="rounded-md bg-sky-300 px-4 py-2 text-black disabled:cursor-not-allowed disabled:bg-gray-100 dark:disabled:bg-primary dark:disabled:text-gray-100"
	>
		Previous
	</button>

	{#each pages as page}
		<button
			on:click={() => changePage(page)}
			class="rounded-md px-4 py-2 {currentPage === page
				? 'bg-sky-300 text-black'
				: 'border border-sky-300 bg-white text-sky-300 dark:bg-secondary-dark'}"
		>
			{page}
		</button>
	{/each}

	<button
		on:click={() => changePage(currentPage + 1)}
		disabled={currentPage === totalPages}
		class="rounded-md bg-sky-300 px-4 py-2 text-black disabled:cursor-not-allowed disabled:bg-gray-100 dark:disabled:bg-primary dark:disabled:text-gray-100"
	>
		Next
	</button>
</div>
