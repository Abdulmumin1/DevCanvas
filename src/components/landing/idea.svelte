<script>
	import Fa from 'svelte-fa';
	import { faRightLong } from '@fortawesome/free-solid-svg-icons';
	import idea from '$lib/idea.gif';
	import { darkModeState } from '$lib/index.js';
</script>

<div class=" bg-secondary-dark h-fit md:h-[500px] flex items-center p-7 py-9 gap-6">
	<!-- <img src={idea} class="h-full" alt="idea" /> -->

	<div class="h-full flex flex-col gap-3 md:gap-6 items-center justify-center px-1 md:px-4">
		<div class="">
			<h2 class=" font-semibold mb-2 text-light dark:text-sky-400 text-5xl md:text-6xl">
				The Idea
			</h2>
			<div class="max-w-md text-light text-base md:text-lg">
				<p>
					You're working on some project, you wrote a really interesting piece & you want to share
					it with the community.
				</p>
				<p class="text-sky-300">
					Or, maybe you want some help on something you're working on and you're requested to share
					the code snippet so they can have a look
				</p>
				<p class="text-green-200">Or, maybe you just need to embed some code into your webpage</p>
			</div>
			<a
				href="/signin"
				class="text-sm flex w-fit items-center justify-center gap-2 px-7 py-4 mt-3 bg-sky-400 dark:text-primary rounded-lg hover:scale-110 transition-transform duration-300"
				>Get Started <Fa icon={faRightLong} /></a
			>
		</div>
	</div>

	<!-- {#if $darkModeState}
		<img src={ideaDark} class="h-full" alt="idea" />
	{:else}
	{/if} -->
</div>
