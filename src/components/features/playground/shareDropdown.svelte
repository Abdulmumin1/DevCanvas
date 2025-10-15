<script>
	let showOptions = $state(false);

	function toggleShareOptions() {
		showOptions = !showOptions;
	}

	function closeShareOptions() {
		showOptions = false;
	}
</script>

<div class="share-dropdown" onmouseleave={closeShareOptions}>
	<button class="share-button" onclick={toggleShareOptions}>Share</button>
	<div class="share-options absolute bottom-0 right-0" class:hidden={!showOptions}>
		<a href="#" class="share-option">Facebook</a>
		<a href="#" class="share-option">Twitter</a>
		<a href="#" class="share-option">LinkedIn</a>
		<!-- Add more social media options as needed -->
	</div>
</div>

<style>
	.share-dropdown {
		position: relative;
		display: inline-block;
	}

	.share-button {
		background-color: #4caf50;
		color: white;
		padding: 10px;
		border: none;
		cursor: pointer;
		border-radius: 5px;
	}

	.share-options {
		position: absolute;
		background-color: #f9f9f9;
		min-width: 160px;
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
		z-index: 1;
		border-radius: 5px;
	}

	.share-option {
		padding: 12px 16px;
		text-decoration: none;
		display: block;
		color: #333;
		transition: background-color 0.3s;
	}

	.share-option:hover {
		background-color: #ddd;
	}
</style>
