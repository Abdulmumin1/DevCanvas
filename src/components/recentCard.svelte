<script>
	import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	export let card;
</script>

<div class="bg-white rounded-lg p-4 shadow border-t border-sky-300 h-fit">
	<h2 class="text-lg mb-2 rounded-xl bg-sky-100 w-fit px-3 p-1">{card.lang}</h2>
	<p>
		{card.code.slice(0, 50)}...
	</p>
	<a href="/{card.project_key}" class="w-full justify-end items-end flex"> View </a>
</div>
