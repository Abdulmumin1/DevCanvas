<script>
	import github from 'svelte-highlight/styles/github';
	import EmbedComponent from '../../../components/embedComponent.svelte';
	import Nav from '../../../components/nav.svelte';
	export let data;
</script>

<svelte:head>
	{@html github}
</svelte:head>

<EmbedComponent details={data['0']} />
