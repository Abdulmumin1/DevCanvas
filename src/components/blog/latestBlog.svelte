<script>
	import { formatDate } from '$lib/utils/utils.js';
	import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { fade, scale } from 'svelte/transition';

	export let details;
</script>

<div
	class="latest-post mb-2 rounded-lg bg-gradient-to-r from-sky-100 to-sky-200 p-8 border border-sky-800"
	in:scale={{ duration: 300, start: 0.95 }}
	out:fade
>
	<div class="flex flex-col justify-center gap-6 text-black">
		<a
			href={`blog/${details.slug}`}
			class="text-4xl font-extrabold capitalize transition-colors duration-300 hover:text-sky-600 md:text-6xl"
		>
			{details.title}
		</a>
		<p class="text-base text-gray-600">
			{details.description.slice(0, 200)}...
		</p>
		<div class="flex items-center justify-between">
			<p class="text-sm text-gray-500">{formatDate(details.date)}</p>
			<a
				href={`blog/${details.slug}`}
				class="flex items-center gap-2 text-base font-semibold text-sky-600 transition-all duration-300 hover:gap-4"
			>
				<span class="underline-on-hover">Continue Reading</span>
				<Fa icon={faArrowRightLong} />
			</a>
		</div>
	</div>
</div>

<style>
	.latest-tag {
		display: inline-block;
		padding: 4px 8px;
		background-color: #7dd3fc;
		border-radius: 4px;
	}

	.underline-on-hover {
		position: relative;
	}

	.underline-on-hover::after {
		content: '';
		position: absolute;
		width: 100%;
		height: 2px;
		bottom: -2px;
		left: 0;
		background-color: currentColor;
		transform: scaleX(0);
		transition: transform 0.3s ease-in-out;
	}

	.underline-on-hover:hover::after {
		transform: scaleX(1);
	}
</style>
