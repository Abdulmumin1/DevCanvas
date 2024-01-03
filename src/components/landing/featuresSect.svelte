<script>
	import FeatureCard from './featureCard.svelte';

	let features = [
		{ message: 'Keep it private', icon: 'material-symbols:lock-person' },
		{ message: 'Plugins to get start quickly', icon: 'mingcute:plugin-fill' },
		{ message: 'SCSS Support', icon: 'vscode-icons:file-type-scss' },
		{ message: 'Babel (incomming)..', icon: 'vscode-icons:file-type-light-babel2' },
		{ message: 'Share full page with preview', icon: 'fluent:preview-link-24-filled' },
		{ message: 'PWA with Offline support', icon: 'solar:window-frame-bold' }
	];
</script>

<div class="min-h-[300px] py-12 items-center justify-center flex flex-col anim">
	<h1 class="text-4xl bg-sky-500">Features</h1>
	<div class="flex gap-2 p-2 flex-wrap items-center justify-center cs">
		{#each features as feat}
			<FeatureCard icon={feat.icon} title={feat.message} />
		{/each}
	</div>
</div>

<style>
	.anim {
		animation: fade-in both;
		animation-timeline: view(vertical);
		animation-range: contain;
		opacity: 0;
		scale: 0.4;
	}

	@keyframes fade-in {
		to {
			opacity: 1;
			scale: 1;
		}
	}
</style>
