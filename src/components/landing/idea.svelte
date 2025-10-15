<script>
	import Fa from 'svelte-fa';
	import { faRightLong } from '@fortawesome/free-solid-svg-icons';
	import idea from '$lib/idea.gif';
	import { darkModeState } from '$lib/stores/index.js';
</script>

<div class=" flex h-fit items-center gap-6 bg-secondary-dark p-7 py-9 md:h-[500px]">
	<!-- <img src={idea} class="h-full" alt="idea" /> -->

	<div class="flex h-full flex-col items-center justify-center gap-3 px-1 md:gap-6 md:px-4">
		<div class="">
			<h2 class=" mb-2 text-5xl font-semibold text-light dark:text-sky-400 md:text-6xl">
				The Idea
			</h2>
			<div class="max-w-md text-base text-light md:text-lg">
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
				class="mt-3 flex w-fit items-center justify-center gap-2 rounded-lg bg-sky-400 px-7 py-4 text-sm transition-transform duration-300 hover:scale-110 dark:text-primary"
				>Get Started <Fa icon={faRightLong} /></a
			>
		</div>
	</div>

	<!-- {#if $darkModeState}
		<img src={ideaDark} class="h-full" alt="idea" />
	{:else}
	{/if} -->
</div>
