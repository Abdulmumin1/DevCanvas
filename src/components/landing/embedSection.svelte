<script>
	import embed_gif from '$lib/embed_files/playground.gif';
	import embed_gif_dark from '$lib/embed_files/playground_dark.gif';
	import { page } from '$app/stores';
	import { darkModeState } from '$lib/index.js';
	let c = `
<iframe
 src="https://snippet-bice.vercel.app/v4H9dW/embed"
/>`;
</script>

<div class=" mb-8 flex items-center justify-center p-7 py-9">
	<div class="flex h-full w-full max-w-[1200px] flex-col items-center justify-between gap-6">
		<div class="flex w-full flex-col justify-center">
			<h2 class="mb-2 text-5xl font-semibold text-black dark:text-sky-400 md:text-6xl">
				Embed With <span class="text-green-500">iframe</span>
			</h2>
			<!-- <pre class="text-[9px] md:text-sm bg-secondary-dark rounded-xl px-4 text-white">
				<code>{c}</code>
			</pre> -->
		</div>
		<div class="flex h-full w-full flex-col gap-4 md:gap-6">
			<iframe
				title="embed"
				src="{$page.url.origin}/play/aDDzMU/embed"
				frameborder="0"
				loading="lazy"
				class="h-[700px] rounded"
				style="aspect-ratio: 1:1;"
			/>
			<!-- <iframe
				title="embed"
				src="{$page.url.origin}/anonymous/ovUiK7/embed"
				frameborder="0"
				class="w-full rounded h-[600px] md:pl-10"
			/> -->
		</div>
	</div>
</div>
