<script>
	import SectionCard from './sectionCard.svelte';
	import Explore from '$lib/exploreNew.gif';
	import ExploreDark from '$lib/exploreNewDark.gif';
	import { darkModeState } from '$lib/index.js';
</script>

<SectionCard>
	<div class="h-full">
		<!-- image url https://storyset.com/illustration/journey/cuate/animate -->
		{#if $darkModeState}
			<img src={ExploreDark} alt="ga" class="h-full object-contain" />
		{:else}
			<img src={Explore} alt="ga" class="h-full object-contain" />
		{/if}
	</div>
	<div class=" max-w-md">
		<h2 class=" font-semibold mb-2 text-4xl md:text-5xl dark:text-sky-400">
			Inspiration at Your Fingertips
		</h2>
		<p class="max-w-md">
			Explore a diverse library of code snippets contributed by developers like you. From simple
			solutions to complex algorithms, SnippetLand is your go-to resource for finding inspiration,
			solving problems, and learning new techniques
		</p>
	</div>
</SectionCard>
