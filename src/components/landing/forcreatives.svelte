<script>
	import { faRightLong } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import EditorFrame from './editorFrame.svelte';
	import CreativeShowcase from './creativeShowcase.svelte';
	import { dummyTitle } from '$lib/feEditor/store.js';
</script>

<div class="flex w-full items-center justify-center gap-2">
	<div class=" flex h-full w-full flex-col items-center justify-center gap-12">
		<p class="py-12 text-4xl text-black dark:text-light md:text-6xl">🎨 𝓯𝓸𝓻 𝒸𝓇𝑒𝓪𝓽𝓲𝓿𝓮𝓼</p>

		<div class="relative flex h-full w-full flex-col items-center justify-between">
			<EditorFrame title={$dummyTitle}>
				<!-- <ModelLanding /> -->
				<CreativeShowcase />
			</EditorFrame>

			<!-- <div class="bg-black p-10 relative w-fit">
				<span
					class="w-fit absolute top-[-20px] rounded-md text-white bg-secondary-dark p-3 text-sm md:text-lg"
				>
					Moon animation with just HTML and CSS<br />
					<a href="https://snippet-bice.vercel.app/play/aDDzMU" class="text-sky-500"
						>https://snippetland.io/play/aDDzMU</a
					>
				</span>
				<div class="moon-outer">
					<div class="moon">
						<div class="details" />
						<div class="details one" />
						<div class="details two" />
						<div class="details three" />
						<div class="details four small" />
					</div>
				</div>

				<div class="poem-body m-5 md:m-10">
					<h1 class="poem-title">Poem</h1>
					<p class="poem text-sm md:text-base">
						The moon, how it shines so bright,<br />
						In the vas expanse of night,<br />
						A gentle orb that graces the sky,<br />
						Casting a soft, ethereal light<br />
						<br />

						It beauty is a thing to behold,<br />
						A wonder that never gets old,<br />
						A tranquil presence, calm and serene,<br />
						A sight to cherish, to have and to hold<br />
						<br />

						The moon, a symbol of mystery and grace,<br />
						A celestial jewel in the sky's embrace,<br />
						It illuminates the darkend land,<br />
						And brings a sense of peace to every place
					</p>
				</div>
			</div> -->
		</div>

		<a
			href="/play/try"
			class="flex gap-4 rounded-lg bg-sky-500 px-6 py-4 text-xl text-primary transition-all duration-300 hover:gap-6 hover:bg-sky-300 md:text-5xl"
			>Launch play ground <Fa icon={faRightLong} /></a
		>
	</div>
</div>

<style>
	:root {
		--width: 100px;
		--height: 100px;
	}
	.container {
		width: 300px;
		height: 280px;
	}

	.coffee-header {
		width: 100%;
		height: 80px;
		position: absolute;
		top: 0;
		left: 0;
		background-color: #ddcfcc;
		border-radius: 10px;
	}

	.coffee-header__buttons {
		width: 25px;
		height: 25px;
		position: absolute;
		top: 25px;
		background-color: #282323;
		border-radius: 50%;
	}

	.coffee-header__buttons::after {
		content: '';
		width: 8px;
		height: 8px;
		position: absolute;
		bottom: -8px;
		left: calc(50% - 4px);
		background-color: #615e5e;
	}

	.coffee-header__button-one {
		left: 15px;
	}

	.coffee-header__button-two {
		left: 50px;
	}

	.coffee-header__display {
		width: 50px;
		height: 50px;
		position: absolute;
		top: calc(50% - 25px);
		left: calc(50% - 25px);
		border-radius: 50%;
		background-color: #9acfc5;
		border: 5px solid #43beae;
		box-sizing: border-box;
	}

	.coffee-header__details {
		width: 8px;
		height: 20px;
		position: absolute;
		top: 10px;
		right: 10px;
		background-color: #9b9091;
		box-shadow:
			-12px 0 0 #9b9091,
			-24px 0 0 #9b9091;
	}

	.coffee-medium {
		width: 90%;
		height: 160px;
		position: absolute;
		top: 80px;
		left: calc(50% - 45%);
		background-color: #bcb0af;
	}

	.coffee-medium:before {
		content: '';
		width: 90%;
		height: 100px;
		background-color: #776f6e;
		position: absolute;
		bottom: 0;
		left: calc(50% - 45%);
		border-radius: 20px 20px 0 0;
	}

	.coffe-medium__exit {
		width: 60px;
		height: 20px;
		position: absolute;
		top: 0;
		left: calc(50% - 30px);
		background-color: #231f20;
	}

	.coffe-medium__exit::before {
		content: '';
		width: 50px;
		height: 20px;
		border-radius: 0 0 50% 50%;
		position: absolute;
		bottom: -20px;
		left: calc(50% - 25px);
		background-color: #231f20;
	}

	.coffe-medium__exit::after {
		content: '';
		width: 10px;
		height: 10px;
		position: absolute;
		bottom: -30px;
		left: calc(50% - 5px);
		background-color: #231f20;
	}

	.coffee-medium__arm {
		width: 70px;
		height: 20px;
		position: absolute;
		top: 15px;
		right: 25px;
		background-color: #231f20;
	}

	.coffee-medium__arm::before {
		content: '';
		width: 15px;
		height: 5px;
		position: absolute;
		top: 7px;
		left: -15px;
		background-color: #9e9495;
	}

	.coffee-medium__cup {
		width: 80px;
		height: 47px;
		position: absolute;
		bottom: 0;
		left: calc(50% - 40px);
		background-color: #fff;
		border-radius: 0 0 70px 70px / 0 0 110px 110px;
	}

	.coffee-medium__cup::after {
		content: '';
		width: 20px;
		height: 20px;
		position: absolute;
		top: 6px;
		right: -13px;
		border: 5px solid #fff;
		border-radius: 50%;
	}

	@keyframes liquid {
		0% {
			height: 0px;
			opacity: 1;
		}

		5% {
			height: 0px;
			opacity: 1;
		}

		20% {
			height: 62px;
			opacity: 1;
		}

		95% {
			height: 62px;
			opacity: 1;
		}

		100% {
			height: 62px;
			opacity: 0;
		}
	}

	.coffee-medium__liquid {
		width: 6px;
		height: 63px;
		opacity: 0;
		position: absolute;
		top: 50px;
		left: calc(50% - 3px);
		background-color: #74372b;
		animation: liquid 4s 4s linear infinite;
	}

	.coffee-medium__smoke {
		width: 8px;
		height: 20px;
		position: absolute;
		border-radius: 5px;
		background-color: #b3aeae;
	}

	@keyframes smokeOne {
		0% {
			bottom: 20px;
			opacity: 0;
		}

		40% {
			bottom: 50px;
			opacity: 0.5;
		}

		80% {
			bottom: 80px;
			opacity: 0.3;
		}

		100% {
			bottom: 80px;
			opacity: 0;
		}
	}

	@keyframes smokeTwo {
		0% {
			bottom: 40px;
			opacity: 0;
		}

		40% {
			bottom: 70px;
			opacity: 0.5;
		}

		80% {
			bottom: 80px;
			opacity: 0.3;
		}

		100% {
			bottom: 80px;
			opacity: 0;
		}
	}

	.coffee-medium__smoke-one {
		opacity: 0;
		bottom: 50px;
		left: 102px;
		animation: smokeOne 3s 4s linear infinite;
	}

	.coffee-medium__smoke-two {
		opacity: 0;
		bottom: 70px;
		left: 118px;
		animation: smokeTwo 3s 5s linear infinite;
	}

	.coffee-medium__smoke-three {
		opacity: 0;
		bottom: 65px;
		right: 118px;
		animation: smokeTwo 3s 6s linear infinite;
	}

	.coffee-medium__smoke-for {
		opacity: 0;
		bottom: 50px;
		right: 102px;
		animation: smokeOne 3s 5s linear infinite;
	}

	.coffee-footer {
		width: 95%;
		height: 15px;
		position: absolute;
		bottom: 25px;
		left: calc(50% - 47.5%);
		background-color: #41bdad;
		border-radius: 10px;
	}

	.coffee-footer::after {
		content: '';
		width: 106%;
		height: 26px;
		position: absolute;
		bottom: -25px;
		left: -8px;
		background-color: gray;
	}

	.moon-outer {
		display: flex;
		margin-top: 50px;
		justify-content: center;
	}

	.moon {
		width: var(--width);
		height: var(--height);
		border-radius: 50%;
		animation: shine 5s ease-in-out infinite;
		background-color: rgb(230, 224, 224);
		box-shadow: 0px 0px 8px 2px rgba(235, 235, 231, 0.301);
		position: relative;
		overflow: hidden;
		/* Apply the animation */
	}

	.details {
		width: var(--width);
		height: var(--height);
		border-radius: 50%;
		background-color: rgba(165, 165, 165, 0.089);
	}

	.details.one {
		position: absolute;
		top: 20px;
		left: 40px;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background-color: transparent;
		box-shadow: inset 2px 0 4px rgba(167, 167, 167, 0.685);
	}

	.details.two {
		position: absolute;
		top: 60px;
		left: 16px;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background-color: transparent;
		box-shadow: inset -2px 0 4px rgba(167, 167, 167, 0.685);
	}

	.details.three {
		position: absolute;
		top: 70px;
		left: 70px;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background-color: transparent;
		box-shadow: inset 2px 0 4px rgba(167, 167, 167, 0.685);
	}

	.details.four.small {
		position: absolute;
		top: 40px;
		left: 60px;
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background-color: transparent;
		box-shadow: inset 2px 0 4px rgba(167, 167, 167, 0.585);
	}

	@keyframes shine {
		0% {
			box-shadow: 0px 0px 4px 2px rgba(235, 235, 231, 0.301);
		}

		50% {
			box-shadow: 0px 0px 10px 11px rgba(235, 235, 231, 0.301);
		}

		100% {
			box-shadow: 0px 0px 4px 2px rgba(235, 235, 231, 0.301);
		}
	}

	.poem-body {
		display: flex;
		align-items: center;
		/* margin: 60px; */
		flex-direction: column;
	}

	.poem-title {
		color: rgb(230, 224, 224);
	}

	.poem {
		color: gray;
	}
</style>
