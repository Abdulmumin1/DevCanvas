<script>
	import {
		faAngleDown,
		faAngleRight,
		faExclamationCircle
	} from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { slide } from 'svelte/transition';

	$: expanded = false;
	$: s_icon = expanded ? faAngleDown : faAngleRight;

	function expand() {
		expanded = !expanded;
	}
</script>

<div class="flex flex-col gap-2">
	<button on:click={expand} class="flex items-center justify-center w-fit gap-2"
		>Shortcuts <Fa icon={s_icon} class="transition-all duration-300" /></button
	>
	{#if expanded}
		<ul transition:slide class="flex gap-2 flex-col">
			<li class="flex gap-4 items-center">
				<div>
					<span class="bg-gray-100 px-2 py-1 rounded dark:text-black dark:bg-sky-200">Ctrl</span>
					+
					<span class="bg-gray-100 px-2 py-1 rounded dark:text-black dark:bg-sky-200">S</span>
				</div>
				<div class="bg-gray-100 px-3 py-1 rounded dark:text-black dark:bg-sky-200">Save</div>
			</li>
			<li class="flex gap-2 items-center">
				<div>
					<span class="bg-gray-100 px-2 py-1 rounded dark:text-black dark:bg-sky-200">f1</span>
				</div>
				<div class="bg-gray-50 px-2 py-1 rounded dark:text-black dark:bg-sky-200">
					Command Palette
				</div>
			</li>

			<li class="flex gap-4 items-center">
				<div>
					<Fa icon={faExclamationCircle} />
				</div>
				<p>VsCode shortcuts works</p>
			</li>
		</ul>
	{/if}
</div>
