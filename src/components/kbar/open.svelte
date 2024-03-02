<script>
	import { getKbarState } from 'kbar-svelte-mini';

	let state = getKbarState();

	// your toggle function
	function toggleKbar() {
		$state = !$state;
	}
</script>

<button type="menu" on:click={toggleKbar} class="bg-secondark-dark">Menu ctrl+k</button>
