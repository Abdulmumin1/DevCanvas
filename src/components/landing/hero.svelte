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

<div class="grid grid-cols-1 items-center justify-between gap-x-20 md:grid-cols-2 lg:gap-x-40">
	<section
		class="relative flex h-full w-full flex-col gap-4 border-primary px-8 py-0 text-secondary-dark md:mt-12 md:py-12 lg:ml-20"
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
			class="hero-text max-w-[35rem] text-4xl text-primary dark:text-light md:text-6xl lg:text-[5rem]"
		>
			<!-- Paint Your <span class="magic">
				<span class="magic-star">
					<svg viewBox="0 0 512 512">
						<path
							d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z"
						/>
					</svg>
				</span>
				<span class="magic-star">
					<svg viewBox="0 0 512 512">
						<path
							d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z"
						/>
					</svg>
				</span>
				<span class="magic-star">
					<svg viewBox="0 0 512 512">
						<path
							d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z"
						/>
					</svg>
				</span>
				<span class=" text-black dark:text-light">Wildest</span>
			</span> Idea 🚀 -->
			The Online code Editor
		</h1>
		<p class="mx-1 max-w-lg font-diana text-sm text-primary dark:text-light md:text-xl">
			Effortlessly bring your boldest concepts to life. <span
				class="text-green-500 dark:text-green-700">learn</span
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

	<section class="h-[1000px] overflow-hidden p-12 md:h-full">
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

	h1 > .magic > .magic-text {
		animation: background-pan 3s linear infinite;
		background: linear-gradient(to right, var(--purple), var(--violet), var(--pink), var(--purple));
		background-size: 200%;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		white-space: nowrap;
	}

	/* .hero-text {
		font-weight: 600;
	} */

	/* -- YouTube Link Styles -- */
</style>
