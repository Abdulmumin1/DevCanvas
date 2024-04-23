<script>
	import { faGear } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { showModal } from '$lib/feEditor/store.js';

	function openModal() {
		showModal.set(true);
		console.log('this should be it');
	}
</script>

<button on:click={openModal} class="z-50 cursor-pointer hover:scale-105 hover:opacity-80"
	><Fa icon={faGear} />
</button>
