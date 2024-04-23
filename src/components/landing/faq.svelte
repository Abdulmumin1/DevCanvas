<script>
	import Accodion from './accodion.svelte';
</script>

<div class=" flex h-fit items-center justify-center p-7 py-9">
	<div class="flex h-full flex-col items-center justify-center gap-3 md:gap-6">
		<div class="flex flex-col items-center justify-center gap-6">
			<h2 class="mb-2 max-w-lg text-center text-4xl font-semibold dark:text-sky-400 md:text-6xl">
				Wondering?
			</h2>
			<p class="max-w-lg text-center font-diana text-xl text-sky-dark dark:text-light">
				Here are list of question we think you might want answers for.
			</p>

			<ul class=" flex flex-col gap-6 dark:text-light">
				<Accodion
					title="What is snippets"
					content="Snippets is a part of devcanvas, that allows you to share code snippets easily with others"
				/>
				<Accodion
					title="Can the editor (snippets) execute code?"
					content="DevCanvas Interactive frontend Playground can show preview of code almost instantanoeusly, but for snippets in other languages, you can't execute the code directly from our online editor. It is only for sharing."
				/>

				<Accodion
					title="Is it a language specific platform (snippets) ?"
					content="DevCanvas snippets support 50+ Languages, so there is hope that whatever you're are sharing has a powerfull autocompletion and beautiful syntax highlighting."
				/>

				<Accodion
					title="Is DevCanvas 100% open source?"
					content="Yes, DevCanvas entire code is available for public review, suggestions and modification.	"
				/>
			</ul>
		</div>
	</div>
</div>
