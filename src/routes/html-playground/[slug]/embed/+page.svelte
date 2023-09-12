<script>
	import github from 'svelte-highlight/styles/github';
	import EmbedComponent from '../../../../components/embedComponent.svelte';
	export let data;
</script>

<svelte:head>
	{@html github}
</svelte:head>

<EmbedComponent details={{ code: data['0'].html, lang: 'html' }} />
