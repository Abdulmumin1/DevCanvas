<script>
	import { fade } from 'svelte/transition';
	import FeCard from './feCard.svelte';

	export let collection;
</script>

<div class="flex flex-col gap-6 items-center" transition:fade>
	<div class="gap-6 flex flex-col w-full">
		<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 rounded-lg w-full">
			{#each collection as snippet}
				<!-- <div class="bg-white rounded-lg p-4 shadow-md">
					<h3 class="text-xl font-semibold mb-2">{snippet.lang}</h3>
					<code class="block bg-gray-100 p-2 rounded-lg shadow-inner">{snippet.code}</code>
					Add any additional information or actions here
				</div> -->
				<FeCard details={snippet} />
			{/each}
		</div>
	</div>
	<!-- {#if showMore}
		<button
			class="bg-gray-300 dark:bg-secondary-dark shadow rounded-lg py-2 px-4 flex justify-center items-center gap-2 w-fit"
			id="more"
			on:click={more}
		>
			<div class:animate-spin={loading} class:hidden={!loading}>
				<Fa icon={faSpinner} />
			</div>
			Load more...</button
		>
	{/if} -->
</div>
