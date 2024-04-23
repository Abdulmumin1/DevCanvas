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

<div class=" flex flex-col justify-center gap-3 pb-2 text-black dark:text-light">
	<a
		href={`blog/${details.slug}`}
		class="text-orang dark:text-dark s text-4xl capitalize hover:opacity-80 md:text-6xl"
	>
		{details.title}</a
	>
	<p class="text-sm">{formatDate(details.date)}</p>

	<a
		href={`blog/${details.slug}`}
		class="flex items-center gap-2 text-base transition-all duration-300 hover:gap-4"
		><span class="sick-hover">Continue Reading</span> <Fa icon={faArrowRightLong} /></a
	>
</div>

<style>
</style>
