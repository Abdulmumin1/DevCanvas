<!-- Facebook Meta Tags -->

<script>
	import { SnippetsDescription } from '$lib/index.js';
	import { page } from '$app/stores';
	export let title, description, imageUrl, url;
	export let index = true;
</script>

{#key $page}
	<title>{title}</title>
	<meta name="description" content={description ?? $SnippetsDescription.des} />

	<meta property="og:url" content={url ?? $SnippetsDescription.url} />
	<meta property="og:type" content="website" />
	<meta property="og:description" content={description ?? $SnippetsDescription.des} />
	<meta property="og:image" content={imageUrl ?? $SnippetsDescription.imageUrl} />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content="devcanvas.art" />
	<meta property="twitter:url" content={url ?? $SnippetsDescription.url} />
	<meta
		name="twitter:description"
		content={description.slice(0, 300) ?? $SnippetsDescription.des.slice(0, 300)}
	/>
	<meta name="twitter:image" content={imageUrl ?? $SnippetsDescription.imageUrl} />

	{#if index}
		<meta name="robots" content="index, follow" />
	{:else}
		<meta name="robots" content="noindex, follow" />
	{/if}
{/key}
