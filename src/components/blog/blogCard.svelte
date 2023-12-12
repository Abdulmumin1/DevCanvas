<script>
	import { formatDate } from '$lib/utils/utils.js';
	import { faArrowAltCircleRight, faArrowTrendUp } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { fade, scale, slide } from 'svelte/transition';
	// import { slide } from 'svelte/transition';
	export let details;
	export let latest;

	// console.log(details);
</script>

<div
	in:scale
	class=" overflow-hidden w-full min-w-[300px] space-y-3 rounded-xl h-full transition-all duration-200 flex justify-center flex-col"
>
	<!-- <img src={details.thumbnail} alt="" class="object-fit w-full h-full" /> -->
	{#if latest}
		<div class=" flex flex-col gap-3 p-3">
			<a
				href={`blog/${details.slug}`}
				class="text-xl lg:text-3xl hover:opacity-80 text-orang dark:text-dark max-w-md capitalize"
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
	{:else}
		<div class="p-3 flex flex-col gap-2">
			<a href={`blog/${details.slug}`} class="text-2xl lg:text-xl hover:opacity-80">
				{details.title}</a
			>
			<p>{formatDate(details.date)}</p>
		</div>
	{/if}
	<!-- <p>{details.description}</p> -->
	<!-- <a href={`blog/${details.slug}`} class="py-2 flex items-center gap-3">
		Read more <Fa icon={faArrowTrendUp} /></a
	> -->
</div>
