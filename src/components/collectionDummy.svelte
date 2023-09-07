<script>
	let snippet = [1, 2, 3, 4, 5, 6];
</script>

<div class="flex flex-col gap-6 items-center w-full">
	<div class="gap-6 flex flex-col w-full bg-white dark:bg-secondary-dark rounded-lg shadow-md">
		<div class="grid gap-6 rounded-lg divide-y-2 dark:divide-primary w-full">
			{#each snippet as sn}
				<!-- <div class="bg-white rounded-lg p-4 shadow-md">
					<h3 class="text-xl font-semibold mb-2">{snippet.lang}</h3>
					<code class="block bg-gray-100 p-2 rounded-lg shadow-inner">{snippet.code}</code>
					Add any additional information or actions here
				</div> -->

				<div class="flex h-fit gap-1 w-full items-center px-3 py-6">
					<div class="min-w-[100px]">
						<div
							class="text-sm mb-2 text-secondary-dark bg-sky-100 w-12 px-3 h-3 rounded-xl animate-pulse"
						/>
					</div>
					<div
						class="text-lg md:text-xl bg-primary hover:opacity-80 w-full h-3 rounded-xl animate-pulse"
					/>
				</div>
			{/each}
		</div>
	</div>
</div>
