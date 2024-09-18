<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	const testimonials = [
		{ name: 'Alex Johnson', role: 'CEO, TechCorp', content: 'Absolutely game-changing product!' },
		{ name: 'Sarah Lee', role: 'Designer', content: "The best tool I've used in years." },
		{ name: 'Mike Brown', role: 'Developer', content: 'Intuitive and powerful. Highly recommend!' },
		{ name: 'Emily Chen', role: 'Marketing Manager', content: 'Boosted our productivity tenfold.' },
		{
			name: 'Chris Taylor',
			role: 'Entrepreneur',
			content: "Can't imagine running my business without it."
		},
		{ name: 'Jessica Wong', role: 'Product Manager', content: 'User-friendly and feature-rich.' },
		{
			name: 'David Miller',
			role: 'CTO, StartupX',
			content: 'Impressive performance and reliability.'
		},
		{
			name: 'Laura Martinez',
			role: 'Consultant',
			content: 'A must-have for any serious professional.'
		},
		{ name: 'Ryan Patel', role: 'Freelancer', content: 'Simplified my workflow significantly.' },
		{
			name: 'Sophie Turner',
			role: 'Creative Director',
			content: "Unleashed our team's full potential."
		},
		{
			name: 'Tom Harris',
			role: 'Sales Director',
			content: 'Helped us close deals faster than ever.'
		},
		{
			name: 'Olivia Clark',
			role: 'UX Researcher',
			content: 'The attention to detail is remarkable.'
		}
	];

	let animatedTestimonials = [];

	onMount(() => {
		// Double the testimonials to create a seamless loop
		animatedTestimonials = [...testimonials, ...testimonials];
	});
</script>

<div class="wall-of-love">
	<h2 class="title">What People Think</h2>
	<div class="testimonial-container">
		<div class="fade-overlay left"></div>
		<div class="marquee">
			{#each animatedTestimonials as testimonial, i}
				<div class="testimonial-card" style="--delay: {i * 0.1}s">
					<p class="content">"{testimonial.content}"</p>
					<p class="author">{testimonial.name}</p>
					<p class="role">{testimonial.role}</p>
				</div>
			{/each}
		</div>
		<div class="fade-overlay right"></div>
	</div>
</div>

<style>
	.wall-of-love {
		font-family: 'Arial', sans-serif;
		max-width: 100%;
		height: 690px;
		overflow: hidden;
		padding: 2rem 0;
		background-color: #f8f9fa;
	}

	.title {
		text-align: center;
		font-size: 2.5rem;
		font-weight: 700;
		color: #333;
		margin-bottom: 2rem;
	}

	.testimonial-container {
		position: relative;
		width: 100%;
		overflow: hidden;
	}

	.marquee {
		display: flex;
		animation: scroll 60s linear infinite;
	}

	.testimonial-card {
		flex: 0 0 300px;
		margin: 0 1rem;
		padding: 1.5rem;
		background-color: white;
		border-radius: 8px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		opacity: 0;
		animation: fadeIn 0.5s ease-out forwards;
		animation-delay: var(--delay);
	}

	.content {
		font-size: 1rem;
		line-height: 1.6;
		color: #333;
		margin-bottom: 1rem;
	}

	.author {
		font-weight: 600;
		color: #007bff;
		margin-bottom: 0.25rem;
	}

	.role {
		font-size: 0.9rem;
		color: #6c757d;
	}

	.fade-overlay {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100px;
		z-index: 1;
	}

	.fade-overlay.left {
		left: 0;
		background: linear-gradient(to right, #f8f9fa, transparent);
	}

	.fade-overlay.right {
		right: 0;
		background: linear-gradient(to left, #f8f9fa, transparent);
	}

	@keyframes scroll {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-50%);
		}
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (max-width: 768px) {
		.testimonial-card {
			flex: 0 0 250px;
		}
	}
</style>
