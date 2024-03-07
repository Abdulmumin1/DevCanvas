<script>
	import { formatDate } from '$lib/utils/utils.js';
	import {
		faArrowAltCircleRight,
		faArrowRightLong,
		faArrowTrendUp
	} from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { fade, scale, slide } from 'svelte/transition';
	// import { slide } from 'svelte/transition';
	export let details;

	// console.log(details);
</script>

<div class=" flex flex-col justify-center gap-3 text-black dark:text-light pb-2">
	<a
		href={`blog/${details.slug}`}
		class="text-4xl md:text-6xl hover:opacity-80 text-orang dark:text-dark capitalize s"
	>
		{details.title}</a
	>
	<p class="text-sm">{formatDate(details.date)}</p>

	<a
		href={`blog/${details.slug}`}
		class="flex gap-2 hover:gap-4 text-base transition-all duration-300 items-center"
		><span class="sick-hover">Continue Reading</span> <Fa icon={faArrowRightLong} /></a
	>
</div>

<style>
	.s {
		/* font-family: 'dia'; */

		font-family: 'Dai Banna SIL';
	}
</style>
