<script>
	import {
		faArrowCircleRight,
		faArrowLeftLong,
		faArrowRightLong
	} from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	export let card;
</script>

<div
	class="bg-white rounded-lg p-4 shadow hover:shadow-md border-t border-sky-300 flex flex-col gap-2 text-sm md:text-base"
>
	<h2 class="text-sm mb-2 rounded-xl bg-sky-100 w-fit px-3 p-1">{card.lang}</h2>
	<p class="text-lg font-bold">{card.description}</p>
	<p class="bg-gray-100 p-2 rounded-lg overflow-hidden">
		{card.code.slice(0, 100)}...
	</p>
	<a
		href="/{card.project_key}"
		class="w-fit justify-center gap-2 transition-all duration-150 hover:gap-4 items-center flex py-2"
	>
		View <Fa icon={faArrowRightLong} />
	</a>
</div>
