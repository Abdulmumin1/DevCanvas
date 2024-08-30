<!-- Facebook Meta Tags -->

<script>
	import { SnippetsDescription } from '$lib/index.js';

	export let title, description, imageUrl, url;
	export let index = true;
</script>

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
<meta name="twitter:description" content={description ?? $SnippetsDescription.des} />
<meta name="twitter:image" content={imageUrl ?? $SnippetsDescription.imageUrl} />

{#if index}
	<meta name="robots" content="index, follow" />
{:else}
	<meta name="robots" content="noindex, follow" />
{/if}
