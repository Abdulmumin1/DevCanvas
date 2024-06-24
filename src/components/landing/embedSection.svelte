<script>
	import { page } from '$app/stores';
	import { faCode } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	let c = `
<iframe
 src="https://devcanvas.art/v4H9dW/embed"
/>`;
</script>

<div class=" flex items-center justify-center bg-gradient-to-t from-sky-400 to-sky-200 p-7 py-9">
	<div class="flex h-full w-full max-w-[1200px] flex-col items-center justify-between gap-6">
		<div class="flex w-full flex-col justify-center">
			<h2
				class="mb-2 flex gap-2 text-5xl font-semibold text-black dark:text-secondary-dark md:text-6xl"
			>
				Embed <Fa icon={faCode} />
			</h2>
			<pre class="rounded-xl bg-secondary-dark px-4 text-[9px] text-white md:text-sm">
				<code>{c}</code>
			</pre>
		</div>
		<div class="flex h-full w-full flex-col gap-4 md:gap-6">
			<iframe
				title="embed"
				src="{$page.url.origin}/play/gSirkj/embed"
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
