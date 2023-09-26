<script>
	import Accodion from './accodion.svelte';
</script>

<div class=" h-fit flex items-center justify-center p-7 py-9">
	<div class="h-full flex flex-col gap-3 md:gap-6 items-center justify-center">
		<div class="flex flex-col items-center justify-center gap-6">
			<h2 class="max-w-lg text-center font-semibold mb-2 text-4xl md:text-6xl dark:text-sky-400">
				Wondering?
			</h2>
			<p class="max-w-lg text-center text-sky-dark dark:text-light text-xl">
				Here are list of question we think you might want answers for.
			</p>

			<ul class=" flex gap-6 flex-col">
				<Accodion
					title="Can the editor execute code?"
					content="SnippetLand Interactive frontend Playground can show preview of code almost instantanoeusly, but for snippets in other languages, you can't execute the code directly from our online editor. It is only for sharing beautifully."
				/>

				<Accodion
					title="Is it a language specific platform?"
					content="SnippetLand support 50+ Languages, so there is hope that whatever you're are sharing has a powerfull autocompletion and beautiful syntax highlighting."
				/>

				<Accodion
					title="Is snippetsLand 100% open source?"
					content="Yes, SnippetLand entire code is available for public review, suggestions and modification.	"
				/>
			</ul>
		</div>
	</div>
</div>
