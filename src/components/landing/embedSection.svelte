<script>
	import { page } from '$app/stores';
	import { faCode } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	let c = `
<iframe
 src="https://devcanvas.art/v4H9dW/embed?active=css"
/>`;

	/**
	 * Resizes the given iFrame width so it fits its content
	 * @param e The iframe to resize
	 */

	function resizeIFrameToFitContent(e) {
		console.log('iframes ers fdss', e);

		e.target.width = e.target.contentWindow.document.body.scrollWidth;
		e.target.height = e.target.contentWindow.document.body.scrollHeight;
	}
</script>

<div class=" flex items-center justify-center bg-gradient-to-t from-sky-400 to-sky-200 p-7 py-9">
	<div class="flex h-full w-full max-w-[1200px] flex-col items-center justify-between gap-6">
		<div class="flex w-full flex-col justify-center">
			<h2 class="mb-2 flex gap-2 text-5xl font-semibold text-black md:text-6xl">
				Embed <Fa icon={faCode} />
			</h2>
			<pre class="rounded-xl bg-secondary-dark px-4 text-[9px] text-sky-300 md:text-sm">
				<code class="font-sans">{c}</code>
			</pre>
		</div>
		<div class="flex h-full w-full flex-col gap-4 rounded-2xl md:gap-6">
			<iframe
				title="embed"
				src="/play/gSirkj/embed?active=css"
				frameborder="0"
				loading="lazy"
				class="h-[670px] rounded-2xl border-2 border-secondary-dark"
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
