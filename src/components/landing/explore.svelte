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
		<h2 class=" font-semibold mb-2 text-4xl md:text-5xl dark:text-sky-400">Inspiration Awaits</h2>
		<p class="max-w-md">
			Dive into a treasure trove of user-generated code snippets. Find inspiration, learn new
			tricks, and take your coding skills to the next level.
		</p>
	</div>
</SectionCard>
