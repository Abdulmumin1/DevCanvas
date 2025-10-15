<script>
	import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	import { getReload } from '$lib/playground/funct.js';

	// setReloadContext();

	let reload = getReload();
</script>

<button
	class="text-black"
	onclick={() => {
		$reload = !$reload;
	}}
>
	<Fa icon={faRotateRight} />
</button>
