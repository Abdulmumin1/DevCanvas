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

<div class=" mb-8 flex p-7 py-9 justify-center items-center">
	<div class="w-full flex flex-col gap-6 justify-between items-center h-full max-w-[90vw]">
		<div class="flex justify-center flex-col w-full">
			<h2 class="text-5xl md:text-6xl text-black font-semibold mb-2 dark:text-sky-400">
				Embed With <span class="text-green-500">iframe</span>
			</h2>
			<!-- <pre class="text-[9px] md:text-sm bg-secondary-dark rounded-xl px-4 text-white">
				<code>{c}</code>
			</pre> -->
		</div>
		<div class="flex flex-col h-full w-full gap-4 md:gap-6">
			<iframe
				title="embed"
				src="{$page.url.origin}/play/aDDzMU/embed"
				frameborder="0"
				class="w-[] rounded h-[700px]"
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
