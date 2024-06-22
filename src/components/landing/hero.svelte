<script>
	import Fa from 'svelte-fa';
	import { faStar } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import HeroCanvas from './heroCanvas.svelte';

	let index = 0,
		interval = 1000;

	const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

	const animate = (star) => {
		star.style.setProperty('--star-left', `${rand(-10, 100)}%`);
		star.style.setProperty('--star-top', `${rand(-40, 80)}%`);

		star.style.animation = 'none';
		star.offsetHeight;
		star.style.animation = '';
	};

	onMount(() => {
		for (const star of document.getElementsByClassName('magic-star')) {
			setTimeout(
				() => {
					animate(star);

					setInterval(() => animate(star), 2000);
				},
				index++ * (interval / 3)
			);
		}
	});
</script>

<!-- grid grid-cols-1 items-end justify-between gap-x-20 md:grid-cols-2 lg:gap-x-40 -->
<div class="flex flex-col md:flex-row">
	<section
		class="relative flex h-full w-full min-w-[20rem] flex-col gap-4 border-primary px-8 py-0 text-secondary-dark md:mt-36 md:min-w-[30rem] md:py-12 lg:ml-0 lg:py-0"
	>
		<!-- <p>
			<a
				href="https://github.com/Abdulmumin1/snippets"
				class="flex items-center gap-2 rounded-3xl bg-sky-100 dark:bg-light p-2 px-4 dark:text-sky-dark w-fit"
			>
				Star us on github <Fa icon={faStar} />
			</a>
		</p> -->
		<h1
			class="hero-text magic-text text-balance text-4xl text-primary dark:text-light md:max-w-[40rem] md:text-6xl lg:text-[5rem]"
		>
			The Editor <span class="font-serif font-bold">With Super Powers</span>
		</h1>
		<p
			class="mx-1 max-w-lg text-balance font-diana text-lg text-primary dark:text-light md:text-xl"
		>
			Prototype faster with a blazing fast editor <span class="text-green-500 dark:text-green-700"
				>learn</span
			>,
			<span class="text-orange-400 dark:text-orange-800">share</span>, and
			<span class="bg-sky-300 text-primary">build together</span>.
		</p>
		<div class="">
			<a
				href="/signin"
				class="inline-block rounded-lg bg-sky-600 px-4 py-2 font-semibold text-light hover:bg-sky-600"
				>Get Started</a
			>
			<a
				href="/explore"
				class="inline-block rounded-lg bg-secondary-dark px-4 py-2 font-semibold text-light"
				>Explore</a
			>
		</div>
	</section>

	<section class=" h-full overflow-hidden p-12">
		<HeroCanvas />
	</section>
</div>

<style>
	:root {
		--purple: rgb(4, 45, 61);
		--violet: rgb(0, 248, 248);
		--pink: rgb(0, 150, 250);
	}

	@keyframes background-pan {
		from {
			background-position: 0% center;
		}

		to {
			background-position: -200% center;
		}
	}

	@keyframes scale {
		from,
		to {
			transform: scale(0);
		}

		50% {
			transform: scale(1);
		}
	}

	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(180deg);
		}
	}

	h1 {
		font-weight: 400;
	}

	h1 > .magic {
		display: inline-block;
		position: relative;
	}

	h1 > .magic > .magic-star {
		--size: clamp(20px, 1.5vw, 30px);

		animation: scale 700ms ease forwards;
		display: block;
		height: var(--size);
		left: var(--star-left);
		position: absolute;
		top: var(--star-top);
		width: var(--size);
	}

	h1 > .magic > .magic-star > svg {
		animation: rotate 1000ms linear infinite;
		display: block;
		opacity: 0.7;
	}

	h1 > .magic > .magic-star > svg > path {
		/* fill: rgb(2 132 199); */
		fill: whitesmoke;
	}
</style>
