<script>
	import Fa from 'svelte-fa';
	import { faRightLong } from '@fortawesome/free-solid-svg-icons';
</script>

<div class=" bg-secondary-dark h-fit md:h-[400px] flex items-center p-7 py-9">
	<div class="h-full flex flex-col gap-3 md:gap-6 items-center justify-center">
		<div class="">
			<h2 class=" font-semibold mb-2 text-light dark:text-sky-400 text-5xl md:text-6xl">
				The Idea
			</h2>
			<p class="max-w-md text-light text-base md:text-lg">
				You're working on some project, you wrote a really interesting piece & you want to share it
				with the community. <br />
				Or, maybe you want some help on something you're working on and you're requested to share the
				code snippet so they can have a look
			</p>
			<a
				href="/signin"
				class="text-sm flex w-fit items-center justify-center gap-2 px-7 py-4 mt-3 bg-sky-400 dark:text-primary rounded-lg hover:scale-110 transition-transform duration-300"
				>Get Started <Fa icon={faRightLong} /></a
			>
		</div>
	</div>
</div>
