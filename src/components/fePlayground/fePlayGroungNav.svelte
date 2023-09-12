<script>
	import ShareBtn from '../ShareBtn.svelte';
	import Darkmode from '../darkmode.svelte';
</script>

<nav
	class="w-full bg-white dark:bg-secondary-dark h-10 px-4 py-10 flex items-center text-light border-b dark:border-secondary-dark"
>
	<ul class="w-full flex items-center justify-between">
		<li>
			<a href="/" class="text-2xl text-sky-300"
				><span class="text-primary dark:text-light">Snippets</span>Land</a
			>
		</li>
		<ul class="flex gap-2">
			<li class="text-primary"><ShareBtn /></li>
			<li class="h-full bg-primary rounded-lg"><Darkmode /></li>
		</ul>
	</ul>
</nav>
