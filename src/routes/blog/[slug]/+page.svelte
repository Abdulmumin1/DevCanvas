<script>
	import { onMount } from 'svelte';
	export let data;
	import { formatDate, insertCopyButton, copyUrlToClipboard } from '$lib/utils/utils.js';
	import { mylinks } from '$lib/utils/randomstore.js';
	// import { faGithub, faLinkedinIn, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
	import InnerNav from '$components/innerNav.svelte';

	import Fa from 'svelte-fa';
	import {
		faFacebook,
		faHackerNews,
		faLinkedin,
		faReddit,
		faTwitter,
		faWhatsapp,
		faGithub,
		faYoutube
	} from '@fortawesome/free-brands-svg-icons';
	import { faCopy } from '@fortawesome/free-solid-svg-icons';
	import { scale, slide } from 'svelte/transition';

	let url;

	onMount(() => {
		url = window.location.href;
		insertCopyButton(faCopy);
	});

	function convertLinkToRequestReadable(link) {
		// Encode the link using encodeURIComponent
		var encodedLink = encodeURIComponent(link);

		return encodedLink;
	}

	let encodedTitle = convertLinkToRequestReadable(data.meta.title);
</script>

<svelte:head>
	<title>{data.meta.title}</title>
</svelte:head>

<article in:scale class="mx-auto flex flex-col gap-2 article">
	<hgroup class=" h-[500px] text-black flex rounded-lg w-full flex-col gap-3 relative">
		<div class="flex flex-col items-center justify-center">
			<h1 class="text-5xl text-center">{data.meta.title}</h1>
			<div class="rounded-full h-8 w-8">
				<img
					src="https://yaqeen.me/_app/immutable/assets/abdul.66936237.jpg"
					alt="Abdulmumin Yaqeen"
					width="120px"
					class="rounded-full"
				/>
			</div>
			<div class="flex items-center">
				<div class="flex gap-2 p-2">
					<a href={$mylinks.github}>
						<Fa icon={faGithub} />
					</a>
					<a href={$mylinks.linkedin}>
						<Fa icon={faLinkedin} />
					</a>
					<a href={$mylinks.twitter}>
						<Fa icon={faTwitter} />
					</a>
					<a href={$mylinks.youtube}>
						<Fa icon={faYoutube} />
					</a>
				</div>
			</div>
			<p class="text-sm">Published {formatDate(data.meta.date)}</p>
		</div>
	</hgroup>
	<div class="flex gap-3 flex-wrap">
		{#each data.meta.categories as tag}
			<span class="px-3 py-1 text-black rounded-full bg-sky-300 font-light text-sm">&num;{tag}</span
			>
		{/each}
	</div>

	<div class="space-y-5 markdown-content font-light dark:text-light">
		<svelte:component this={data.content} />
	</div>
	<div class="w-full flex items-center justify-center p-3">
		<div
			class="w-full flex justify-between max-w-md items-center border border-b-2 rounded-lg bg-primary text-light dark:border-secondary-dark p-4"
		>
			<span>Love it? Share it!</span>
			<div class="flex space-x-3 items-center justify-center">
				<button
					on:click={() => {
						copyUrlToClipboard(url);
					}}><Fa icon={faCopy} /></button
				>
				<a
					href="https://twitter.com/share?url={convertLinkToRequestReadable(
						url
					)}%3Fref%3Dtwitter-share&amp;text={encodedTitle}"
					target="_blank"
					rel="noopener"
				>
					<span><Fa icon={faTwitter} /></span>
				</a>
				<a
					href="http://www.reddit.com/submit?url={url}&amp;title={encodedTitle}"
					target="_blank"
					rel="noopener"
				>
					<span><Fa icon={faReddit} /></span>
				</a>
				<a href="https://www.linkedin.com/cws/share?url={url}" target="_blank" rel="noopener">
					<span><Fa icon={faLinkedin} /></span>
				</a>
				<a
					href="http://news.ycombinator.com/submitlink?u={url}&amp;t={encodedTitle}"
					target="_blank"
					rel="noopener"
				>
					<Fa icon={faHackerNews} />
				</a>
				<a href="https://www.facebook.com/sharer/sharer.php?u={url}" target="_blank" rel="noopener">
					<Fa icon={faFacebook} />
				</a>
				<a
					href="https://api.whatsapp.com/send?text={encodedTitle}%20{url}"
					target="_blank"
					rel="noopener"
				>
					<Fa icon={faWhatsapp} />
				</a>
			</div>
		</div>
	</div>
</article>

<style>
	.article::before {
		content: '';
		background: rgb(56, 189, 248);
		background: linear-gradient(
			326deg,
			rgba(56, 189, 248, 1) 0%,
			rgba(169, 227, 252, 1) 16%,
			rgba(212, 241, 254, 1) 22%,
			rgba(125, 211, 252, 1) 86%,
			rgba(125, 211, 252, 1) 93%
		);
		position: absolute;
		top: 0;
		left: 0;
		right: 0;

		width: 100%;
		z-index: 0;
	}
</style>
