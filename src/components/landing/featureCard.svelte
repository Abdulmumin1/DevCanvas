<script>
	import { fade, fly } from 'svelte/transition';
	import Icon from '@iconify/svelte';

	export let title;
	export let icon;
	export let description;
</script>

<div class="feature-card bg-white dark:bg-secondary-dark" in:fade={{ duration: 300 }}>
	<div class="icon-wrapper" in:fly={{ y: 20, duration: 300, delay: 150 }}>
		<Icon {icon} />
	</div>
	<h3 class="text-[#333] dark:text-gray-100">{title}</h3>
	<p class="text-[#666] dark:text-[#999]">{description}</p>
</div>

<style>
	.feature-card {
		/* background-color: #ffffff; */
		border-radius: 12px;
		padding: 1.5rem;
		transition: all 0.3s ease;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		cursor: pointer;
	}

	.feature-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
	}

	.icon-wrapper {
		background-color: #e6f7ff;
		border-radius: 50%;
		padding: 1rem;
		margin-bottom: 1rem;
	}

	.icon-wrapper :global(svg) {
		width: 2rem;
		height: 2rem;
		color: #0080ff;
	}

	h3 {
		font-size: 1.25rem;
		font-weight: 600;
		margin-bottom: 0.5rem;
		/* color: #333; */
	}

	p {
		font-size: 0.9rem;
		/* color: #666; */
		line-height: 1.5;
	}
</style>
