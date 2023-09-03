<!-- Add your features or benefits here -->

<script>
	export let reverse = false;
</script>

<div class="p-4 h-fit md:h-[80vh] flex items-center justify-center">
	{#if reverse}
		<div class="h-full flex flex-col md:flex-row gap-3 md:gap-6 items-center text-left">
			<slot />
		</div>
	{:else}
		<div class="h-full flex flex-col-reverse md:flex-row gap-3 md:gap-6 items-center text-right">
			<slot />
		</div>
	{/if}
</div>
