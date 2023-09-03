<script>
	import SectionCard from './sectionCard.svelte';
	import Explore from '$lib/discover.gif';
</script>

<SectionCard>
	<div class="h-full">
		<img src={Explore} alt="ga" class="h-full object-contain" />
	</div>
	<div class="">
		<h2 class=" font-semibold mb-2 text-4xl md:text-5xl">Explore Code Snippets</h2>
		<p class="max-w-md">
			Explore a diverse library of code snippets contributed by developers like you. From simple
			solutions to complex algorithms, SnippetLand is your go-to resource for finding inspiration,
			solving problems, and learning new techniques
		</p>
	</div>
</SectionCard>
