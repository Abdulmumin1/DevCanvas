<script>
	import embed_gif from '$lib/embed_files/playground.gif';
	import embed_gif_dark from '$lib/embed_files/playground_dark.gif';

	import { darkModeState } from '$lib/index.js';
	let c = `
<iframe
 src="https://snippet-bice.vercel.app/v4H9dW/embed"
/>`;
</script>

<div class="h-[100dvh] mb-8 flex p-7 py-9 justify-center items-center">
	<div
		class="w-full flex flex-col md:flex-row gap-6 justify-between items-center h-full max-w-[90vw]"
	>
		<div class="flex justify-center flex-col w-full md:w-[400px]">
			<h2 class="text-6xl text-black font-semibold mb-2 dark:text-sky-400">
				Embed With Just <span class="text-green-500">iframe</span>
			</h2>
			<!-- <pre class="text-[9px] md:text-sm bg-secondary-dark rounded-xl px-4 text-white">
				<code>{c}</code>
			</pre> -->
		</div>
		<div class="flex flex-col h-full w-full gap-4 md:gap-6">
			<iframe
				title="embed"
				src="http://localhost:5173/play/aDDzMU/embed"
				frameborder="0"
				class="w-full rounded h-full"
			/>
			<iframe
				title="embed"
				src="http://localhost:5173/anonymous/0S6jpq/embed"
				frameborder="0"
				class="w-full rounded h-full md:pl-10"
			/>
		</div>
	</div>
</div>
