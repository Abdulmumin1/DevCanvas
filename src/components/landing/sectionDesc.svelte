<script>
	export let title;
</script>

<div class="">
	<h2 class=" font-semibold mb-2 text-4xl md:text-5xl">{title}</h2>
	<p class="max-w-md">
		<slot />
	</p>
</div>
