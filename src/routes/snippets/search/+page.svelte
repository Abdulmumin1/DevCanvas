<script>
	import { pageCountSnips, pageCountPl } from '$lib/index.js';

	import NavWrapper from '$components/snips/navWrapper.svelte';
	import { page } from '$app/stores';
	import CollectionDummy from '$components/collectionDummy.svelte';
	import { fade } from 'svelte/transition';
	import CollectionPage from '$components/collectionPage.svelte';

	export let data;
	let userSnippets = data.userSnippets;
	console.log(data);
</script>

<svelte:head>
	<meta name="robots" content="index, follow" />
</svelte:head>

<NavWrapper>
	<div class="my-12"></div>
	<div transition:fade class=" h-full">
		<CollectionPage rawcollection={userSnippets} supabase={data.supabase} session={data.session} />
	</div>
</NavWrapper>
