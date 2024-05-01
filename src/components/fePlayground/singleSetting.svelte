<script>
	import { createEventDispatcher } from 'svelte';

	export let checked;
	let dispatch = createEventDispatcher();

	function dispatchCheckedEvent() {
		dispatch('checked', { status: checked });
	}
	export let label = 'Toggle me';
</script>

<div class="w-full rounded-md bg-white p-2 dark:bg-secondary-dark dark:text-white">
	<label class="relative inline-flex w-full cursor-pointer items-center">
		<input
			type="checkbox"
			value=""
			class="peer sr-only"
			bind:checked
			on:change={dispatchCheckedEvent}
		/>
		<div
			class="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-100 after:bg-white after:transition-all after:content-[''] peer-checked:bg-sky-400 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:border-gray-600 dark:bg-primary dark:after:border-black dark:after:bg-gray-100 dark:peer-checked:bg-sky-500 rtl:peer-checked:after:-translate-x-full"
		/>
		<span class="ms-3 text-[13px] font-medium">{label}</span>
	</label>
</div>
