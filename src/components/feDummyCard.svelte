<div
	class="bg-gray-100 card duration-300 transition-all rounded-xl p-1 dark:bg-secondary-dark h-full shadow-sm flex flex-col"
>
	<!-- <div class=" rounded-xl bg-white w-full" bind:this={letsee}>
		<img src={capturedImageUrl} alt="" srcset="" />
	</div> -->

	<div
		class="w-full h-[250px] overflow-hidden rounded-xl"
		style="aspect-ratio: 1/1; pointer-events: none;"
	/>
	<!-- {#if !capturedImageUrl}
	{/if} -->

	<div class="flex flex-col p-2 items-start text-base animate-pulse">
		<!-- <div class="w-40 h-3 bg-gray-200 dark:bg-gray-600" /> -->

		<div class="flex justify-between items-center w-full">
			<div class="w-40 h-7 bg-gray-200 rounded-3xl dark:bg-gray-400" />

			<div class="flex gap-2 items-center justify-center w-fit">
				<span
					class="flex items-center justify-center gap-2 w-10 h-5 rounded-2xl bg-gray-400 dark:bg-gray-500"
				/>
				<!-- {JSON.stringify(details.view)} -->
				<div class="w-10 h-5 bg-gray-200 rounded-2xl dark:bg-gray-400" />
			</div>
		</div>
	</div>
</div>

<style>
	.card {
		max-width: 350px;
	}
</style>
