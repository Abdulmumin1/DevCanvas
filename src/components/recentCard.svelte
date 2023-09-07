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
	import { scale, slide } from 'svelte/transition';

	export let card;
	export let editIcons;
</script>

<div
	in:slide
	class="w-full rounded-b-lg p-4 flex text-sm md:text-base items-center justify-between"
>
	<div class="flex h-fit gap-4 w-full">
		<div class="min-w-[100px]">
			<h2 class="text-sm mb-2 rounded-xl text-secondary-dark bg-sky-100 w-fit px-3 p-1 h-fit">
				{card.lang}
			</h2>
		</div>
		<p class="text-lg md:text-xl font-semibold hover:opacity-80 w-full">
			<a href="/{card.project_key}">{card.description}</a>
		</p>
	</div>
	<!-- <p class="bg-gray-100 p-2 rounded-lg overflow-hidden">
	{card.code.slice(0, 100)}...
</p> -->

	<div>
		<div class="w-full flex gap-4 text-secondary-dark">
			{#if editIcons}
				<a href="/{card.project_key}" class="hover:scale-105 transition-all duration-200">
					<Fa icon={faEdit} />
				</a>

				<a href="/{card.project_key}" class="hover:scale-105 transition-all duration-200">
					<Fa icon={faTrash} />
				</a>
			{/if}
		</div>
	</div>
</div>
