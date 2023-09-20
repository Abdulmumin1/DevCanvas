<script>
	import embed_gif from '$lib/embed_files/playground.gif';
	import embed_gif_dark from '$lib/embed_files/playground_dark.gif';

	import { darkModeState } from '$lib/index.js';
	let c = `
<iframe
 src="https://snippet-bice.vercel.app/v4H9dW/embed"
/>`;
</script>

<div class="h-fit md:h-[100dvh] mb-8 flex p-7 py-9 justify-center">
	<div class="w-full flex flex-col md:flex-row gap-6 justify-between max-w-5xl items-center">
		<div class="flex justify-center flex-col w-full md:w-3/5">
			<h2 class="text-4xl md:text-6xl text-black font-semibold mb-2 dark:text-sky-400">
				Embed Elegantly With Just <span class="text-error">iframe</span>
			</h2>
			<!-- <pre class="text-[9px] md:text-sm bg-secondary-dark rounded-xl px-4 text-white">
				<code>{c}</code>
			</pre> -->
		</div>
		<div class=" w-full h-full">
			{#if $darkModeState}
				<img src={embed_gif_dark} alt="ga" class="h-full object-contain" />
			{:else}
				<img src={embed_gif} alt="" srcset="" />
			{/if}
		</div>
	</div>
</div>
