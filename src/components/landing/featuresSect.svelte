<script>
	import FeatureCard from './featureCard.svelte';

	let features = [
		{
			message: 'Keep it private',
			icon: 'material-symbols:lock-person',
			description: 'Keep your canvas to yourself and only others with the link'
		},
		{
			message: 'Embed',
			icon: 'material-symbols-light:web',
			description: 'Embed you project in websites, blogs and documentations.'
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
	class="flex w-full items-center justify-center border-y-2 border-black bg-sky-300 px-4 dark:border-secondary-dark"
>
	<div class="anim flex min-h-[300px] max-w-[90rem] flex-col justify-center gap-3 px-2 py-12">
		<h1 class="text-4xl font-semibold text-black md:text-5xl">Features</h1>
		<p class="font-diana text-xl font-thin text-stone-800">
			DevCanvas has everything you need to experiment with ideas, build and teach others how to
			code.
		</p>
		<div class="cs grid grid-cols-2 gap-2 md:flex md:flex-wrap">
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
