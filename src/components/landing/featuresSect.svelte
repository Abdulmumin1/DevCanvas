<script>
	import Icon from '@iconify/svelte';
	import FeatureCard from './featureCard.svelte';

	const features = [
		{
			title: 'Keep it private',
			icon: 'mdi:lock',
			description: 'Keep your canvas to yourself and only share with others via link'
		},
		{
			title: 'Embed',
			icon: 'mdi:web',
			description: 'Embed your project in websites, blogs and documentation'
		},
		{
			title: 'Built-in Plugins',
			icon: 'mdi:puzzle',
			description: 'Tailwind CSS, Font Awesome, GSAP - just a click away!'
		},
		{
			title: 'SCSS Support',
			icon: 'mdi:language-css3',
			description: "SCSS enthusiast? We've got you covered!"
		},
		{
			title: 'Shareable URLs',
			icon: 'mdi:share-variant',
			description: 'Share your creations with others easily'
		},
		{
			title: 'PWA with Offline support',
			icon: 'mdi:cellphone-link',
			description: 'Use DevCanvas like any other native app, even offline'
		},
		{
			title: 'Responsive Design',
			icon: 'mdi:responsive',
			description: 'Test how your project looks on different devices'
		},
		{
			title: 'Code Snippets',
			icon: 'mdi:code-tags',
			description: 'Share code snippets in 50+ supported languages'
		}
	];
</script>

<section class="features-section border-t-2 border-t-secondary-dark">
	<h2
		class="mx-auto flex w-fit items-center gap-1 rounded-full bg-primary px-5 py-2 text-2xl text-gray-200 md:text-4xl"
	>
		<Icon icon="heroicons:sparkles-20-solid" />Features
	</h2>
	<p class="subtitle">Everything you need to experiment, build, and teach coding</p>
	<div class="feature-grid">
		{#each features as feature}
			<FeatureCard {...feature} />
		{/each}
	</div>
</section>

<style>
	.features-section {
		padding: 4rem 2rem;
		background-color: #7dd3fc;
	}

	h2 {
		/* font-size: 2.5rem; */
		font-weight: 700;
		text-align: center;
		margin-bottom: 1rem;
		/* color: #333; */
	}

	.subtitle {
		font-size: 1.1rem;
		text-align: center;
		max-width: 600px;
		margin: 0 auto 3rem;
		color: #333;
	}

	.feature-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 2rem;
		max-width: 1200px;
		margin: 0 auto;
	}
</style>
