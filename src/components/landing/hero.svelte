<script>
	import Fa from 'svelte-fa';
	import { faStar } from '@fortawesome/free-solid-svg-icons';
</script>

<p>
	<a
		href="https://github.com/Abdulmumin1/snippets"
		class="flex items-center justify-center gap-2 rounded-3xl bg-sky-100 p-2 px-4"
	>
		Star us on github <Fa icon={faStar} />
	</a>
</p>
<h1 class="text-5xl md:text-6xl font-bold mb-3 text-center">
	Welcome to <span class="text-sky-400">SnippetLand</span>
</h1>
<p class="text-xl text-gray-700 text-center max-w-lg">
	The platform for effortlessly sharing, collaborating, and discovering code snippets. <span
		class="text-rose-400">share</span
	>,
	<span class="text-orange-600">learn</span>, and
	<span class="bg-sky-300">build together</span>.
</p>
<div class="text-center">
	<a
		href="/signin"
		class="inline-block bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-6 rounded-lg"
		>Get Started</a
	>
	<a
		href="/explore"
		class="inline-block bg-secondary-dark text-white font-semibold py-3 px-6 rounded-lg">Explore</a
	>
</div>
