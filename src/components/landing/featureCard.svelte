<script>
	import Icon from '@iconify/svelte';

	export let title;
	export let icon;
	export let bgColor;
	export let description;
</script>

<div class="min-h-44 w-full min-w-0 flex-col gap-2 bg-black p-4 text-white {bgColor} card">
	<div class="text-xl">
		<Icon {icon} />
	</div>
	<div class="font-bold">
		<!-- {icon} -->
		{title}
	</div>
	<div class="font-diana font-thin">{description}</div>
</div>

<style>
	.card {
		border-radius: 0.8rem;
		overflow: hidden;
		display: flex;
		/* font-weight: 500; */

		transition: all 0.2s ease-in-out;
		max-width: 170px;
	}
	.card:not(:first-child) {
		/* margin-left: -40px; */
	}

	/* .card:hover {
		z-index: 1;
		scale: 1.2;
	} */
</style>
