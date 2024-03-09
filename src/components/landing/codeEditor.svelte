<script>
	// import devcanvaseditor from '$lib/devcanvaseditor.jpg';
	import devcanvaseditor from '$lib/devcanvaseditor1.png';
</script>

<div class="px-4 h-fit md:h-screen flex items-center justify-center">
	<div class="h-full flex flex-col gap-3 md:gap-6 items-center">
		<div class="flex flex-col items-center justify-center">
			<h2 class=" font-semibold mb-2 text-4xl md:text-6xl dark:text-sky-400">
				A Powerfull Code Editor
			</h2>
			<p class="max-w-lg text-center dark:text-light font-diana">
				Bring your coding projects to life with real-time collaboration. Our built-in collaborative
				code editor powered by VSCode lets you write code more seamlessly, Every of your vscode
				thingy just works.
			</p>
		</div>

		<div class="rounded-t-3xl overflow-hidden">
			<!-- src="https://raw.githubusercontent.com/Abdulmumin1/media/main/snippetCodeEditorPreview.gif" -->

			<!-- {#if $darkModeState} -->
			<!-- <img src={snippetEditorDark} alt="Editor Preview" class="  rounded-4xl" /> -->
			<!-- {:else} -->
			<img src={devcanvaseditor} alt="Editor Preview" class="  rounded-4xl grayscale" />
			<!-- {/if} -->
		</div>
	</div>
</div>
