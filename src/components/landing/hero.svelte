<script>
	import Fa from 'svelte-fa';
	import { faStar } from '@fortawesome/free-solid-svg-icons';
</script>

<div
	style="height: 70dvh; "
	class="flex px-8 py-12 flex-col gap-4 items-start bg-sky-500 w-full text-black border-b-2 border-primary"
>
	<p>
		<a
			href="https://github.com/Abdulmumin1/snippets"
			class="flex items-center justify-center gap-2 rounded-3xl bg-sky-100 dark:bg-light p-2 px-4 dark:text-sky-dark w-fit"
		>
			Star us on github <Fa icon={faStar} />
		</a>
	</p>
	<h1 class="text-4xl md:text-5xl font-bold max-w-lg">
		Share Your <span class="">Genius</span> with the World!
	</h1>
	<p class="text-xl text-gray-900 max-w-lg mx-1">
		The platform for effortlessly sharing, collaborating, and discovering code snippets. <span
			class="text-green-700">share</span
		>,
		<span class="text-orange-800">learn</span>, and
		<span class="bg-sky-300 text-primary">build together</span>.
	</p>
	<div class="text-center">
		<a
			href="/signin"
			class="inline-block bg-sky-600 hover:bg-sky-600 border-2 border-black font-semibold py-3 px-6 rounded-lg"
			>Get Started</a
		>
		<a
			href="/explore"
			class="inline-block bg-secondary-dark text-white border-2 border-primary font-semibold py-3 px-6 rounded-lg"
			>Explore</a
		>
	</div>
</div>
