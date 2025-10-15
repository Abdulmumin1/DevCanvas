<script>
	import { github, githubDark } from 'svelte-highlight/styles';
	import EmbedComponent from '../../../../components/ui/embedComponent.svelte';
	// import Nav from '../../../components/nav.svelte';
	import { page } from '$app/stores';
	export let data;

	let dark = $page.url.searchParams.get('theme');
</script>

<svelte:head>
	{#if dark}
		{@html githubDark}
	{:else}
		{@html github}
	{/if}
</svelte:head>

<EmbedComponent details={data['0']} />
