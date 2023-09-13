<script>
	import ShareBtn from '../ShareBtn.svelte';
	import Darkmode from '../darkmode.svelte';

	export let title;
</script>

<nav
	class="w-full bg-white dark:bg-secondary-dark dark:shadow-black dark:shadow-lg h-10 px-4 py-10 flex items-center text-light border-b dark:border-secondary-dark"
>
	<ul class="w-full flex items-center justify-between">
		<li class="leading-none">
			<a href="/html-playground" class="text-3xl text-sky-300"
				><span class="text-primary dark:text-light">Snippets</span>Land</a
			>
			<p
				contenteditable=""
				class="text-sky-400 dark:text-sky-300 outline-none focus:outline-sky-300 p-1 focus:dark:outline-sky-400 rounded-lg"
				spellcheck="false"
			>
				{title}
			</p>
		</li>
		<ul class="flex gap-2 items-center justify-center">
			<li class="text-primary"><ShareBtn /></li>
			<li class="h-full bg-primary rounded-lg"><Darkmode /></li>
		</ul>
	</ul>
</nav>
