<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import NavWrapper from '$components/features/snippets/navWrapper.svelte';
	import { user } from '$lib/stores/index.js';
	import CollectionPage from '$components/ui/collectionPage.svelte';
	import { fade } from 'svelte/transition';
	import { pageCountSnips, pageCountPl } from '$lib/stores/index.js';
	import NewSnippet from '$components/ui/newSnippet.svelte';

	export let data;
	let supabase = data.supabase;
	let userSnippets = data.userSnippets;
</script>

<NavWrapper>
	<div class="mt-12 w-full">
		{#if $user}
			<div class="w-full">
				<NewSnippet />
			</div>
		{/if}

		<div in:fade class=" h-full">
			<CollectionPage
				rawcollection={userSnippets}
				supabase={data.supabase}
				session={data.session}
				showMore={userSnippets.length > 6}
			/>
		</div>
	</div>
</NavWrapper>
