<script>
	import { formatDate } from '$lib/utils/utils.js';
	import { faArrowAltCircleRight, faArrowTrendUp } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { fade, scale, slide } from 'svelte/transition';
	// import { slide } from 'svelte/transition';
	export let details;

	// console.log(details);
</script>

<div class="min-h-[400px] flex flex-col gap-3 p-3">
	<a
		href={`blog/${details.slug}`}
		class="text-4xl lg:text-6xl hover:opacity-80 text-orang dark:text-dark max-w-lg capitalize"
	>
		{details.title}</a
	>
	<p class="text-sm">{formatDate(details.date)}</p>

	<a
		href={`blog/${details.slug}`}
		class="flex gap-2 hover:gap-4 text-base transition-all duration-300 items-center"
		>Continue Reading <Fa icon={faArrowAltCircleRight} /></a
	>
</div>
