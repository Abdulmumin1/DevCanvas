<script>
	import SectionCard from './sectionCard.svelte';
	import CodeSharingJpeg from '$lib/codeSharing.gif';
</script>

<SectionCard reverse={true}>
	<div class="flex flex-col justify-center">
		<h2 class="text-4xl md:text-5xl font-semibold mb-2">Easy Code Sharing</h2>
		<p class="max-w-md">
			Got a brilliant code snippet that could help others? Share it with the community! Our
			intuitive interface lets you upload your code snippets in a snap.
		</p>
	</div>
	<div class="h-full">
		<img src={CodeSharingJpeg} alt="ga" class=" h-full object-contain" />
	</div>
</SectionCard>
