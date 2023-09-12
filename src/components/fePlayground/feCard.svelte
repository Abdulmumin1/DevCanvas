<script>
	export let details;
</script>

<div
	class="bg-sky-100 hover:scale-105 duration-300 transition-all rounded-xl p-1 dark:bg-secondary-dark"
>
	<!-- <div class="w-full rounded-xl overflow-hidden">
		{@html details.html}
	</div> -->
	<div>{details.description}</div>
	<a href="/html-playground/{details.project_key}">Goto </a>
</div>
