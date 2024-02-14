<script>
	import { createEventDispatcher } from 'svelte';

	export let checked;
	let dispatch = createEventDispatcher();

	function dispatchCheckedEvent() {
		dispatch('checked', { status: checked });
	}
	export let label = 'Toggle me';
</script>

<div class="p-2 bg-white dark:bg-sky-100 dark:text-black w-full rounded-md">
	<label class="relative inline-flex items-center cursor-pointer w-full">
		<input
			type="checkbox"
			value=""
			class="sr-only peer"
			bind:checked
			on:change={dispatchCheckedEvent}
		/>
		<div
			class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-primary peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-sky-400 dark:peer-checked:bg-sky-500"
		/>
		<span class="ms-3 text-[13px] font-medium">{label}</span>
	</label>
</div>
