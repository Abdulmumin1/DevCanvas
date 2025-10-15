<script>
	import { pageCountSnips, pageCountPl } from '$lib/stores/index.js';

	import NavWrapper from '$components/features/snippets/navWrapper.svelte';
	import { page } from '$app/stores';
	import CollectionDummy from '$components/ui/collectionDummy.svelte';
	import CollectionPage from '$components/ui/collectionPage.svelte';
	import SEO from '$components/ui/seoComp.svelte';
	import { fade } from 'svelte/transition';

	let { data } = $props();
	let userSnippets = data.userSnippets;
	// console.log(data);
</script>

<svelte:head>
	<SEO
		title="Snippets"
		description="Collection of useful snippets and explanations"
		url="https://devcanvas.art/explore"
	/>
</svelte:head>

<NavWrapper>
	<div class="my-12"></div>
	<div transition:fade class=" h-full">
		<CollectionPage rawcollection={userSnippets} supabase={data.supabase} session={data.session} />
	</div>
</NavWrapper>
