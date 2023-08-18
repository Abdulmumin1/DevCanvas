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

<div class="flex flex-col gap-2 mb-3">
	<button on:click={expand} class="flex items-center justify-center w-fit gap-2 text-lg"
		>Shortcuts <Fa icon={s_icon} class="transition-all duration-300" /></button
	>
	{#if expanded}
		<ul transition:slide class="flex gap-2 flex-col">
			<li class="flex gap-4 items-center">
				<div>
					<span class="bg-gray-100 shadow px-2 py-1 rounded">Ctrl</span> +
					<span class="bg-gray-100 shadow px-2 py-1 rounded">S</span>
				</div>
				<div class="bg-gray-100 shadow px-2 py-1 rounded">Save</div>
			</li>
			<li class="flex gap-2 items-center">
				<div>
					<span class="bg-gray-100 shadow px-2 py-1 rounded">f1</span>
				</div>
				<div class="bg-gray-100 shadow px-2 py-1 rounded">Action center</div>
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
