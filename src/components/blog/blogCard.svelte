<script>
	import { formatDate } from '$lib/utils/utils.js';
	import {
		faArrowAltCircleRight,
		faArrowTrendUp,
		faCalendar,
		faPerson
	} from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { fade, scale, slide } from 'svelte/transition';
	// import { slide } from 'svelte/transition';
	export let details;

	// console.log(details);
</script>

<!-- <div in:scale class="  w-full max-w-full md:max-w-[500px]">
	<img src={details.thumbnail} alt="" class="object-fit w-full h-full" />

	<div
		class="p-4 justify-between rounded-lg h-[500px] transition-all duration-300 card flex flex-col gap-2 bg-sky-50 dark:bg-secondary-dark dark:text-white text-black"
	>
		<p class="flex gap-2 items-center">
			<Fa icon={faCalendar} />{formatDate(details.date)}
		</p>
		<div class="">
			<a href={`blog/${details.slug}`} class="text-2xl lg:text-4xl hover:opacity-80">
				{details.title}</a
			>
			<p class="text-gray-900 dark:text-gray-300">{details.description.slice(0, 100)}...</p>
		</div>
	</div>

	<p>{details.description}</p>
	<a href={`blog/${details.slug}`} class="py-2 flex items-center gap-3">
		Read more <Fa icon={faArrowTrendUp} /></a
	>
</div> -->

<a href={`blog/${details.slug}`} in:scale class="hover:opacity-90 w-full">
	<div class="holder my-2">
		<div class="ellipse" />
		<div class="ellipse ellipse2" />
	</div>

	<div class="py-2 justify-between rounded-lg flex flex-col gap-2 dark:text-light text-black">
		<p class="flex gap-2 items-center text-[.9rem]">
			<span>
				<Fa icon={faCalendar} />
			</span>
			Published {formatDate(details.date)}
		</p>
		<p class="flex gap-2 items-center text-[.9rem]">
			<span class="opacity-85"> Written by: </span>
			<span class="opacity-90">Abdulmumin Yaqeen</span>
		</p>
		<div class="">
			<a href={`blog/${details.slug}`} class="text-2xl md:text-3xl x text-balance hover:opacity-80">
				{details.title}</a
			>
			<!-- decoration-wavy underline underline-offset-4  -->
			<!-- <p class="text-gray-900 dark:text-gray-300">
				{details.description.slice(0, 200)}...
			</p> -->

			<!-- <a href={`blog/${details.slug}`}>Read ></a> -->
		</div>
	</div>
</a>

<style>
	/* .card:hover {
		--tw-scale-x: 1.02;
		--tw-scale-y: 1.02;
		transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate))
			skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x))
			scaleY(var(--tw-scale-y));
	}

	 */

	.holder {
		/* Clip edges, as some of the lines don't terminate nicely. */
		overflow: hidden;
		position: relative;
		width: 100%;
		height: 50px;
	}

	.ellipse {
		--squiggle-color: currentColor;
		position: absolute;
		background: radial-gradient(
			ellipse,
			transparent,
			transparent 7px,
			var(--squiggle-color) 7px,
			var(--squiggle-color) 10px,
			transparent 11px
		);
		background-size: 36px 40px;
		width: 100%;
		height: 20px;
		/* mix-blend-mode: multiply; */
	}

	.ellipse2 {
		top: 20px;
		left: 18px;
		background-position: 0px -20px;
	}
</style>
