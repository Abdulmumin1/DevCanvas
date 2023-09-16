<script>
	import { page } from '$app/stores';
</script>

<div class="h-screen items-center justify-center flex flex-col">
	<h1 class="text-4xl">{$page.status} {$page.error.message}</h1>
	{#if $page.status == 500}
		<p class="text-3xl">Opsie, It an error on our end</p>
	{/if}
	<a href="/">Back to home</a>
</div>
<!-- <span style="font-size: 10em" /> -->
