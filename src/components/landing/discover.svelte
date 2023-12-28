<script>
	import SectionCard from './sectionCard.svelte';
	import CodeSharingJpeg from '$lib/codeShare.gif';
	import CodeSharingDark from '$lib/codeShareDark.gif';
	import { darkModeState } from '$lib/index.js';
</script>

<SectionCard reverse={true}>
	<div class="flex flex-col justify-center">
		<h2 class="text-4xl md:text-5xl font-semibold mb-2 dark:text-sky-400">
			Easy Code Sharing <sub class="text-sm">(Snippets)</sub>
		</h2>
		<p class="max-w-md">
			Got a brilliant code snippet that could help others? Share it with the community! Our
			intuitive interface lets you upload your code snippets in a snap.
		</p>
	</div>
	<div class="h-full">
		<!-- image url https://storyset.com/illustration/code-typing/bro/animate -->

		{#if $darkModeState}
			<img src={CodeSharingDark} alt="ga" class=" h-full object-contain" />
		{:else}
			<img src={CodeSharingJpeg} alt="ga" class=" h-full object-contain" />
		{/if}
	</div>
</SectionCard>
