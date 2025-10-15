<script>
	import {
		faAngleDown,
		faAngleRight,
		faExclamationCircle
	} from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { slide } from 'svelte/transition';

	let expanded = $state(false);
	
	let s_icon = $derived(expanded ? faAngleDown : faAngleRight);

	function expand() {
		expanded = !expanded;
	}
</script>

<div class="flex flex-col gap-2">
	<button onclick={expand} class="flex w-fit items-center justify-center gap-2"
		>Shortcuts <Fa icon={s_icon} class="transition-all duration-300" /></button
	>
	{#if expanded}
		<ul transition:slide class="flex flex-col gap-2">
			<li class="flex items-center gap-4">
				<div>
					<span class="rounded bg-gray-100 px-2 py-1 dark:bg-sky-200 dark:text-black">Ctrl</span>
					+
					<span class="rounded bg-gray-100 px-2 py-1 dark:bg-sky-200 dark:text-black">S</span>
				</div>
				<div class="rounded bg-gray-100 px-3 py-1 dark:bg-sky-200 dark:text-black">Save</div>
			</li>
			<li class="flex items-center gap-2">
				<div>
					<span class="rounded bg-gray-100 px-2 py-1 dark:bg-sky-200 dark:text-black">f1</span>
				</div>
				<div class="rounded bg-gray-50 px-2 py-1 dark:bg-sky-200 dark:text-black">
					Command Palette
				</div>
			</li>

			<li class="flex items-center gap-4">
				<div>
					<Fa icon={faExclamationCircle} />
				</div>
				<p>VsCode shortcuts works</p>
			</li>
		</ul>
	{/if}
</div>
