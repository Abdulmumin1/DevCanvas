<script>
	import FeatureCard from './featureCard.svelte';

	let features = [
		{
			message: 'Keep it private',
			icon: 'material-symbols:lock-person',
			description: 'Keep your canvas to yourself and only others with the link'
		},
		{
			message: 'Built-in Plugins',
			icon: 'ph:plugs-fill',
			description: 'Tailwindcss? Font Awesome? Gsap? - just a click away!'
		},
		{
			message: 'SCSS',
			icon: 'vscode-icons:file-type-scss',
			description: 'SCSS enthusiast? we got you!'
		},
		{
			message: 'Babel',
			icon: 'vscode-icons:file-type-light-babel2',
			description: 'Wanna run something backward compatible? you got it!'
		},
		{
			message: 'Shareable URLs',
			icon: 'material-symbols-light:screen-share',
			description: 'Share your creations with others'
		},
		{
			message: 'PWA with Offline support',
			icon: 'solar:window-frame-bold',
			description: 'Use devcanvas like any other native app'
		},
		{
			message: 'Responsiveness',
			icon: 'mdi:responsive',
			description: 'Test how cool 😎 your project looks on different devices'
		},
		{
			message: 'Snippets',
			icon: 'pajamas:snippet',
			description: 'Share code snippets with others in 50+ supported languages'
		}
	];
</script>

<div
	class="flex items-center justify-center w-full bg-sky-300 px-4 border-y-2 border-black dark:border-secondary-dark"
>
	<div class="min-h-[300px] max-w-6xl py-12 px-2 gap-3 justify-center flex flex-col anim">
		<h1 class="text-4xl md:text-5xl font-semibold text-black">Features</h1>
		<p class="font-thin font-diana text-xl text-stone-800">
			DevCanvas has everything you need to experiment with ideas, build and teach others how to
			code.
		</p>
		<div class="grid grid-cols-2 md:flex gap-2 md:flex-wrap cs">
			{#each features as feat}
				<FeatureCard icon={feat.icon} title={feat.message} description={feat.description} />
			{/each}
		</div>
	</div>
</div>

<style>
	/* .anim {
		animation: fade-in both;
		animation-timeline: view();
		animation-range-start: contain 0vh;
		animation-range-end: contain 20vh;
		opacity: 0;
		scale: 0.4;
	}

	@keyframes fade-in {
		to {
			opacity: 1;
			scale: 1;
		}
	} */
</style>
