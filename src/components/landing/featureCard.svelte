<script>
	import Icon from '@iconify/svelte';

	export let title;
	export let icon;
	export let bgColor;
</script>

<div
	class="h-40 w-full md:w-32 p-4 flex-row md:flex-col justify-between gap-2 items-center shadow-light border-2 border-black bg-light dark:text-light dark:bg-secondary-dark {bgColor} card"
>
	{title}
	<div class="text-6xl text-black dark:text-light">
		<!-- {icon} -->
		<Icon {icon} />
	</div>
</div>

<style>
	.card {
		border-radius: 1.2rem;
		overflow: hidden;
		display: flex;
		font-weight: 500;
		align-items: center;
		justify-content: center;
		transition: all 0.2s ease-in-out;
	}
	.card:not(:first-child) {
		/* margin-left: -40px; */
	}

	.card:hover {
		z-index: 1;
		scale: 1.2;
	}
</style>
