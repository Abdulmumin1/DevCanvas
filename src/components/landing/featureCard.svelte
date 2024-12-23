<script>
	import { fade, fly } from 'svelte/transition';
	import Icon from '@iconify/svelte';
	export let title;
	export let icon;
	export let description;
	let isHovered = false;

	function handleMouseMove(event) {
		if (!isHovered) return;
		const card = event.currentTarget;
		const rect = card.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;
		const centerX = rect.width / 2;
		const centerY = rect.height / 2;
		const rotateX = (y - centerY) / 10;
		const rotateY = (centerX - x) / 10;
		card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
	}

	function handleMouseEnter() {
		isHovered = true;
	}

	function handleMouseLeave(event) {
		isHovered = false;
		event.currentTarget.style.transform =
			'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
	}
</script>

<div
	class="feature-card bg-white dark:bg-secondary-dark"
	in:fade={{ duration: 300 }}
	on:mousemove={handleMouseMove}
	on:mouseenter={handleMouseEnter}
	on:mouseleave={handleMouseLeave}
>
	<div class="icon-wrapper" in:fly={{ y: 20, duration: 300, delay: 150 }}>
		<Icon {icon} />
	</div>
	<h3 class="text-[#333] dark:text-gray-100">{title}</h3>
	<p class="text-[#666] dark:text-[#999]">{description}</p>
</div>

<style>
	.feature-card {
		border-radius: 12px;
		padding: 1.5rem;
		transition: all 0.3s ease;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		cursor: pointer;
		transform-style: preserve-3d;
		transform: perspective(1000px);
	}
	.feature-card:hover {
		box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
	}
	.icon-wrapper {
		background-color: #e6f7ff;
		border-radius: 50%;
		padding: 1rem;
		margin-bottom: 1rem;
		transform: translateZ(30px);
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
		transform: translateZ(20px);
	}
	p {
		font-size: 0.9rem;
		line-height: 1.5;
		transform: translateZ(10px);
	}
</style>
