<script>
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.status} Error</title>
</svelte:head>
<div class="flex h-screen flex-col items-center justify-center">
	<!-- <h1 class="text-4xl">{page.status} {page.error.message}</h1> -->
	<div class="flex w-full flex-col items-center justify-center">
		{#if page.status == 404}
			<!-- <p class="text-3xl">Opsie, It an error on our end</p> -->
			<div class="flex text-[10rem] font-extrabold">
				<span class="dark:text-gray-300">4</span> <img src="/logo.svg" width="170x" alt="" /><span
					class="dark:text-gray-300">4</span
				>
			</div>
			<!-- <h1 class="text-4xl">{page.error.message}</h1> -->
			<p class="text-xl">Page not found</p>
		{:else if page.status == 500}
			<!-- <p class="text-3xl">Opsie, It an error on our end</p> -->
			<div class="flex w-fit gap-2 text-[10rem] font-extrabold">
				<span class="dark:text-gray-300">5</span><img
					src="/logo.svg"
					style="filter:grayscale();"
					width="140px"
					alt=""
				/>
				<span class="text-[10rem] dark:text-gray-300">0</span>
			</div>
			<p class="text-xl">{page.error.message}</p>
		{/if}

		<a href="/" class="mt-6 rounded-md bg-sky-300 px-2 py-1 text-black">Back to home</a>
	</div>
</div>
<!-- <span style="font-size: 10em" /> -->
