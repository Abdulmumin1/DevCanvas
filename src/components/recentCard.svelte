<script>
	import {
		faArrowCircleRight,
		faArrowLeftLong,
		faArrowRightLong,
		faEdit,
		faTrash,
		faTrashAlt,
		faTrashArrowUp,
		faTrashCan,
		faTrashRestore
	} from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { scale } from 'svelte/transition';

	export let card;
	export let editIcons;
</script>

<div
	in:scale
	class="bg-white rounded-b-lg p-4 shadow hover:shadow-md border-t-2 border-secondary-dark flex flex-col gap-2 text-sm md:text-base"
>
	<h2 class="text-sm mb-2 rounded-xl bg-sky-100 w-fit px-3 p-1">{card.lang}</h2>
	<p class="text-lg md:text-xl font-semibold hover:opacity-80">
		<a href="/{card.project_key}">{card.description}</a>
	</p>
	<!-- <p class="bg-gray-100 p-2 rounded-lg overflow-hidden">
		{card.code.slice(0, 100)}...
	</p> -->

	<div class="w-full flex gap-2 text-secondary-dark">
		{#if editIcons}
			<a href="/{card.project_key}" class="hover:scale-105 transition-all duration-200">
				<Fa icon={faEdit} />
			</a>

			<a href="/{card.project_key}" class="hover:scale-105 transition-all duration-200">
				<Fa icon={faTrash} />
			</a>
		{:else}
			<a
				href="/{card.project_key}"
				class="w-fit justify-center gap-2 transition-all duration-150 hover:gap-4 items-center flex py-2"
			>
				View <Fa icon={faArrowRightLong} />
			</a>
		{/if}
	</div>
</div>
