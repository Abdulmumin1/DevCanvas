<div
	class="card flex h-full flex-col rounded-xl bg-gray-100 p-1 shadow-sm transition-all duration-300 dark:bg-secondary-dark md:max-w-[350px]"
>
	<!-- <div class=" rounded-xl bg-white w-full" bind:this={letsee}>
		<img src={capturedImageUrl} alt="" srcset="" />
	</div> -->

	<div
		class="h-[250px] w-full overflow-hidden rounded-xl"
		style="aspect-ratio: 1/1; pointer-events: none;"
	></div>
	<!-- {#if !capturedImageUrl}
	{/if} -->

	<div class="flex animate-pulse flex-col items-start p-2 text-base">
		<!-- <div class="w-40 h-3 bg-gray-200 dark:bg-gray-600" /> -->

		<div class="flex w-full items-center justify-between">
			<div class="h-5 w-40 rounded-3xl bg-gray-200 dark:bg-gray-400"></div>

			<div class="flex w-fit items-center justify-center gap-2">
				<span
					class="flex h-4 w-10 items-center justify-center gap-2 rounded-2xl bg-gray-400 dark:bg-gray-500"
				></span>
				<!-- {JSON.stringify(details.view)} -->
				<div class="h-4 w-10 rounded-2xl bg-gray-200 dark:bg-gray-400"></div>
			</div>
		</div>
	</div>
</div>

<style>
</style>
