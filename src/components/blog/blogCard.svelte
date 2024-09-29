<script>
	import { formatDate } from '$lib/utils/utils.js';
	import { faCalendar, faArrowRight } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { fade, fly } from 'svelte/transition';

	export let details;
</script>

<div
	class="overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-lg dark:bg-secondary-dark"
	in:fly={{ y: 20 }}
>
	<img src="/blogcard.png" alt={details.title} class="h-48 w-full object-cover" />
	<div class="p-6">
		<div class="mb-4 flex items-center text-sm text-gray-600 dark:text-gray-400">
			<Fa icon={faCalendar} class="mr-2" />
			<time datetime={details.date}>{formatDate(details.date)}</time>
		</div>
		<h2 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">
			<a
				href={`/blog/${details.slug}`}
				class="transition-colors duration-200 hover:text-sky-600 dark:hover:text-sky-400"
			>
				{details.title}
			</a>
		</h2>
		<p class="mb-4 text-gray-700 dark:text-gray-300">
			{details.description.slice(0, 150)}...
		</p>
		<a
			href={`/blog/${details.slug}`}
			class="inline-flex items-center text-sky-600 hover:underline dark:text-sky-400"
		>
			Read more
			<Fa icon={faArrowRight} class="ml-2" />
		</a>
	</div>
	<div class="squiggle-border"></div>
</div>

<style>
	.squiggle-border {
		height: 8px;
		background:
			linear-gradient(135deg, #ffffff 25%, transparent 25%) -5px 0,
			linear-gradient(225deg, #ffffff 25%, transparent 25%) -5px 0,
			linear-gradient(315deg, #ffffff 25%, transparent 25%),
			linear-gradient(45deg, #ffffff 25%, transparent 25%);
		background-size: 10px 10px;
		background-color: #0284c7; /* Adjust this color to match your design */
	}

	:global(.dark) .squiggle-border {
		background:
			linear-gradient(135deg, #1f2937 25%, transparent 25%) -5px 0,
			linear-gradient(225deg, #1f2937 25%, transparent 25%) -5px 0,
			linear-gradient(315deg, #1f2937 25%, transparent 25%),
			linear-gradient(45deg, #1f2937 25%, transparent 25%);
		background-size: 10px 10px;
		background-color: #38bdf8; /* Adjust this color for dark mode */
	}
</style>
