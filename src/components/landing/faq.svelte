<script>
	import Accodion from './accodion.svelte';
</script>

<div class=" h-fit flex items-center justify-center p-7 py-9">
	<div class="h-full flex flex-col gap-3 md:gap-6 items-center justify-center">
		<div class="flex flex-col items-center justify-center gap-6">
			<h2 class="max-w-lg text-center font-semibold mb-2 text-4xl md:text-6xl">Wondering?</h2>
			<p class="max-w-lg text-center text-sky-dark dark:text-light text-xl">
				Here are list of question we think you might want answers for.
			</p>

			<ul class=" flex gap-6 flex-col">
				<Accodion title="Can the editor execute code?" content="Still Building!" />

				<Accodion title="Is it a language specific platform?" content="Still Building!" />

				<Accodion title="Why not just github instead of SnippetLand?" content="Still Building!" />

				<Accodion title="Is snippetsLand 100% open source?" content="Still Building	" />
			</ul>
		</div>
	</div>
</div>
