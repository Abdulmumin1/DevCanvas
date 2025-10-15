<script>
	let items = [
		{ name: 'Potato Chips', type: 'snack' },
		{ name: 'Microchips', type: 'electronics' },
		{ name: 'Chocolate Chips', type: 'baking' }
		// Add more items as needed
	];

	let selectedFilters = [];

	function toggleFilter(type) {
		if (selectedFilters.includes(type)) {
			selectedFilters = selectedFilters.filter((filter) => filter !== type);
		} else {
			selectedFilters = [...selectedFilters, type];
		}
	}

	function filterItems() {
		return items.filter((item) => {
			if (selectedFilters.length === 0) return true;
			return selectedFilters.includes(item.type);
		});
	}
</script>

<main>
	<div class="filter-chips">
		{#each ['snack', 'electronics', 'baking'] as type}
			<div class:active={selectedFilters.includes(type)} on:click={() => toggleFilter(type)}>
				{type}
			</div>
		{/each}
	</div>
</main>

<style>
	main {
		text-align: center;
		margin: 20px;
	}

	.filter-chips {
		display: flex;
		gap: 10px;
		margin-bottom: 10px;
	}

	.filter-chips div {
		padding: 5px 10px;
		background-color: #eee;
		border-radius: 5px;
		cursor: pointer;
	}

	.filter-chips div.active {
		background-color: #4caf50;
		color: #fff;
	}

	ul {
		list-style: none;
		padding: 0;
	}

	li {
		margin: 5px;
	}
</style>
